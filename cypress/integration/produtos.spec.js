/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

describe('Endpoints de produtos', () => {
    it('deve retornar todos os produtos', () => {
        cy.request({
            method: 'GET',
            url: `${url}/produtos`,
            failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq('OK');
            expect(response.body).not.to.be.null
            cy.log(JSON.stringify(response.body));
        });
    });

    it('deve retornar um produto por id', () => {
        cy.request({
            method: 'GET',
            url: `${url}/produtos/1`,
            failOnStatusCode: false
        }).should((response) => {                                                         
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq('OK');
            expect(JSON.stringify(response.body)).to.be.eq('{"data":{"id":1,"produto":"SMARTPHONE SAMSUNG GALAXY A32","categoria":"CELULARES E SMARTPHONES","valor":1579,"descricao":"SMARTPHONE SAMSUNG GALAXY A32 128GB VIOLETA 4G","marca":"SAMSUNG"}}');
            cy.log(JSON.stringify(response.body));
        });
    });

    it('deve retornar mensagem de erro ao passar atributo inválido', () => {
        cy.request({
            method: 'GET',
            url: `${url}/produtos/invalido`, 
            failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
            expect(JSON.stringify(response.body)).to.be.eq('{"errors":[{"param":"idProduto","location":"path","msg":"idProduto deve ser númerico (invalido)"}]}')
            cy.log(JSON.stringify(response.body));
        });
    });


    it('deve retornar mensagem de erro quando não existir o produto na lista', () => {
        cy.request({
            method: 'GET',
            url: `${url}/produtos/7784`, 
            failOnStatusCode: false
        }).should((response) => {
                expect(response.status).to.eq(400);
                expect(response.statusText).to.eq('Bad Request');
                expect(JSON.stringify(response.body)).to.be.eq('{"errors":[{"param":"idProduto","location":"path","msg":"Produto não encontrado (78)"}]}');
                cy.log(JSON.stringify(response.body));
        });
    });
});