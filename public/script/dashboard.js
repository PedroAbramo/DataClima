function listarDatacenters() {
    cardDatacenter = document.getElementById("lista_status")
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

function selecionarDatacenter(id) {
    sessionStorage.setItem("ID_DATACENTER", id);
    window.location.href = "PainelGeral2.html";
}