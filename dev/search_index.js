var documenterSearchIndex = {"docs":
[{"location":"#FunnyORM.jl-Documentation","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"","category":"section"},{"location":"","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"","category":"page"},{"location":"#Basics","page":"FunnyORM.jl Documentation","title":"Basics","text":"","category":"section"},{"location":"","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"AbstractModel\nFunnyORM.DB","category":"page"},{"location":"#FunnyORM.AbstractModel","page":"FunnyORM.jl Documentation","title":"FunnyORM.AbstractModel","text":"AbstractModel is the base type for your models. You should not instantiate your model manually.\n\nYou get it with a:\n\nquery: db[MyModel[conditions...]][idx]\ninsertion: MyModel(db)(kwargs)\nupdating: newmodel = db[oldmodel](update_kwargs...) or @update db[model] key1=val1 key2=val2 ...\n\n\n\n\n\n","category":"type"},{"location":"#FunnyORM.DB","page":"FunnyORM.jl Documentation","title":"FunnyORM.DB","text":"Wrapper around a connection and lookup from its catalog. See also AbstractModel, TableQuery\n\n\n\n\n\n","category":"type"},{"location":"#Querying","page":"FunnyORM.jl Documentation","title":"Querying","text":"","category":"section"},{"location":"","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"FunnyORM.TableQuery","category":"page"},{"location":"#FunnyORM.TableQuery","page":"FunnyORM.jl Documentation","title":"FunnyORM.TableQuery","text":"Allows for special query syntax and converts to an SQL Node when used in a query. It also hold the type information to convert the query output back into your defined model. You construct it like this:\n\njulia> MyModel[(x=3, y=[4,6]), z=3:5, date=\"\"=>\"2022-02-22\", RelatedModel[name=\"%aa_bb%\"]]\nFunnyORM.TableQuery{MyModel}(...)\n\nPass it to DB:\n\njulia> db[MyModel[]]\nVector{MyModel}...\n\n\n\n\n\n","category":"type"},{"location":"#Updating","page":"FunnyORM.jl Documentation","title":"Updating","text":"","category":"section"},{"location":"","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"@update\nBase.getindex(::FunnyORM.DB, ::AbstractModel)","category":"page"},{"location":"#FunnyORM.@update","page":"FunnyORM.jl Documentation","title":"FunnyORM.@update","text":"Usage @update db[itemtoupdate] key1=val1 key2=val2 ..\n\nExamples\n\njulia> firstperson = first(db[Person[]]); firstperson.year_of_birth\n1940\njulia> @update db[firstperson] year_of_birth=1941; firstperson.year_of_birth\n1941\n\n\n\n\n\n","category":"macro"},{"location":"#Base.getindex-Tuple{FunnyORM.DB, AbstractModel}","page":"FunnyORM.jl Documentation","title":"Base.getindex","text":"db[oldmodel](update_kwargs...) returns an updated model.\n\ndb[model]() will not run the update query, so db[model] is a closure to return the up-to-date model when called.\n\nExamples\n\n```jldoctest julia> firstperson = first(db[Person[]]); firstperson.yearofbirth 1940 julia> updated = dbfirstperson; firstperson.yearofbirth, updated.yearofbirth (1940, 1941)\n\n\n\n\n\n","category":"method"},{"location":"#Index","page":"FunnyORM.jl Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"FunnyORM.jl Documentation","title":"FunnyORM.jl Documentation","text":"","category":"page"}]
}
