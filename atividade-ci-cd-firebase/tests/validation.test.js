import test from 'node:test';
import assert from 'node:assert/strict';
import { emailValido, senhaValida, mensagemValida } from '../src/validation.js';
test('aceita e-mail bem formatado', () => assert.equal(emailValido('aluno@exemplo.com'), true));
test('recusa e-mail inválido', () => assert.equal(emailValido('sem-arroba'), false));
test('senha exige pelo menos seis caracteres', () => {
  assert.equal(senhaValida('12345'), false);
  assert.equal(senhaValida('123456'), true);
});
test('mensagem não pode ser vazia', () => assert.equal(mensagemValida('  '), false));
test('mensagem de até 200 caracteres é aceita', () => assert.equal(mensagemValida('a'.repeat(200)), true));
test('mensagem longa é rejeitada', () => assert.equal(mensagemValida('a'.repeat(201)), false));
