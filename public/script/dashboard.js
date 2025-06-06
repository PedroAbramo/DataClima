function listarDatacenters() {
    cardDatacenter = document.getElementById("lista_status")
    JSON.parse(sessionStorage.DATACENTERS).forEach(item => {
        console.log('AAAAAAA')
        console.log(item.datacenter)
            cardDatacenter.innerHTML += `
<<<<<<< HEAD
                    <a href="PainelGeral.html" class="salas" ><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
=======
            <div class="painel-status-datacenter">
                <div class="lista-status" id="lista_status">
                    <a href="PainelGeral2.html" class="salas" onclick="selecionarDatacenter(${item.id})"><div class="status alerta"></div><span id="nomeDatacenter">${item.datacenter}</span></a>
                </div>
            </div>
>>>>>>> a26fe66978025c2ef99513d573119bc6cf50c7f2
            `
    });
}