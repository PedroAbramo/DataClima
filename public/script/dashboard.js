function listarDatacenters() {
    cardDatacenter = document.getElementById("painel-datacenter")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
                        <div class="lista-status" id="lista_status">
                            <a href="PainelGeral2.html" class="salas" onclick="selecionarDatacenter(${item.id}, '${item.datacenter}')">
                                <div class="status normal" id="status-dc-${item.id}"></div>
                                <span id="nomeDatacenter">${item.datacenter}</span>
                            </a>
                        </div>
        `;	
    });
}

function ultimaAtualizacao(){
    let DataHora = document.querySelectorAll(".DataHora_select");
        fetch(`/registros/ultimaAtualizacao`, {
        method: "GET"
    })
        .then(res => {
            res.json().then(json => {
                    let dataFormatada = formatarDataHora(json[0].dataRegistro);
                DataHora.forEach(span => span.innerHTML = `${dataFormatada}`);
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
                if (json[0].temperaturaMax === null || json[0].umidadeMax === null) {
                    console.error("Dados de temperatura ou umidade não encontrados.");
                    return;
                }
                valorTempMax.innerHTML = maxmin.temperaturaMax + "°C";
                dataTempMax.innerHTML = formatarHora(maxmin.dataTempMax);
                if (maxmin.temperaturaMax > 32) {
                    valorTempMax.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.temperaturaMax > 27 || maxmin.temperaturaMax < 18) {
                    valorTempMax.style.color = "#E0E243"; // amarelo
                } else if (maxmin.temperaturaMax <= 27 || maxmin.temperaturaMax >= 18 ) {
                    valorTempMax.style.color = "#14EE00"; // verde
                }

                valorTempMin.innerHTML = maxmin.temperaturaMin + "°C";
                dataTempMin.innerHTML = formatarHora(maxmin.dataTempMin);
                if (maxmin.temperaturaMin > 32) {
                    valorTempMin.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.temperaturaMin > 27 || maxmin.temperaturaMin < 18) {
                    valorTempMin.style.color = "#E0E243"; // amarelo
                } else if (maxmin.temperaturaMin <= 27 || maxmin.temperaturaMin >= 18 ) {
                    valorTempMin.style.color = "#14EE00"; // verde
                }

                valorHumiMax.innerHTML = maxmin.umidadeMax + "%";
                dataHumiMax.innerHTML = formatarHora(maxmin.dataUmiMax);
                if (maxmin.umidadeMax < 20) {
                    valorHumiMax.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.umidadeMax < 40 || maxmin.umidadeMax > 55) {
                    valorHumiMax.style.color = "#E0E243"; // amarelo
                } else if (maxmin.umidadeMax >= 40 || maxmin.umidadeMax <= 55 ) {
                    valorHumiMax.style.color = "#14EE00"; // verde
                }

                valorHumiMin.innerHTML = maxmin.umidadeMin + "%";
                dataHumiMin.innerHTML = formatarHora(maxmin.dataUmiMin);
                if (maxmin.umidadeMin < 20) {
                    valorHumiMin.style.color = "#FF0000"; // vermelho                   
                } else if (maxmin.umidadeMin < 40 || maxmin.umidadeMin > 55) {
                    valorHumiMin.style.color = "#E0E243"; // amarelo
                } else if (maxmin.umidadeMin >= 40 || maxmin.umidadeMin <= 55 ) {
                    valorHumiMin.style.color = "#14EE00"; // verde
                }

            })
        })


}

function listarSalas() {
    const cardSala = document.getElementById("salaselect");
    const salas = JSON.parse(sessionStorage.SALAS);
    for (let i = 0; i < salas.length; i++) {
        const item = salas[i];
        console.log(item.sala);
        cardSala.innerHTML += `
            <option value="${item.id}">${item.sala}</option>
        `;
    }
}

function listarAlertasAtivos() {
    let idDatacenter = sessionStorage.getItem("ID_DATACENTER");
    fetch(`/alertas/listarAlertasAtivos/${idDatacenter}`)
        .then(res => res.json())
        .then(alertas => {
            const painelAvisos = document.getElementById("painelAvisos");
            if (!painelAvisos) {
                console.error("painelAvisos não encontrado!");
                return;
            }
            painelAvisos.innerHTML = '';
            if (!Array.isArray(alertas) || alertas.length === 0) {
                painelAvisos.innerHTML = '<div>Nenhum alerta ativo.</div>';
                return;
            }

            for (let i = 0; i < alertas.length; i++) {
                const alerta = alertas[i];
                // Formatação igual à função ultimaAtualizacao
                let dataFormatada = formatarDataHora(alerta.dataRegistro);

                painelAvisos.innerHTML += `
                    <div class="alerta-item">
                        <span class="alerta-sensor">${alerta.nome_sensor}</span>
                        <span class="alerta-motivo">${alerta.motivo}</span>
                        <span class="alerta-data">${dataFormatada}</span>
                    </div>
                `;
            }
        })
        .catch(err => {
            console.error("Erro ao buscar alertas:", err);
        });
}

function formatarDataHora(valor) {
                let data = new Date(valor).toLocaleString('pt-BR');
                let dataatual = data.split(', ')[0];
                let horario = data.split(', ')[1];
                let dataFormatada = `${dataatual} - ${horario}`;
                return dataFormatada;
}

function formatarHora(valor) {
    let horario = new Date(valor).toLocaleTimeString('pt-BR');
    console.log(horario);
    return horario;
}