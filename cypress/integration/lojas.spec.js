/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

context('GET /lojas', () => {
    describe('Endpoints de lojas', () => {
        it('deve retornar todas as lojas', () => {
            cy.request('GET', `${url}/lojas`)
                .should((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            });
        });
    });
});