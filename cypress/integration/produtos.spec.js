/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

describe('Endpoints de produtos', () => {
  context('GET /produtos', () => {
    it.only('deve retornar todos os produtos', () => {
        cy.request('GET', `${url}/produtos`)
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
            });
    });
  });
});
  