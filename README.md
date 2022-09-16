# ORMish package that you can use with FunSQL (WIP)

[![Dev Documentation][docs-dev-img]][docs-dev-url]
[![Build Status][ci-img]][ci-url]
[![Code Coverage Status][codecov-img]][codecov-url]
[![MIT License][license-img]][license-url]

## Quickstart

Let's start with the example DB that FunSQL provides: 

```julia 
using FunnyORM, SQLite
download("https://github.com/MechanicalRabbit/ohdsi-synpuf-demo/releases/download/20210412/synpuf-10p.sqlite", "db.sqlite")
db = FunnyORM.DB{SQLite.DB}("db.sqlite")

```
First we need the object-relational mapping. It's easiest to generate it by specifying the db, object name, and table name.
```julia
FunnyORM.generate_file(db, :Person, tablename=:person)
include("models/person.jl")
Person
```
After you run this, you VSCode should show you what Person is, and what fields it has, when you hover over it. 


<details><summary>About defaults</summary>
If a field can be `Missing`, the generated class will contain default `missing` for it. For the rest no default is set, so you may wish to edit the generated file.</details>


Now we can query the db: 
```julia
using DataFrames
db[Person[month_of_birth=[2, 4], person_source_value="%F%", year_of_birth=1900:1930]]
```
AbstractVector maps to IN, AbstractRange and Pair to BETWEEN and AbstractString to LIKE if it contains _ or $.
Otherwise it's =.

Also a named tuple in arguments is treated as an or, so in this case the following are equivalent:
```julia
Person[month_of_birth=[2, 4]]
Person[(month_of_birth=2, month_of_birth=4)]
```

Under the hood it's FROM .. WHERE ... queries.
If you want more SQL you can add a second argument and it will work as if your data got piped into it.
```julia
using FunSQL: Order, Get
db[Person[month_of_birth=[2, 4]], Order(Get.year_of_birth)]
```
In the examples above we create a vector of objects and convert to DataFrame for printing.
To skip creation of objects you can replace `,` with `|>`:
```julia
using FunSQL: Order, Get
db[Person[month_of_birth=[2, 4]] |> Order(Get.year_of_birth)] |> DataFrame
```
And be able to get any fields aggregations with sql etc.

You can also query by relations, though `contraint ... foreign key...` is not supported yet - the column names simply need to match.

```julia
FunnyORM.generate_file(db, :Visit, tablename=:visit_occurrence)
include("models/visit_occurrence.jl")

db[Person[Visit[visit_end_date="" => "2008-04-13"]]]
```
This will give you people who had visits that ended before 13th Apr 2008.

For many-to-many relationship you need to have an object for e.g. `PersonVisit` in this case and do `Person[PersonVisit[Visit[...]]]`.

And if you use JET then it will pick up some errors, like field name being wrong here:
```julia
db[Person[month_of_birth=[2, 4]]][1].year_if_birth
```

## Mutating:

### Creating new objects:

```julia
# single insert - returns new Person
Person(db)(gender_concept_id=8532, month_of_birth=11)
# bulk insert - returns Vector{Person}
Person(db)([(gender_concept_id=8532, month_of_birth=11), (gender_concept_id=1111,)])
```
### Updating objects

Here you need to use a macro.

```julia
# grab the latest insert
newlyinserted = db[Person[gender_concept_id=1111]] |> only
@update db[newlyinserted] day_of_birth = 10 month_of_birth = 3
newlyinserted.day_of_birth == 10  # true

# Warning! It only updates the reference you call it with, i.e:
v = [newlyinserted]
@update db[newlyinserted] day_of_birth = 15
newlyinserted.day_of_birth == 15, v[1].day_of_birth == 10  # both true
```




# still TODO:

* db.sqlmap for relationships
* db.sqlmap for not nulls
* maybe? db.sqlmap for Person -> Person,person,Persons,persons, i.e. multiple gentablenames
* UUIDs, e.g. with PSQL
  
[docs-dev-img]: https://img.shields.io/badge/docs-dev-blue.svg
[docs-dev-url]: https://mechanicalrabbit.github.io/FunSQL.jl/dev/
[docs-rel-img]: https://img.shields.io/badge/docs-stable-green.svg
[docs-rel-url]: https://asjir.github.io/FunnyORM.jl/stable/
[ci-img]: https://github.com/asjir/FunnyORM/workflows/CI/badge.svg
[ci-url]: https://github.com/asjir/FunnyORM/actions?query=workflow%3ACI+branch%3Amain
[codecov-img]: https://codecov.io/gh/asjir/FunnyORM/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/asjir/FunnyORM
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/asjir/FunnyORM/main/LICENSE.md
