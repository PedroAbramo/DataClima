// importa os bibliotecas necessários
const serialport = require('serialport');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

async function inserirDadosSalas(poolBancoDados, temperaturaBase, umidadeBase, quantidadeSalas) {
    for (let i = 1; i <= quantidadeSalas; i++) {
        let temperatura, umidade;
        if (i === 1) {
            temperatura = temperaturaBase;
            umidade = umidadeBase;
        } else if (i === 13 || i === 14) {
            
            temperatura = parseFloat((Math.random() * (26 - 18) + 18).toFixed(1));
            umidade = Math.floor(Math.random() * (54 - 40 + 1) + 40);
        } else {
            const variacao = (Math.random() * 6) - 3 + (i * (Math.random() - 0.5));
            temperatura = parseFloat((temperaturaBase + variacao).toFixed(1));
            umidade = parseInt(umidadeBase + variacao);
        }

        // Lógica de alerta
        let motivo = [];
        let tipo = '';

        if (temperatura > 32) {
            motivo.push("Temperatura muito alta");
            tipo = "Crítico";
        } else if (temperatura < 18) {
            motivo.push("Temperatura baixa");
            tipo = tipo === "Crítico" ? "Crítico" : "Alerta";
        } else if (temperatura > 27) {
            motivo.push("Temperatura alta");
            tipo = tipo === "Crítico" ? "Crítico" : "Alerta";
        }

        if (umidade > 55) {
            motivo.push("Umidade alta");
            tipo = tipo === "Crítico" ? "Crítico" : "Alerta";
        } else if (umidade < 20) {
            motivo.push("Umidade muito baixa");
            tipo = "Crítico";
        } else if (umidade < 40) {
            motivo.push("Umidade baixa");
            tipo = tipo === "Crítico" ? "Crítico" : "Alerta";
        }

        const [result] = await poolBancoDados.execute(
            'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (?, ?, ?)',
            [i, temperatura, umidade]
        );
        const idRegistro = result.insertId;

        if (motivo.length > 0) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                [idRegistro, tipo, motivo.join(', ')]
            );
            console.log(`Alerta inserido no banco para sala ${i}:`, idRegistro, tipo, motivo.join(', '));
        }
        console.log(`Registro inserido: sala ${i} | temperatura: ${temperatura} | umidade: ${umidade}`);
    }
}

// função para comunicação serial
const serial = async () => {
    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.32.62', // ip que deve ser alterado de acordo com a máquina que receberá os dados
            user: 'dono',
            password: 'Sptech#2024',
            database: 'dataclima',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const temperatura = parseFloat(valores[0]);
        const umidade = parseInt(valores[1]);
        if (!Number.isFinite(temperatura) || !Number.isFinite(umidade)) {
            console.log("Valores inválidos, zerados ou negativos, não serão inseridos no banco:", temperatura, umidade);
            return;
        }
        // Alterar o número de salas conforme a quantidade
        const quantidadeSalas = 14;
        await inserirDadosSalas(poolBancoDados, temperatura, umidade, quantidadeSalas);
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// Comente ou remova a chamada do simular se não for usar a simulação
// simular();

// Chame a função serial para coletar dados reais do Arduino
(async () => { await serial(); })();