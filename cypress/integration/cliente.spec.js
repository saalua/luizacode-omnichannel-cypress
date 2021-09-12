/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

const payloadAddCliente = require('../payloads/add-cliente.json')

describe('Endpoints para cadastro e login de cliente', () => {
    it('deve cadastrar um novo cliente', () => {
        cy.request({
            method: 'POST',
            url: `${url}/clientes`,
            failOnStatusCode: false,
            body: payloadAddCliente
        }).should((response) => {
            expect(response.status).to.eq(201)
            expect(response.statusText).to.eq('Created');
            expect(response.body).to.be.eq('Cliente cadastrado com sucesso')
            cy.log(response.body)
        });
    });
});


