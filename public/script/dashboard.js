function listarDatacenters() {
    cardDatacenter = document.getElementById("lista_status")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log('AAAAAAA')
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
            <div class="painel-status-datacenter">
                <div class="lista-status" id="lista_status">
                    <a href="PainelGeral.html" class="salas"><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
                </div>
            </div>
            `

    });
}