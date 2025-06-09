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

                valorTempMin.innerHTML = maxmin.temperaturaMin + "°C";

                valorHumiMax.innerHTML = maxmin.umidadeMax + "%";

                valorHumiMin.innerHTML = maxmin.UmidadeMin + "%";

                console.log(NumCadastro);
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