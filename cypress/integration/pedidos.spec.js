/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

describe('Endpoints de pedidos', () => { 
    it('deve retornar todos os pedidos de um cliente', () => {
        cy.request('GET', `${url}/pedidos?idCliente=1`)
            .should((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        });
    });

    it('deve retornar um pedido pelo número do pedido', () => {
        cy.request('GET', `${url}/pedidos/1`)
            .should((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        });
    });

    // it('deve adicionar um novo pedido', () => {

    // })

    // it('deve adicionar um novo produto no pedido', () => {

    // })

    it('deve remover um produto no pedido', () => {
        cy.request('DELETE', `${url}/pedidos/1/remover/1`)
            .should((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        });
    });
});


describe('Validação de erros nos endpoints de pedidos', () => { 
    it('deve retornar erro ao tentar remover um produto de pedido já finalizado', () => {
        cy.request({
            method: 'DELETE',
                url: `${url}/pedidos/3/remover/1`, 
                failOnStatusCode: false
        })
        .then( response => {
                expect(response.status).to.eq(400)
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.be.eq("Não é possível alterar o pedido quando o status se encontra como REALIZADA ou RETIRADO")
        });
    });

    it('deve retornar erro ao digitar um valor inválido para numero de pedido', () => {
        cy.request({
            method: 'DELETE',
                url: `${url}/pedidos/invalido/remover/1`, 
                failOnStatusCode: false
        })
        .then( response => {
                expect(response.status).to.eq(400)
                cy.log(JSON.stringify(response.body))
                expect(JSON.stringify(response.body)).to.be.eq('{"erros":[{"value":"invalido","msg":"Para remover um item do pedido é necessário informar o id do pedido que é um número inteiro","param":"idPedido","location":"params"}]}')
        });
    });

    it('deve retornar erro ao retirar um pedido pelo número do pedido', () => {
        cy.request({
            method: 'DELETE',
                url: `${url}/pedidos/1/remover/invalido`, 
                failOnStatusCode: false
        })
        .then( response => {
                expect(response.status).to.eq(400)
                cy.log(JSON.stringify(response.body))
                expect(JSON.stringify(response.body)).to.be.eq('{"erros":[{"value":"invalido","msg":"Para remover um item do pedido é necessário informar o id do item que é um número inteiro","param":"idProduto","location":"params"}]}')
        });
    });
});



  