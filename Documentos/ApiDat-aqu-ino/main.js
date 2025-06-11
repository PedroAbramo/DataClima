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
            host: '192.168.15.42', // ip que deve ser alterado de acordo com a máquina que receberá os dados
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
        const variacao2 = Number((Math.random() * 10) - 5);
        const temperatura2 = parseFloat(temperatura + variacao);
        const umidade2 = parseInt(umidade + variacao);
        const temperatura3 = parseFloat(temperatura + variacao2);
        const umidade3 = parseInt(umidade + variacao2);
        let motivo = [];
        let tipo = '';
        let motivo2 = [];
        let tipo2 = '';
        let motivo3 = [];
        let tipo3 = '';

        if (!Number.isFinite(temperatura) && !Number.isFinite(umidade)) {
            console.log("Valores inválidos, zerados ou negativos, não serão inseridos no banco:", temperatura, umidade);
            return;
        }

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

        if (temperatura2 > 32) {
            motivo2.push("Temperatura muito alta");
            tipo2 = "Crítico"
        } else if (temperatura2 < 18) {
            motivo.push("Temperatura baixa");
            tipo2 = tipo === "Crítico" ? "Crítico" : "Alerta";
        } else if (temperatura2 > 27) {
            motivo2.push("Temperatura alta");
            tipo2 = tipo2 === "Crítico" ? "Crítico" : "Alerta";
        }

        if (umidade2 > 55) {
            motivo2.push("Umidade alta");
            tipo2 = tipo2 === "Crítico" ? "Crítico" : "Alerta";
        } else if (umidade2 < 20) {
            motivo2.push("Umidade muito baixa");
            tipo2 = "Crítico";
        } else if (umidade2 < 40) {
            motivo2.push("Umidade baixa");
            tipo2 = tipo2 === "Crítico" ? "Crítico" : "Alerta";
        }

        if (temperatura3 > 32) {
            motivo3.push("Temperatura muito alta");
            tipo3 = "Crítico"
        } else if (temperatura3 < 18) {
            motivo3.push("Temperatura baixa");
            tipo3 = tipo3 === "Crítico" ? "Crítico" : "Alerta";
        }
        else if (temperatura3 > 27) {
            motivo3.push("Temperatura alta");
            tipo3 = tipo3 === "Crítico" ? "Crítico" : "Alerta";
        }

        if (umidade3 > 55) {
            motivo3.push("Umidade alta");
            tipo3 = tipo3 === "Crítico" ? "Crítico" : "Alerta";
        } else if (umidade3 < 20) {
            motivo3.push("Umidade muito baixa");
            tipo3 = "Crítico";
        } else if (umidade3 < 40) {
            motivo3.push("Umidade baixa");
            tipo3 = tipo3 === "Crítico" ? "Crítico" : "Alerta";
        }


            const [result1] = await poolBancoDados.execute(
                'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (1, ?, ?)',
                [temperatura, umidade]
            );
            let idRegistro1 = result1.insertId;
            if (motivo.length > 0) {
                await poolBancoDados.execute(
                    'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                    [idRegistro1, tipo, motivo.join(', ')]
                );
                console.log("Alerta inserido no banco: ", idRegistro1 + ", " + tipo + ", " + motivo.join(', '));
            }
            const [result2] = await poolBancoDados.execute(
                'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (2, ?, ?)',
                [temperatura2, umidade2]
            );
            let idRegistro2 = result2.insertId;
            if (motivo2.length > 0) {
                await poolBancoDados.execute(
                    'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                    [idRegistro2, tipo2, motivo2.join(', ')]
                );
                console.log("Alerta inserido no banco: ", idRegistro2 + ", " + tipo + ", " + motivo.join(', '));
            }



            const [result3] = await poolBancoDados.execute(
                'INSERT INTO registro (fksensor, temperatura, umidade) VALUES (3, ?, ?)',
                [temperatura3, umidade3]
            );
            let idRegistro3 = result3.insertId;
            if (motivo3.length > 0) {
                await poolBancoDados.execute(
                    'INSERT INTO alerta (fkRegistro, tipo, motivo) VALUES (?, ?, ?)',
                    [idRegistro3, tipo3, motivo3.join(', ')]
                );
                console.log("Alerta inserido no banco: ", idRegistro3 + ", " + tipo + ", " + motivo.join(', '));
            }
            console.log(temperatura + ", " + umidade);
            console.log(temperatura2 + ", " + umidade2);
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// Função para simular leitura do Arduino

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
            'INSERT INTO registro (fksensor, temperatura, umidade, dataRegistro) VALUES (1, ?, ?, "2025-06-04")',
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
// Função principal de simulação

const simular = async () => {
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost', // ip que deve ser alterado de acordo com a máquina que receberá os dados
            user: 'aluno',
            password: '',
            database: 'dataclima',
            port: 3306
        }
    ).promise();

    const simularRepetido = async () => {
        await simularLeituraArduino(poolBancoDados, "28.5;60");
        await simularLeituraArduino(poolBancoDados, "30.2;55");
    };

    // Chama a função a cada 2 segundos (2000 ms)
    setInterval(simularRepetido, 1000);
};

simular();


// Comente ou remova a chamada do serial se não for usar a serial real
//(async () => { await serial(); })();