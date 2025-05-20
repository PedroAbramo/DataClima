function validarCampos(input, label) {
    let valido = true;
    if (input == "ipt_nome"){
        let valido = validarNome(input, label);
    } else if (input == "ipt_email") {
        let valido = validarEmail(input, label);
    } 
    if(input.value == "") {
        console.log("Campo inválido");
        return false;
    }
    if (valido == false) {
        return false;
    } else {
        return true;
    }
}

function validarNome(input, label) {
    let valido = true;
    const regexnome = /^[a-zA-Z0-9\s]*$/;
    if (regexnome.test(input.value) == false) {
        input.classList.add("erro");
        label.classList.add("erro");
        console.log("Campo nome inválido");
        valido = false;
    }
    return valido;
}

function validarEmail(input, label) {
    let valido = true;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(input.value)) {
        input.classList.add("erro");
        label.classList.add("erro");
        console.log("Email inválido");
        valido = false;
    }
    return valido;
}

function validarSenha(input, label, input1, label1) {
    let valido = true;
    if (input.value.length < 8 || input.value.length > 32) {
        input.classList.add("erro");
        label.classList.add("erro");
        console.log("A senha deve conter no mínimo 8 caractéres!");
        valido = false;
    }
    if (input.value != input1.value) {
        input1.classList.add("erro");
        label1.classList.add("erro");
        document.getElementById("senhaerro").classList.add("erro");
        console.log("As senhas não conferem");
        document.getElementById("senhaerro").innerHTML = "As senhas não conferem!";
        valido = false;
    }
    return valido;
}

function validarData(input, label) {
    let valido = true;
    const data = new Date(input.value);
    const hoje = new Date();
    if (isNaN(data.getTime()) || data > hoje || data < new Date(1900, 0, 1)) {
        input.classList.add("erro");
        label.classList.add("erro");
        document.getElementById("dataerro").classList.add("erro");
        console.log("Data de nascimento inválida");
        document.getElementById("dataerro").innerHTML = "Data de nascimento inválida!";
        valido = false;
    }
    return valido;
}