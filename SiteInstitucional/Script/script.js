/* Pagina de login */

function login() {

    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var emailC = 'admin';
    var senhaC = '123';
    var validacao = (email != emailC || senha != senhaC);

    if (validacao) {
        while (validacao) {
            alert(`E-mail ou senha incorretos!`);
            break;
        }
    } else {
        window.location.href = "index.html";
    }

}

/* Pagina de cadastro */

function cadastrar() {
    var nome = ipt_nome.value;
    var sobrenome = ipt_sobrenome.value;
    var telefone = ipt_telefone.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var confSenha = ipt_ConfSenha.value;

    while (nome == "" || sobrenome == "" ||telefone == "" || email == "" || senha == "" || confSenha == "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    while (senha != confSenha) {
        alert("As senhas não coincidem! Digite novamente.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}