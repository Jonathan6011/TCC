// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbVJUTwovjKHua6OWP_yIncKYytEEwPfo",
  authDomain: "tcc-994f7.firebaseapp.com",
  projectId: "tcc-994f7",
  storageBucket: "tcc-994f7.firebasestorage.app",
  messagingSenderId: "848443566233",
  appId: "1:848443566233:web:b9be3b2beccb027fa53008",
  measurementId: "G-SGB2LYMT17"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função de cadastro
function cadastrar() {
  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value.trim();
  const msg = document.getElementById('msgCadastro');

  if (!nome || !email || !senha) {
    msg.style.color = 'red';
    msg.textContent = "Preencha todos os campos corretamente!";
    return;
  }

  // Verifica se é Gmail
  if (!email.toLowerCase().endsWith("@gmail.com")) {
    msg.style.color = 'red';
    msg.textContent = "Use um e-mail do Gmail.";
    return;
  }

  // Verifica se o e-mail já está em uso
  auth.fetchSignInMethodsForEmail(email)
    .then(methods => {
      if (methods.length > 0) {
        msg.style.color = 'red';
        msg.textContent = "Este e-mail já está registrado!";
        return;
      }

      // Cadastra o usuário
      return auth.createUserWithEmailAndPassword(email, senha);
    })
    .then(userCredential => {
      if (!userCredential) return;

      return userCredential.user.updateProfile({ displayName: nome });
    })
    .then(() => {
      msg.style.color = 'black';
      msg.textContent = "Cadastro realizado! Redirecionando...";

      document.getElementById('cadNome').value = '';
      document.getElementById('cadEmail').value = '';
      document.getElementById('cadSenha').value = '';

      setTimeout(() => {
        window.location.href = 'cadastro2.html';
      }, 1000);
    })
    .catch(error => {
      msg.style.color = 'red';
      if (error.code === 'auth/invalid-email') msg.textContent = "Email inválido!";
      else if (error.code === 'auth/weak-password') msg.textContent = "A senha deve ter no mínimo 6 caracteres!";
      else if(error.code === 'auth/email-already-in-use') msg.textContent = "Email registrado já está em uso!";
      else msg.textContent = "Erro: " + error.message;
    });
}

// Função de login
function login() {
  const email = document.getElementById('logEmail').value.trim();
  const senha = document.getElementById('logSenha').value.trim();
  const msg = document.getElementById('msgLogin');

  if (!email || !senha) {
    msg.style.color = 'red';
    msg.textContent = "Preencha email e senha corretamente!";
    return;
  }

  auth.signInWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;
      msg.style.color = 'black';
      msg.textContent = `Login realizado! Bem-vindo, ${user.displayName || "usuário"}!`;

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1500);
    })
    .catch(error => {
      msg.style.color = 'red';
      if (error.code === 'auth/user-not-found') msg.textContent = "Usuário não encontrado.";
      else if (error.code === 'auth/wrong-password') msg.textContent = "Senha incorreta!";
      else if (error.code === 'auth/invalid-login-credentials') msg.textContent = "Email ou senha inválidos.";
      else if (error.code === 'auth/invalid-email') msg.textContent = "Email inválido! Use um gmail Google.";
      else msg.textContent = "Erro: " + error.message;
    });
}

function showCustomAlert(message) {
  const modal = document.getElementById('customAlert');
  const messageElement = document.getElementById('customAlertMessage');
  messageElement.textContent = message;
  modal.style.display = 'block';
}

function closeCustomAlert() {
  document.getElementById('customAlert').style.display = 'none';
}
// Seleciona todos os inputs de texto do formulário
const inputsTexto = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

// Função para permitir apenas letras, números e caracteres especiais comuns
function cleanInput(text) {
  // Letras, números e alguns símbolos comuns: . , - _ ' " ! ? @ # $ % & * ( ) ; :
  return text.replace(/[^a-zA-Z0-9 .,\\-_'\"!@#$%&*();:?]/g, '');
}

// Aplica a filtragem em todos os inputs
inputsTexto.forEach(input => {
  input.addEventListener('input', () => {
    input.value = cleanInput(input.value);
  });
});
function cleanInput(text) {
  return text.replace(/[^\w\s.,\-_'\"!@#$%&*();:?]/g, '');
}
