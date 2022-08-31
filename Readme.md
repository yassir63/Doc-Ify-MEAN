# Doc-Ify - Yassir Amami

# Use Case

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.  
- The Backend was created using node JS and Express JS.  

## Development server

- 1 - Cd into Project  
2 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

- 3 - Cd into nodejs  
4 - Run `nodemon` for a backend server on Port 3000.

## Code scaffolding

- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Syntax Checkup

- Run `ng lint` to check your code for misspells and other problems.

## Build

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

- Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

___  

# Project Features

## Authentification and Login

- The project features an authentification system which allows the user to create their own private space which is programmed in the Backend to create a completely separate database special to the user itself.

- The user can then login using his credentials, if at a given moment the user leaves his session open for more than an hour the login token is set to expire as a security measure which forces the user to relogin in order to use his account safely.

## Document Creation

- The purpose for this application is to make it easier for its users to create mundane everyday documents in a more easier way. For the first part, two documents are already in store whith of course the ability to add even more.

- The user can create his own documents using the already existing ones or using the templates created by the app community.

- Created documentscan be seen in the users private space and can be downloaded in PDF file.

- The user can even customize his created document by hard typing on the app itself before generating a PDF file. ( All textareas `<textarea>` are modifiable )

## Template Creation

- Each user has the right to create their own templates for others to use which makes this application tottaly customizable and gives it a prospering future along the growth of its community.

- Templates can be created via simple hard typing or using the application's ability to extract text from images or even PDFs uploaded to it.