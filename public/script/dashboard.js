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
                let data = new Date(json[0].dataRegistro).toLocaleString('pt-BR');
                let dataatual = data.split(', ')[0];
                let horario = data.split(', ')[1];
                DataHora.forEach(span => span.innerHTML = `${dataatual} - ${horario}`);
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

function listarAlertasAtivos() {
    let idDatacenter = sessionStorage.getItem("ID_DATACENTER");
    fetch(`/alertas/listarAlertasAtivos/${idDatacenter}`)
        .then(res => res.json())
        .then(alertas => {
            const alertaContainer = document.getElementById("alertaContainer");
            if (!alertaContainer) {
                console.error("alertaContainer não encontrado!");
                return;
            }
            alertaContainer.innerHTML = '';
            if (!Array.isArray(alertas) || alertas.length === 0) {
                alertaContainer.innerHTML = '<div>Nenhum alerta ativo.</div>';
                return;
            }
            for (let i = 0; i < alertas.length; i++) {
                const alerta = alertas[i];
                alertaContainer.innerHTML += `
                    <div class="alerta-item">
                        <span class="alerta-sensor">${alerta.nome_sensor}</span>
                        <span class="alerta-motivo">${alerta.motivo}</span>
                        <span class="alerta-data">${alerta.dataRegistro}</span>
                    </div>
                `;
            }
        })
        .catch(err => {
            console.error("Erro ao buscar alertas:", err);
        });
}