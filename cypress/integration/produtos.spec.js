/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

context('GET /produtos', () => {
    describe('Endpoints de produtos', () => {
        it('deve retornar todos os produtos', () => {
            cy.request('GET', `${url}/produtos`)
                .should((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            });
        });


        it('deve retornar um produto por id', () => {
            cy.request('GET', `${url}/produtos/1`)
                .should((response) => {                                                         
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys('id', 'produto', 'categoria', 'valor', 'descricao', 'marca');
            });
        });
    });

    describe('Validação de erros nos endpoints de produtos', () => { 
        it('deve retornar mensagem de erro ao passar atributo inválido', () => {
            cy.request({
                method: 'GET',
                    url: `${url}/produtos/texto`, 
                    failOnStatusCode: false
            })
            .then( response => {
                    expect(response.status).to.eq(400)
                    cy.log(JSON.stringify(response.body))
                    expect(JSON.stringify(response.body)).to.be.eq('{"errors":[{"value":"texto","msg":"Para consultar um produto é preciso informar seu id, que precisa ser um valor numérico","param":"id","location":"params"}]}')
            });
        });


        it('deve retornar mensagem de erro quando não existir o produto na lista', () => {
            cy.request({
                method: 'GET',
                    url: `${url}/produtos/78`, 
                    failOnStatusCode: false
            })
            .then( response => {
                    expect(response.status).to.eq(404)
                    cy.log(JSON.stringify(response.body))
                    expect(response.body).to.be.eq("Produto não encontrado")
            });
        });
    });
});