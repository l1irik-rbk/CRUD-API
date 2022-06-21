# CRUD-API

1. Clone this repo to install app and switch from main branch to develop
2. You can run app in different states:
  - In dev mode using nodemon (npm run start:dev)
  - In prod mode using (npm run start:prod)
  - Multiple instances of application (npm run start:multi)
  - Tests are available (npm run test)
3. Available endpoints: 
  - GET, api/users is used to get all persons
  - GET, api/users/${userId} is used to get a person
  - POST, api/users is used to create record about new user and store it in database
  - PUT, api/users/{userId} is used to update existing user
  - DELETE, api/users/${userId} is used to delete existing user from database
