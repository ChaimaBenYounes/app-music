# AppMusic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## HttpClient

Ce module basé sur RxJS permet d’interroger des serveurs distants à l’aide du
protocole HTTP. Il utilise l’interface XMLHttpRequest exposée par le navigateur.
HttpClient est une couche d’abstraction pour la consommation de requêtes
HTTP : testabilité, gestion des erreurs, objets Request et Response.
Importez le module dans AppModule de l’application :
import { HttpClientModule } from '@angular/common/http';
// N'oubliez pas de le définir dans les imports
imports: [
BrowserModule,
FormsModule,
RouterModule.forRoot(albumsRoutes),
HttpClientModule, // module HttpClient
],

## Service HttpClient
Il faut maintenant faire une injection de dépendance dans le service AlbumService :
Imports
// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';

$ npm i @types/lodash

// définition des headers
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
})
};

L’injection de dépendance dans le service se fera de manière classique.
constructor(private http: HttpClient) { }
