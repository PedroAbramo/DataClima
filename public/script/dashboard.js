function listarDatacenters() {
    cardDatacenter = document.getElementById("painel-datacenter")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log('AAAAAAA')
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
            <div class="painel-status-datacenter">
                <div class="lista-status" id="lista_status">
                    <a href="PainelGeral2.html" class="salas" onclick="selecionarDatacenter(${item.id})"><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
                </div>
            </div>
            `
    });
}

function ultimaAtualizacao(){
    let DataHora = document.getElementById("DataHora_select");
        fetch(`/registros/ultimaAtualizacao`, {
        method: "GET"
    })
        .then(res => {
            res.json().then(json => {
                console.log(json);
                let data = json[0].dataRegistro;
                    let valor1 = data.split('T')[0];
                    const [ano, mes, dia] = valor1.split('-');
                    let valor2 = data.split('T')[1];
                    let valor3 = valor2.split('.')[0];
                    const [hora, minuto, segundo] = valor3.split(':');
                    DataHora.innerHTML = `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;
            })
        })

    }

function selecionarDatacenter(id) {
    sessionStorage.setItem("ID_DATACENTER", id);
    window.location.href = "PainelGeral2.html";
}