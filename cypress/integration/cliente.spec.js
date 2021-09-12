/// <reference types="cypress" />

const url = Cypress.config("baseUrl");

const payloadAddCliente = require('../payloads/add-cliente.json');
const payloadLogin = require('../payloads/login.json');
const payloadLoginNaoCadastrado = require('../payloads/login-incorreto.json');
const payloadLoginSenhaIncorreta = require('../payloads/login-senha-incorreta.json');

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

    it('deve retornar erro ao cadastrar cliente com email ja existente', () => {
        cy.request({
            method: 'POST',
            url: `${url}/clientes`,
            failOnStatusCode: false,
            body: payloadAddCliente
        }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.statusText).to.eq('Bad Request');
            expect(response.body).to.be.eq('Usuário já cadastrado!')
            cy.log(response.body)
        });
    });

    it('deve fazer login do cliente', () => {
        cy.request({
            method: 'POST',
            url: `${url}/clientes/login`,
            failOnStatusCode: false,
            body: payloadLogin
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.statusText).to.eq('OK');
            expect(response.body).to.be.not.null
            cy.log(response.body)
        });
    });


    it('deve retornar erro ao fazer login com email não cadastrado', () => {
        cy.request({
            method: 'POST',
            url: `${url}/clientes/login`,
            failOnStatusCode: false,
            body: payloadLoginNaoCadastrado
        }).should((response) => {
            expect(response.status).to.eq(404)
            expect(response.statusText).to.eq('Not Found');
            expect(response.body).to.be.eq('Email nao cadastrado no banco!')
            cy.log(response.body)
        });
    });


    it('deve retornar erro ao fazer login com senha incorreta', () => {
        cy.request({
            method: 'POST',
            url: `${url}/clientes/login`,
            failOnStatusCode: false,
            body: payloadLoginSenhaIncorreta
        }).should((response) => {
            expect(response.status).to.eq(401)
            expect(response.statusText).to.eq('Unauthorized');
            expect(response.body).to.be.eq('Credenciais invalidas!')
            cy.log(response.body)
        });
    });
});


