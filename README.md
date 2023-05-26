# TheMovieDb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

# About The Project

This project was developed in a little over three weeks, it uses The Movie Database API. It is based in a global state using Ngrx, the API calls and information loading are all done through Ngrx features. The design was taken from The Movie Database, made from scratch using tailwindcss and angular material.

## Development server

Run `npm install` to install all dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Bear in mind you need to request a private api key, you can check how to get started here `https://developer.themoviedb.org/reference/intro/getting-started`. You also need an account to be able to use most application features.
Once you get your api key, you need to set its value in src->environments->environments.development.ts->apiKey.
You can also check out the deployed app in GH pages at `https://jbrizo.github.io/the-movie-db/home`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
If you want to check the coverage don't forget to use `ng test --code-coverage`
