USE dataclima;

INSERT INTO empresa (nome, cnpj, telefone)
	VALUES
	('Tech Solutions', '12345678000199', '11999998888'),
	('CloudCorp', '98765432000177', '11888887777');
    
INSERT INTO usuario (fkEmpresa, nome, telefone, email, senha)
	VALUES
	(1, 'Carlos Silva', '11911112222', 'carlos@techsolutions.com', 'senha123'),
	(2, 'Mariana Souza', '11800001111', 'mariana@cloudcorp.com', 'senha456');
    
INSERT INTO datacenter (fkEmpresa, nome)
	VALUES
	(1, 'DataCenter Alpha'),
	(2, 'Cloud Center West');
    
INSERT INTO sala (fkDatacenter, nome)
	VALUES
	(1, 'Sala Servidores A'),
	(1, 'Sala Backup B'),
	(2, 'Sala Central');

INSERT INTO sensor (fkSala, nome)
	VALUES
	(1, 'Sensor 01'),
	(1, 'Sensor 02'),
	(2, 'Sensor 01'),
	(3, 'Sensor 01');
    
INSERT INTO registro (fkSensor, temperatura, umidade, dataRegistro) VALUES
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