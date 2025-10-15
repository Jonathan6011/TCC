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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função de cadastro com nome
function cadastrar() {
  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value.trim();
  const msg = document.getElementById('msgCadastro');

  if(!nome || !email || !senha) {
    msg.style.color = 'red';
    msg.textContent = "Preencha todos os campos corretamente!";
    return;
  }

  auth.createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      // Atualiza displayName com o nome do usuário
      return userCredential.user.updateProfile({ displayName: nome });
    })
    .then(() => {
      msg.style.color = 'cyan';
      msg.textContent = "Cadastro realizado! Redirecionando...";
      
      // Limpa os campos
      document.getElementById('cadNome').value = '';
      document.getElementById('cadEmail').value = '';
      document.getElementById('cadSenha').value = '';

      // Redireciona para cadastro2.html após 1 segundo
      setTimeout(() => {
        window.location.href = 'cadastro2.html';
      }, 1000); // 1000 ms = 1 segundo
    })
    .catch(error => {
      msg.style.color = 'red';
      if(error.code === 'auth/email-already-in-use') msg.textContent = "Email já cadastrado!";
      else if(error.code === 'auth/invalid-email') msg.textContent = "Email inválido!";
      else if(error.code === 'auth/weak-password') msg.textContent = "Senha muito fraca!";
      else msg.textContent = "Erro: " + error.message;
    });
}


// Função de login
function login() {
  const email = document.getElementById('logEmail').value.trim();
  const senha = document.getElementById('logSenha').value.trim();
  const msg = document.getElementById('msgLogin');

  if(!email || !senha) {
    msg.style.color = 'red';
    msg.textContent = "Preencha email e senha corretamente!";
    return;
  }

  auth.signInWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;
      msg.style.color = 'cyan';
      msg.textContent = `Login realizado! Bem-vindo, ${user.displayName}`;
      setTimeout(() => window.location.href = 'home.html', 1500);
    })
    .catch(error => {
      msg.style.color = 'red';
      if(error.code === 'auth/user-not-found') msg.textContent = "Usuário não encontrado!";
      else if(error.code === 'auth/wrong-password') msg.textContent = "Senha incorreta!";
      else msg.textContent = "Erro: " + error.message;
    });
}
