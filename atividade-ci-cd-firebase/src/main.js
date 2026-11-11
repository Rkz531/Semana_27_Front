import './style.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, configurado } from './firebase.js';
import { emailValido, senhaValida, mensagemValida } from './validation.js';

const $ = (id) => document.getElementById(id);
const status = (msg) => { $('status').textContent = msg; };
function erroAmigavel(error) {
  const mensagens = {
    'auth/email-already-in-use': 'Esse e-mail já possui uma conta.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/weak-password': 'A senha precisa ter pelo menos seis caracteres.',
    'permission-denied': 'Permissão negada. Confira as regras do Firestore.'
  };
  return mensagens[error?.code] || `Erro: ${error?.message || 'operação não concluída'}`;
}
async function autenticar(criarConta) {
  const email = $('email').value.trim();
  const senha = $('password').value;
  if (!emailValido(email) || !senhaValida(senha)) return status('Informe e-mail válido e senha de pelo menos 6 caracteres.');
  try {
    if (criarConta) await createUserWithEmailAndPassword(auth, email, senha);
    else await signInWithEmailAndPassword(auth, email, senha);
    status(criarConta ? 'Conta criada com sucesso!' : 'Login realizado com sucesso!');
  } catch (error) { status(erroAmigavel(error)); }
}
$('auth-form').addEventListener('submit', (event) => { event.preventDefault(); if (configurado) autenticar(false); });
$('signup').addEventListener('click', () => { if (configurado) autenticar(true); });
$('logout').addEventListener('click', async () => { try { await signOut(auth); status('Você saiu da conta.'); } catch (e) { status(erroAmigavel(e)); } });
$('note-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const mensagem = $('note').value.trim();
  if (!mensagemValida(mensagem)) return status('Digite uma mensagem de 1 a 200 caracteres.');
  if (!auth.currentUser) return status('Faça login antes de salvar.');
  try {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      email: auth.currentUser.email,
      mensagem,
      atualizadoEm: new Date().toISOString()
    });
    $('saved').textContent = 'Mensagem salva no Firestore com sucesso! ✅';
    status('Firestore funcionando.');
  } catch (e) { status(erroAmigavel(e)); }
});
if (!configurado) {
  status('Projeto demonstrativo: configure as variáveis VITE_FIREBASE_* no arquivo .env para ativar o Firebase.');
  $('auth-form').querySelectorAll('input,button').forEach(el => { el.disabled = true; });
} else {
  onAuthStateChanged(auth, (user) => {
    $('auth-area').hidden = Boolean(user);
    $('profile').hidden = !user;
    $('who').textContent = user ? `Conectado como ${user.email}` : '';
    if (user) { $('password').value = ''; status('Autenticado. Você pode salvar uma mensagem no Firestore.'); }
    else status('Entre com sua conta ou crie uma nova.');
  });
}
