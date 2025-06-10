// importa os bibliotecas necessários
const serialport = require('serialport');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// função para comunicação serial
const serial = async () => {
    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.32.66', // ip que deve ser alterado de acordo com a máquina que receberá os dados
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
        const variacao = Number((Math.random() * 6) - 3);
        const temperatura2 = parseFloat(temperatura + variacao);
        const umidade2 = parseInt(umidade + variacao);
        let motivo = [];
        let tipo = '';

        if (temperatura > 32) {
            motivo.push("Temperatura muito alta");
            tipo = "Crítico"
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
                'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (1, ?, ?)',
                [temperatura, umidade]
            );
            const idRegistro = result.insertId;
            await poolBancoDados.execute(
                'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (2, ?, ?)',
                [temperatura2, umidade2]
            );



            if (motivo.length > 0) {
                await poolBancoDados.execute(
                    'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                    [idRegistro, tipo, motivo.join(', ')]
                    
            );
        console.log("Alerta inserido no banco: ", idRegistro + ", " + tipo + ", " + motivo.join(', '));
            }
    });

    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });



}

// Função para simular leitura do Arduino
/*
async function simularLeituraArduino(poolBancoDados, data) {
    const valores = data.split(';');
    const temperatura = parseFloat(valores[0]);
    const umidade = parseInt(valores[1]);
    const variacao = Number((Math.random() * 6) - 3);
    const temperatura2 = parseFloat(temperatura + variacao);
    console.log(variacao);
    const umidade2 = parseInt(umidade + variacao);
    let motivo = [];
    let tipo = '';

    if (temperatura > 32) {
        motivo.push("Temperatura muito alta");
        tipo = "Crítico"
    } else if (temperatura < 18) {
        motivo.push("Temperatura baixa");
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
            'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (1, ?, ?)',
            [temperatura, umidade]
        );
        const idRegistro = result.insertId;
        await poolBancoDados.execute(
            'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (2, ?, ?)',
            [temperatura2, umidade2]
        );
        console.log("valores inseridos no banco: ", umidade + ", " + temperatura);



        if (motivo.length > 0) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                [idRegistro, tipo, motivo.join(', ')]
        );
        console.log("Alerta inserido no banco: ", idRegistro + ", " + tipo + ", " + motivo.join(', '));
        }
}
*/
// Função principal de simulação
/*
const simular = async () => {
    let poolBancoDados = mysql.createPool(
        {
            host: '192.168.15.42',
            user: 'dono',
            password: 'Sptech#2024',
            database: 'dataclima',
            port: 3307
        }
    ).promise();

    const simularRepetido = async () => {
        await simularLeituraArduino(poolBancoDados, "28.5;60");
        await simularLeituraArduino(poolBancoDados, "28.5;60");
        await simularLeituraArduino(poolBancoDados, "28.5;60");
        await simularLeituraArduino(poolBancoDados, "28.5;60");
        await simularLeituraArduino(poolBancoDados, "28.5;60");



    };

    // Chama a função a cada 2 segundos (2000 ms)
    setInterval(simularRepetido, 100);
};

simular();  Chama a simulação
*/

// Comente ou remova a chamada do serial se não for usar a serial real
(async () => { await serial(); })();