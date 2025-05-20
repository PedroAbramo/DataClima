# Implementação do Sistema de Monitoramento com Sensores de Temperatura e Umidade nos Data Centers

**Contexto**

Um centro de processamento de dados ou data center é um espaço dedicado para abrigar sistemas de computador e componentes associados, como sistemas de telecomunicações e armazenamento. Os data centers são essenciais para o armazenamento e processamento de informações, exigindo medidas rigorosas de proteção. Além de sistemas contra incêndio e controle de acessos, o controle de temperatura e umidade é crucial para evitar danos estruturais e perda de dados.

A ASHRAE (Sociedade Americana de Engenheiros de Aquecimento Refrigeração e Ar-condicionado) recomenda que a umidade relativa do ar nesses ambientes fique entre 45% e 55%, com temperatura inferior a 30°C. A falta desse controle pode causar diversos problemas, como:
 1 - Oxidação de fios e cabos, levando a falhas nos servidores e downtime, como ocorreu com o Facebook em 2011. 

 2 - Curtos-circuitos e incêndios, devido às altas temperaturas dos equipamentos em operação contínua. 

 3 - Perda de dados, exemplificada pelo incidente em um banco romeno, onde a vibração causada por um gás extinguidor destruiu os HDs. 

 4 - Condensação e ponto de orvalho, que podem levar à formação de água no teto e paredes, aumentando a umidade no ambiente. 

Para entender o custo de um data center deve-se notar que o sistema inteiro é feito de 5 componentes principais: a infraestrutura onde vai ser armazenado as máquinas; as unidades de armazenamento onde vai ficar os dados; as licenças de software dos sistemas operacionas, SGBD, software de redes e outras aplicações que requerem uma licença; conexão com a internet; um sistema de resfriamento; e um elevado gasto em energia. Sendo que, a energia operando pelo consumo mensal para manter o Data Center representa a maior parte dos gastos, alcançando 32% das despesas rotineiras de curto prazo. Os gastos com energia e manutenção de equipamentos totalizam quase 58,7% dos gastos mensais de um Data Center. 

Diante disso, com um data center corporativo de médio porte com capacidade para até 100 racks (ou cerca de 1.400 servidores) o custo para construir um data center desse porte pode variar de 2 milhões a 5 milhões de dólares. Dependendo dos requisitos específicos e dos padrões de uso da empresa, os custos operacionais de um data center de médio porte podem variar de 200.000 a 500.000 dólares por ano. 

No contexto da sustentabilidade, o controle inadequado da temperatura e umidade nos data centers podem afetar diretamente no consumo excessivo de energia, no desperdício de recursos naturais e dos equipamentos de hardware, gerando, assim, uma demanda pelo aumento da infraestrutura da operação e aumentando a complexidade da operação, gerando uma demanda de energia maior. 

Além disso, em 2021 houve um apagão nos data centers do Facebook, Instagram e WhatsApp, estima-se que o apagão tenha custado algo em torno US$ 60 milhões apenas em perda de receitas para a empresa, e no impacto econômico somente no Brasil é estimado em pelo menos R$ 130 milhões. Nota-se que, esse problema ainda é atual e recorrente e é importante que os data centers continuem rodando os seus sistemas ininterruptamente, pois, isso afeta diretamente a economia, a população e principalmente a empresa dona dos servidores. 

 

**Objetivo** 

Por intermédio de sensores de temperatura e umidade instalados em pontos estratégicos como: os racks de servidores, corredores e outros pontos críticos, pode-se ter um sistema automatizado de monitoramento que ofereça dados em tempo real e exibir esses dados em uma interface gráfica, junto com seu histórico. Esse sistema também pode gerar alertas caso haja desvios de condições ideais de ambiente. Portanto, o sistema pode gerar uma manutenção preventiva e mais eficaz, levando a uma redução de perdas para a empresa, deixando os dados dos usuários seguros e mantendo sua marca e reputação. 

**Justificativa** 

Investir no controle automatizado de temperatura e umidade de data centers é essencial para garantir a segurança operacional e eficiência dos sistemas, além de reduzir custos operacionais e prolongar a vida útil dos equipamentos garantido a marca da empresa por manter os dados seguros. O incêndio no data center da OVHcloud em Estrasburgo, em 2021, causou prejuízos à empresa francesa.
A OVHcloud foi condenada a pagar € 250 mil a duas empresas que perderam dados no incêndio. O incêndio destruiu e danificou quatro grandes centros de dados da OVHcloud. 

**Escopo**

Instalar e configurar os sensores de temperatura e umidade em Arduino no ambiente dos data centers (racks, corredores e componentes eletrônicos); 

Dados do sensor de temperatura são coletados em celsius; 

Dados do sensor de umidade são coletados em umidade relativa do ar (RH) em porcentagem; 

Desenvolver um site institucional; 

Com 3 seções: Perfil, Contato e Produtos; 

Com uma apresentação em interface gráfica; 

Com rolagem Vertical; 

Disponível na versão desktop; 

Compatível com: Chrome, Safari, Firefox e Internet Explorer. 

**Premissas**

A empresa já possuir uma infraestrutura de TI 

A infraestrutura da empresa possui capacidade para gerenciar e interpretar os dados gerados pelos sensores. 

A empresa ter um orçamento suficiente para implementar os sensores, o sistema de monitoramento e a mão-de-obra especializada. 

A empresa possui um sistema de controle de acesso que impeça pessoas não autorizadas a entrar no ambiente do data center. 

A estrutura da empresa não possui infiltração ou rachaduras em seu interior. 

Durante a instalação e manutenção do equipamento, o data center estará em desuso ou menor utilização e os usuários cooperarão com a equipe de instalação, evitando interferências. 

A equipe de instalação terá acesso irrestrito ao ambiente do data center nos períodos de instalação e manutenção. 

As fontes de energia do local são confiáveis, possuem capacidade para manter os novos equipamentos e não possuem instabilidade. 

Toda a aquisição de materiais estará presente e em perfeito uso para a utilização e implementação. 

**Restrições** 

Energia: Para a utilização dos sensores, é necessário que tenha fontes de energia para cada sensor. 

Acessibilidade: Data Centers antigos podem não ter infraestrutura o suficiente para suportar grandes quantidades de sensores. 

Cabeamento: Os cabos e conexões dos sensores devem ser feitos de forma segura e organizada, sem atrapalhar no fluxo de ar ou de funcionamento dos outros equipamentos. 

Custo da manutenção e implantação: Para a instalação e possíveis reparos e manutenções, é necessário mão-de-obra especializada para não gerar outras inconformidades, o que gera custos adicionais. 

Cibersegurança: Os dados coletados pelos sensores podem conter dados sensíveis sobre o ambiente do Data-center, sendo necessário medidas de segurança e controle de acesso. 

Segurança: O ambiente do Data-center deve ser protegido e possuir controle de acesso para evitar danos físicos e sabotagem. 

Conformidade com a Lei: O sistema implantado para coleta e controle dos dados deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD). 

Operacional: Os sensores devem ser devidamente configurados e vinculados ao sistema operacional para capturar os dados corretos e ativar o alarme de perigo apenas quando necessário. 

O custo de implementação deve ser viável para datacenters de pequeno e médio porte. 
