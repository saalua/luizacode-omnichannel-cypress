/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

describe('Endpoints de produtos', () => {
  
    context('GET /produtos', () => {
    it('deve retornar todos os produtos', () => {
        cy.request('GET', `${url}/produtos/2`)
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
            });
    });
  });


  context('GET /produtos/:id', () => {
    it.only('deve retornar um produto por id', () => {
        cy.request('GET', `${url}/produtos/1`)
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys(
                    'id', 'produto', 'categoria', 'valor', 'descricao', 'marca'
                  );
            });
    });
  });
});
  