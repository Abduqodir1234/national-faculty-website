// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { GetProps } from './commands';
///<reference types="cypress"/>

// Alternatively you can use CommonJS syntax:
// require('./commands')

interface RegisterProps{
  error:boolean;
  message:string
}

interface GetProps{
  error:boolean;
  message:string | null;
  data:any
}

declare namespace Cypress {
    interface Chainable {
      /**
       * this is for get reuqest
       */
      getRequest(url: string,token:string|null,failOnStatusCode:boolean|null): Cypress.Chainable<Cypress.Response<GetProps>>;
      /**
       * this is for register user
       */
      register(token: string | null): Cypress.Chainable<Cypress.Response<RegisterProps>>;
        /**
       * this is for signIn user
       */
      signIn(): Cypress.Chainable<Cypress.Response<{token:string}>>;
        /**
       * this is for signIn user with different data
       */
      signIn2(): Cypress.Chainable<Cypress.Response<{token:string}>>;
        /**
       * this is for making post request
       */
      post<T>(url:string,body:T | null,token:string | null,failOnStatusCode:boolean | null): Cypress.Chainable<Cypress.Response<RegisterProps>>;
        /**
       * this is for making patch request
       */
      patch<T>(url:string,body: T | null,token:string | null,failOnStatusCode:boolean | null): Cypress.Chainable<Cypress.Response<RegisterProps>>;
    }
  }
