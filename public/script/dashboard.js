function listarDatacenters() {
    cardDatacenter = document.getElementById("painel-datacenter")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log('AAAAAAA')
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
                <div class="lista-status" id="lista_status">
                    <a href="PainelGeral2.html" class="salas" onclick="selecionarDatacenter(${item.id})"><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
                </div>
            `
    });
}

function ultimaAtualizacao(){
        fetch(`/registros/ultimaAtualizacao`, {
        method: "GET"
    })
        .then(res => {
            res.json().then(json => {
                const horario = json[0];
            })
        })
}