How to run the app

Prerequistes
------------
Install the following
- dotnet core 2.1
- Postgres 10
- Node
- Npm

How to run APIs
- After installing dotnet core, go to folder "Palladium HealthCentre" and run the following commands 
- Restore postgres database ie palladium_health_centre.bak
- update database username and password the settings file - appsettings.Development.json
- dotnet restore
- dotnet run

NB. The react app is not complete due to time constraints. You can test the apis using Postman

APIs
Registering county
localhost:3000/v1/county POST
{
	"name": "Kitale"
}

localhost:3000/v1/county/{id} PUT
{
	"name": "Kitale"
}

localhost:3000/v1/county DELETE
localhost:3000/v1/county/ GET - Get all counties


Biodata 
localhost:3000/v1/biodata POST
Add New
{
    "firstName": "Kinangoi",
    "surname": "Glendour",
    "middleName": "Lijuma",
    "dob": "2015-12-27"
}

localhost:3000/v1/biodata/{id} PUT -Edit
{
    "firstName": "Kinangoi",
    "surname": "Glendour",
    "middleName": "Lijuma",
    "dob": "2015-12-27"
}

localhost:3000/v1/biodata/{id} DELETE
localhost:3000/v1/biodata GET - Get all
localhost:3000/v1/biodata/{id} GET - Get one

Database diagram - Entity Relationship Diagram1

NB - Because of time constraints the documentation is not complete however the above instruction will get the app running. I will finish up the rest and i will answer any quetions during the demo
