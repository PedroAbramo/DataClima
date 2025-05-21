DROP DATABASE IF EXISTS dataclima;
CREATE DATABASE dataclima;
USE dataclima;

CREATE TABLE empresa (
	id INT NOT NULL auto_increment,
    nome VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    telefone VARCHAR(11),
    PRIMARY KEY (id),
    UNIQUE (cnpj)
);

CREATE TABLE usuario (
	id INT NOT NULL auto_increment,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)), -- CONSTRAINT (NOME DA CONSTRAINT) CHECK (O QUE ELE ESTA CHECANDO, NO CASO O TAMANHO DA STRING)    
    PRIMARY KEY (id),
    UNIQUE (email), -- UNIQUE  | UNIQUE INDEX, DEFINE UM INDEX NO EMAIL E TRANSFORMA ELE EM UM VALOR UNICO, OU SEJA, NAO PODE TER OUTROS IGUAIS (MESMO EMAIL)
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id), -- CONSTRAINT (NOME DA CONSTRAINT) FOREIGN KEY (QUAL A COLUNA QUE VAI SER COLOCADA A CONSTRAINT) REFERENCES (TABELA(COLUNA DA TABELA, NO CASO A PRIMARY KEY OU O ID))
	KEY ix_fkEmprsa (fkEmpresa) -- DEFINIR A FOREIGN KEY COMO INDEX PARA AGILIZAR A FILTRAGEM NO SEARCH
);

CREATE TABLE datacenter (
	id INT NOT NULL auto_increment,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_empresa_datacenter FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    KEY ix_fkEmpresa (fkEmpresa)
);

CREATE TABLE sala (
	id INT NOT NULL auto_increment,
    fkDatacenter INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_datacenter_sala FOREIGN KEY (fkDatacenter) REFERENCES datacenter(id),
    KEY ix_fkDatacenter (fkDatacenter)
);

CREATE TABLE sensor (
    fkSala INT NOT NULL,
    nome VARCHAR(50) NOT NULL, -- PODE SER OUTRA COISA ALEM DE NOME!
    dataInstalacao DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (fkSensor),
    CONSTRAINT fk_sala_sensor FOREIGN KEY (fkSala) REFERENCES sala(id),
    KEY ix_fkSala (fkSala)
);

CREATE TABLE registro (
	id INT NOT NULL auto_increment,
    fkSensor INT NOT NULL,
    temperatura INT NOT NULL,
    umidade INT NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    CONSTRAINT fk_sensor_registro FOREIGN KEY (fkSensor) REFERENCES sensor(id),
    KEY ix_fksensor_data (fkSensor,dataRegistro)
);

CREATE TABLE alerta (
	id INT NOT NULL auto_increment,
    fkRegistro INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ativo', 
    tipo VARCHAR(50) NOT NULL,
    motivo VARCHAR(50) NOT NULL,
    data_resolucao DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT chk_status CHECK(status IN('ativo', 'resolvido')),
    CONSTRAINT chk_tipo CHECK(tipo IN('Leve', 'Médio','Grave')),
    CONSTRAINT fk_registro_alerta FOREIGN KEY (fkRegistro) REFERENCES registro(id),
    KEY ix_fkregistro (fkRegistro)
);

