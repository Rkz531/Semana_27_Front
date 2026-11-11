# Registro da atividade prática: CI/CD com GitHub Actions

**Nome:** ________________________  **Turma:** __________

## Objetivo
Configurar um projeto web com autenticação Firebase, gravação de dados no Cloud Firestore e pipeline de integração contínua e entrega contínua no GitHub Actions.

## Etapas desenvolvidas no projeto fornecido
1. Preparada uma aplicação web em HTML, CSS e JavaScript, utilizando Vite e o SDK modular do Firebase.
2. Implementados cadastro e login com e-mail/senha, logout e gravação de mensagens no documento do próprio usuário no Firestore.
3. Preparadas regras de acesso ao Firestore, permitindo acesso somente ao titular autenticado.
4. Criado o workflow `.github/workflows/ci-cd-pipeline.yml` para rodar em push/pull request na branch main.
5. Incluídos testes unitários com `npm test`, processo de build com `npm run build` e etapa condicional de deploy no Firebase Hosting.
6. Elaboradas instruções para configurar as variáveis do Firebase e documentar testes reais.

## Registro dos testes (preencher após executar)
- [ ] `npm install` concluído sem erros.
- [ ] `npm test` concluído sem erros.
- [ ] `npm run build` concluído sem erros.
- [ ] Pipeline exibiu execução verde em **GitHub > Actions**.
- [ ] Cadastro e login testados no Firebase Authentication.
- [ ] Mensagem gravada e confirmada no Cloud Firestore.
- [ ] Deploy real no Firebase Hosting realizado (caso configurado).

**Link do repositório:** ___________________________________

**Link do site publicado (se houver):** _______________________

**Capturas/vídeo anexados:** __________________________________

## Conclusão sugerida (usar somente após validação)
A implementação demonstrou como o GitHub Actions pode automatizar a instalação de dependências, a execução de testes e a geração do build. Após a configuração das credenciais e a verificação dos serviços do Firebase, a publicação do site também pode ocorrer automaticamente em alterações enviadas para a branch main. Essa automação reduz tarefas repetitivas e facilita a identificação de falhas no desenvolvimento.
