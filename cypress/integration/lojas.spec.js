/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

describe('Endpoints de lojas', () => {
  context('GET /lojas', () => {
    it('deve retornar todas as lojas', () => {
        cy.request('GET', `${url}/lojas`)
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
            });
    });
  });
});