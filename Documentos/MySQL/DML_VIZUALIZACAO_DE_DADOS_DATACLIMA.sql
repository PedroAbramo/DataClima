SELECT * FROM empresa;

SELECT * FROM usuario;

SELECT * FROM datacenter;

SELECT * FROM sala;

SELECT * FROM sensor;

SELECT * FROM registro;

SELECT * FROM alerta;

-- ver todos os registros com nome do sensor e horario
SELECT 
    r.id as 'ID do Registro',
    s.nome as 'Nome do Sensor',
    r.temperatura,
    r.umidade,
    r.dataRegistro as 'Data do Registro'
FROM registro r
INNER JOIN
sensor s ON r.fkSensor = s.id
ORDER BY r.dataRegistro desc;

-- ver registros de todos os sensores de uma sala
SELECT 
    r.id as 'ID do Registro',
    sa.nome as 'Nome da Sala',
    s.nome as 'Nome do Sensor',
    r.temperatura,
    r.umidade,
    r.dataRegistro as 'Data do Registro'
FROM registro r
INNER JOIN
sensor s ON r.fkSensor = s.id
INNER JOIN
sala sa ON s.fkSala = sa.id
WHERE
sa.id = 1
ORDER BY r.dataRegistro desc;

-- registro de um sensor
SELECT 
	r.id as 'ID do Registro',
	s.nome as 'Nome do Sensor',
    concat(r.temperatura,'ºC') as Temperatura,
    concat(r.umidade,'%') as Umidade,
    r.dataRegistro as 'Data do Registro'
FROM registro r
INNER JOIN
sensor s ON r.fkSensor = s.id
WHERE fkSensor = 3
ORDER BY dataRegistro;

-- ver alerta
SELECT 
    a.id as 'ID do Alerta',
    s.nome as 'Nome do Sensor',
    a.tipo as Tipo,
    a.motivo as Motivo,
    r.dataRegistro as 'Data do Registro'
FROM alerta a
JOIN registro r ON a.fkRegistro = r.id
JOIN sensor s ON r.fkSensor = s.id
WHERE a.status = 'ativo'
ORDER BY r.dataRegistro DESC;