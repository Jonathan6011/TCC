// Config Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
      msg.style.color = 'turquoise';
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
      else if (error.code === 'auth/weak-password') msg.textContent = "Senha deve ter no mínimo 6 caracteres!";
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
      msg.style.color = 'turquoise';
      msg.textContent = `Login realizado! Bem-vindo, ${user.displayName || "usuário"}!`;

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1500);
    })
    .catch(error => {
      msg.style.color = 'red';
      if (error.code === 'auth/user-not-found') msg.textContent = "Usuário não encontrado!";
      else if (error.code === 'auth/wrong-password') msg.textContent = "Senha incorreta!";
      else msg.textContent = "Erro: " + error.message;
    });
}
