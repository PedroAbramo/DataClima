function listarDatacenters() {
    cardDatacenter = document.getElementById("painel-datacenter")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
                <div class="lista-status" id="lista_status">
                    <a href="PainelGeral2.html" class="salas" onclick="selecionarDatacenter(${item.id}, '${item.datacenter}')"><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
                </div>
            `
    });
}

function ultimaAtualizacao(){
    let DataHora = document.querySelectorAll(".DataHora_select");
        fetch(`/registros/ultimaAtualizacao`, {
        method: "GET"
    })
        .then(res => {
            res.json().then(json => {
                let data = json[0].dataRegistro;
                    let valor1 = data.split('T')[0];
                    let [ano, mes, dia] = valor1.split('-');
                    let valor2 = data.split('T')[1];
                    let valor3 = valor2.split('.')[0];
                    let [hora, minuto, segundo] = valor3.split(':');
                    if (hora < 3) {
                        hora += 24
                        dia -= 1
                    } 
                    DataHora.forEach(span => span.innerHTML = `${dia}/${mes}/${ano} - ${hora-3}:${minuto}:${segundo}`);
            })
        })
    }

function selecionarDatacenter(id, data) {
    sessionStorage.setItem("ID_DATACENTER", id);
    sessionStorage.setItem("NOME_DATACENTER", data);
    window.location.href = "PainelGeral2.html";
}


function TemperaturaUmidadeMAXMIN(idSala){

    fetch(`/registros/TemperaturaUmidadeMAXMIN/${idSala}`, {
        method: "GET"
    })
        .then(res => {
            res.json().then(json => {
                const maxmin = json[0];

                valorTempMax.innerHTML = maxmin.temperaturaMax + "°C";
                if (maxmin.temperaturaMax > 32) {
                    valorTempMax.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.temperaturaMax > 27 || maxmin.temperaturaMax < 18) {
                    valorTempMax.style.color = "#E0E243"; // amarelo
                } else if (maxmin.temperaturaMax <= 27 || maxmin.temperaturaMax >= 18 ) {
                    valorTempMax.style.color = "#14EE00"; // verde
                }

                valorTempMin.innerHTML = maxmin.temperaturaMin + "°C";
                if (maxmin.temperaturaMin > 32) {
                    valorTempMin.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.temperaturaMin > 27 || maxmin.temperaturaMin < 18) {
                    valorTempMin.style.color = "#E0E243"; // amarelo
                } else if (maxmin.temperaturaMin <= 27 || maxmin.temperaturaMin >= 18 ) {
                    valorTempMin.style.color = "#14EE00"; // verde
                }

                valorHumiMax.innerHTML = maxmin.umidadeMax + "%";
                if (maxmin.umidadeMax < 20) {
                    valorHumiMax.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.umidadeMax < 40 || maxmin.umidadeMax > 55) {
                    valorHumiMax.style.color = "#E0E243"; // amarelo
                } else if (maxmin.umidadeMax >= 40 || maxmin.umidadeMax <= 55 ) {
                    valorHumiMax.style.color = "#14EE00"; // verde
                }

                valorHumiMin.innerHTML = maxmin.UmidadeMin + "%";
                if (maxmin.UmidadeMin < 20) {
                    valorHumiMin.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.UmidadeMin < 40 || maxmin.UmidadeMin > 55) {
                    valorHumiMin.style.color = "#E0E243"; // amarelo
                } else if (maxmin.UmidadeMin >= 40 || maxmin.UmidadeMin <= 55 ) {
                    valorHumiMin.style.color = "#14EE00"; // verde
                }

            })
        })


}

function listarSalas() {
    cardSala = document.getElementById("salaselect")
    JSON.parse(sessionStorage.SALAS).forEach(item => {
        console.log(item.sala)
            cardSala.innerHTML += `
                <option value="${item.id}">${item.nome}</option>
            `
    });
}

function trocaSala() {
    let sala = document.getElementById("salaselect").value;
    let salas = JSON.parse(sessionStorage.SALAS);
    let salaObj = null;
    for (let i = 0; i < salas.length; i++) {
        if (salas[i].id == sala) {
            salaObj = salas[i];
            break;
        }
    }
    sessionStorage.setItem("SALA", sala);
    sessionStorage.setItem("NOME_SALA", salaObj.nome);
    document.getElementById("titulo").innerHTML = salaObj.nome;
    buscarRegistrosPeriodicamente();
    TemperaturaUmidadeMAXMIN(sala);
}