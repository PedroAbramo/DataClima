-- EMPRESAS
INSERT INTO empresa (id, nome, cnpj, telefone, codigo_ativacao) VALUES
(1, 'Dataclima', '1', '1', '27'),
(2, 'ClimaSeg', '23456789000123', '11988776655', 'ABC'),
(3, 'WeatherPro', '34567890000145', '11999998888', 'XYZ'),
(4, 'TermoData', '45678901000156', '11911112222', 'B12'),
(5, 'EcoMonitor', '56789012000167', '11888889999', 'C34');

select * from empresa;

-- USUÁRIOS
INSERT INTO usuario (fkEmpresa, nome, sobrenome, telefone, email, senha) VALUES
(1, 'João', 'Silva', '11987654321', 'joao@dataclima.com', 'senha123'),
(1, 'Ana', 'Souza', '11988887777', 'ana@dataclima.com', 'abc123'),
(2, 'Marcos', 'Pereira', '11999996666', 'marcos@climaseg.com', 'pass456'),
(4, 'Beatriz', 'Lima', '11912345678', 'beatriz@termodata.com', 'senha789'),
(4, 'Eduardo', 'Moraes', '11987651234', 'eduardo@termodata.com', 'senha000'),
(1, 'Pedro', 'Cesar', '11966257298', 'pedro@sptech.school', '1234'),
(5, 'Clara', 'Martins', '11876543210', 'clara@ecomonitor.com', 'eco123');

-- DATACENTERS
INSERT INTO datacenter (fkEmpresa, nome) VALUES
(1, 'DC São Paulo'),
(1, 'DC Campinas'),
(2, 'DC Rio de Janeiro'),
(4, 'DC Belo Horizonte'),
(5, 'DC Curitiba');

-- SALAS
INSERT INTO sala (fkDatacenter, nome) VALUES
(1, 'Sala A'),
(1, 'Sala B'),
(2, 'Sala C'),
(3, 'Sala RJ-1'),
(4, 'Sala BH-1'),
(4, 'Sala BH-2'),
(5, 'Sala CTBA-1'),
(5, 'Sala CTBA-2');

-- SENSORES
INSERT INTO sensor (fkSala, nome, dataInstalacao) VALUES
(1, 'Sensor Temperatura A', '2024-01-10 08:00:00'),
(2, 'Sensor Umidade B', '2024-02-15 09:30:00'),
(3, 'Sensor Sala C', '2024-03-01 10:15:00'),
(4, 'Sensor RJ-1', '2024-04-20 11:00:00'),
(5, 'Sensor BH-1', '2024-05-01 08:00:00'),
(6, 'Sensor BH-2', '2024-05-01 09:00:00'),
(7, 'Sensor Curitiba-1', '2024-05-01 10:00:00'),
(8, 'Sensor Curitiba-2', '2024-05-01 11:00:00');

-- REGISTROS
INSERT INTO registro (fkSensor, temperatura, umidade, dataRegistro) VALUES
(1, 25, 60, '2025-06-07 09:00:00'),
(1, 28, 65, '2025-06-07 10:00:00'),
(2, 32, 75, '2025-06-07 10:05:00'),
(3, 38, 85, '2025-06-07 10:10:00'),
(4, 45, 92, '2025-06-07 10:15:00'),
(5, 24, 55, '2025-06-07 09:30:00'),
(5, 29, 60, '2025-06-07 10:30:00'),
(6, 35, 80, '2025-06-07 11:00:00'),
(7, 42, 85, '2025-06-07 11:15:00'),
(8, 46, 95, '2025-06-07 11:30:00');
