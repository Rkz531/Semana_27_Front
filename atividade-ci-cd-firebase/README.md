# Atividade: Pipelines de CI/CD com GitHub Actions e Firebase

Projeto web com **cadastro/login por e-mail e senha**, gravação de mensagem por usuário no **Cloud Firestore**, **testes automatizados**, **build** e **deploy no Firebase Hosting** quando configurado. Baseado no roteiro escolar [SIS] U4 C3, páginas 2 a 6.

## 1. Abrir no VS Code

Abra a pasta do projeto. No terminal, execute:

```bash
npm install
npm test
npm run build
```

Depois de configurar o Firebase, execute `npm run dev` e abra o endereço exibido no terminal.

## 2. Configurar seu Firebase (necessário para login e banco real)

1. Acesse https://console.firebase.google.com/ e crie um projeto.
2. Em **Configurações do projeto > Seus apps**, registre um app Web `</>` e copie a configuração.
3. Em **Authentication > Sign-in method**, habilite **E-mail/senha**.
4. Em **Firestore Database**, crie o banco. Publique o conteúdo de `firestore.rules` na aba **Regras** do Firestore. As regras permitem acessar somente o documento do próprio usuário.
5. Copie `.env.example` para `.env` e substitua os exemplos pelos dados reais do app Web (campos com prefixo `VITE_`). Os valores de configuração do app Web não são credenciais de administrador, mas mantenha **segredos de serviço** fora do código.
6. Rode `npm run dev`, crie uma conta, faça login, salve uma mensagem e confira a coleção `users` no Firestore. **Não use uma senha real/importante no teste.**

## 3. Enviar para o GitHub

Crie repositório vazio no GitHub. Na pasta do projeto execute (substitua seu usuário e repositório):

```bash
git init
git branch -M main
git add .
git commit -m "Configurar pipeline de CI/CD com GitHub Actions e Firebase"
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Se o repositório já tiver Git configurado, não repita `git init` e `git remote add`.

## 4. Configurar secrets no GitHub

No repositório, vá em **Settings > Secrets and variables > Actions > New repository secret**. Cadastre:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID` (ID do projeto)
- `FIREBASE_SERVICE_ACCOUNT` (conteúdo integral do JSON da conta de serviço autorizada a publicar no Hosting)

**Atenção:** as variáveis `VITE_` são incorporadas ao JavaScript distribuído para o navegador. Não insira senhas nem chaves privadas nelas. Não publique o JSON da conta de serviço no repositório.

Para criar a conta de serviço, siga o método do Firebase CLI (`firebase init hosting:github`) ou o guia oficial de configuração manual. O projeto do Firebase também precisa ter o **Hosting ativado**. As credenciais só são disponibilizadas no GitHub Actions quando você as cadastrar.

## 5. Pipeline

O arquivo `.github/workflows/ci-cd-pipeline.yml` é executado a cada `push` na branch `main`, em pull requests para `main`, ou manualmente.

- **build-test**: baixa código, instala dependências, executa testes automatizados de validação e gera o build Vite.
- **deploy**: só roda após sucesso do build e em `push` para `main`. Publica no Firebase Hosting **quando** `FIREBASE_PROJECT_ID` e `FIREBASE_SERVICE_ACCOUNT` estiverem configurados. Sem eles, informa que a publicação ainda não foi habilitada.

> Os testes `npm test` são testes unitários locais. **Eles não validam a conexão real com Authentication ou Firestore.** O teste de integração deve ser feito manualmente no navegador conforme a próxima seção. O sucesso do pipeline sem secrets não significa que o deploy ocorreu.

## 6. Testes reais para apresentar

1. Abra o app com Firebase configurado.
2. Crie um usuário de teste. Confirme que aparece em **Authentication > Users**.
3. Faça login, digite uma mensagem e clique em **Salvar no Firestore**.
4. Confira em **Firestore Database > Data > users > (UID do usuário)** se a mensagem foi armazenada.
5. Faça logout e teste o login novamente.
6. Faça um novo commit e push. Entre na aba **Actions** do GitHub para verificar testes e build; se o Hosting estiver configurado, verifique também a URL publicada.
7. Faça capturas das telas ou grave vídeo mostrando o processo, conforme o item 6 do roteiro.

## 7. Registro da atividade

Veja `RELATORIO_ATIVIDADE.md`. Preencha os resultados **depois** de executar e testar no GitHub/Firebase. Não marque como realizado algo que ainda não foi conferido.

## Observações

O documento original apresenta exemplos do SDK antigo (`firebase.auth()` e `firebase.firestore()`) e Node.js 14. Esta implementação usa a API modular atual, Node.js 22 e GitHub Actions atualizado. Deploy de Firestore rules deve ser publicado manualmente pelo console do Firebase; o deploy automático aqui cobre o **site no Firebase Hosting**.
