export function emailValido(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export function senhaValida(senha) {
  return typeof senha === 'string' && senha.length >= 6;
}
export function mensagemValida(texto) {
  return typeof texto === 'string' && texto.trim().length > 0 && texto.trim().length <= 200;
}
