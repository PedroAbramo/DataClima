USE dataclima;

INSERT INTO empresa (nome, cnpj, telefone)
	VALUES
	('SPTECH', '12345678000199', '11999998888');
    
INSERT INTO usuario (fkEmpresa, nome, sobrenome, telefone, email, senha)
	VALUES
	(1, 'Carlos', 'Silva', '11911112222', 'carlos@sptech.school', 'senha123');
    
INSERT INTO datacenter (fkEmpresa, nome)
	VALUES
	(1, 'DataCenter 1');
    
INSERT INTO sala (fkDatacenter, nome)
	VALUES
	(1, 'Sala 01');

INSERT INTO sensor (fkSala, nome)
	VALUES
	(1, 'Sensor 01'),
	(1, 'Sensor 02'),
	(2, 'Sensor 01'),
	(3, 'Sensor 01');
    
INSERT INTO registro (fkSensor, temperatura, umidade, dataRegistro) 
	VALUES
	-- 08:00
	(1, 22, 50, '2025-04-14 08:00:00'),
	(2, 23, 55, '2025-04-14 08:00:00'),
	(3, 28, 62, '2025-04-14 08:00:00'),

	-- 09:00
	(1, 21, 48, '2025-04-14 09:00:00'),
	(2, 24, 53, '2025-04-14 09:00:00'),
	(3, 27, 60, '2025-04-14 09:00:00'),

	-- 10:00
	(1, 20, 45, '2025-04-14 10:00:00'),
	(2, 25, 50, '2025-04-14 10:00:00'),
	(3, 29, 65, '2025-04-14 10:00:00');
    
INSERT INTO alerta (fkRegistro, status, tipo, motivo, data_resolucao)
	VALUES
	(2, 'ativo', 'Grave', 'Temperatura acima do ideal', NULL),
	(4, 'ativo', 'Leve', 'Temperatura e umidade elevadas', NULL);