---
layout: post
title: "AWS - Developer Associate Certification"
categories: [aws]
series_order: 1
author:
- Ana Laura Martins
meta: "Springfield"
modified_date: 2025-11-10
---


## AWS - Developer Associate Certification Notes - Treinamento Udemy

Anotações, insigts e mais sobre a certificação Developer Associate AWS.

### AWS IAM - Identity and Access Management

Serviço global que controla quem pode fazer o quê na AWS na sua conta AWS,que possui 4 pílares:

Exemplo: Usuário > funcionários
         Groups > Times
         Roles > Crachás de Acesso

- **Users**: Possuem identidades Individuais com credenciais permanentes;
    - Acesso via Console(CLI) ou Navegador
    - Podem acessar via senha na console ou Access Key para SDK/CLI
    - Podem pertencer a Múltiplos Grupos
    - **A AWS possui um limite de 5000 usuários por conta**

- **Groups**: Coleções de usuários com permissões comuns, que herdam as permissões de acesso. 
    - **A AWS permite 300 grupos por conta**
    - **Cada usuário pode pertencer a 10 grupos no máximo**
    - **Um grupo NÃO pode estar dentro de outro grupo(Aninhamento)**
    - **Grupos não possuem crendenciais próprias**

Exemplos de Grupos: **Developers, DevOps, Admins, ReadOnly**

- **Roles**: As Roles possuem credenciais **TEMPORÁRIAS** utilizadas por um serviço/usuário, a qual expiram automáticamente após o uso 

**Nota: :triangular_flag_on_post: Essa informação cai muito nos exame!!**

**Casos de Usos**

- Instâncias EC2,a qual precisa ler um arquivo armazenado no S3, assumindo uma role.
- Uma função Lambda que precisa gravar no DynamoDB, a qual assume uma role para realizar esta ação.
- Usuário de uma conta AWS, que precisa acessar recursos de uma outra conta(**Cross Account**), via Access Role.
- Usuário externos autenticados via Google ou Microsoft, utilizam o **Identity Federation** via Role. 


|**DICA DE OURO**|
|----|
|**NUNCA ARMAZENE UMA ACCESS KEY** em um código , configuração ou repositório público. Sempre use Roles IAM, para serviços como: AWS EC2, ECS, Lambda|


- **Policies** : **Princípio do Menor Privilégio**

IAM Policies, são documentos JSON que definem permissões, especifica o que uma conta/usuário/identidade pode ou não fazer.


{% highlight ruby %}

}
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "s3:GetObject",
        "Resource": "anr:aws:s3:::my-bucket/*"
      }
    ]
}

{% endhighlight %}

<br>

### Anatomia de uma Policie


| Elemento | Descrição | Exemplo |
|  :---:         |     :---:      |    :---:   |
| **Version**  | Versão da Linguagem    | "2012-10-17"  |
| **Effect**    | Allow ou Deny      | "Allow"    |
| **Action**  | Ações Permitidas/Negadas    | "s3.GetObject"  |
| **Resource**    | ARN dos recursos afetados     | "arn:aws:53:::bucket/"    |
| **Condition**  | Condições Opcionais  | "IpAddress":{...}  |
| **Principal**    | Quem pode aassumir(resource-based) | "Allow": "arn:aws:iam::..|

Existem três tipos de Policies:

- AWS Managed
- Customer Managed
- Inline 

#### Princípio do Menor Privilégio:

**Não Faça**

{% highlight ruby %}

"Action": "*"
"Resource": "*"

Permissão Total
Risco de Segurança

{% endhighlight %}

<br>

**Faça**

{% highlight ruby %}

"Action": ["s3:GetObject",
          "s3:PutObject"]
"Resource": "bucket/prefix/*"

Permissões Especificas
{% endhighlight %}

<br>


|**DICAS DA PROVA - AWS IAM**|
|------|
|1. Comece sem permissões e adicione quando necessário.|
|2. User o **IAM Access Analyzer** para identificar permissões não usadas(remover).|
|3. Revise periodicamente e remova permissões desnecessárias.|


#### Lógica de Avaliação de Policies

**ATENÇÃO: CAI NO EXAME**

| Item | Status | 
|-----|-----|
|Há **Explicity Deny ?**| Se **SIM = DENIED**|
|Há **Allow Explícito?**| Se **SIM = ALLOWED**|
|**Nenhum Match ?**|**= DENIED(Default)**|

> **REGRA DE OURO**: EXPLICITY DENY SEMPREEE vence! Se houver um DENY, nenhum ALLOW pode subscrevê-lo


### AWS CLI (Command Line Interface)

Esta ferramenta gerencia de forma unificada serviços na AWS, suas principais características são:

- Acessa a TODOS os serviços AWS via **Terminal**
- Automatização de tarefas com scripts via (**Powershel/Bash**)
- Saídas em vários formatos (**JSON, Text, Table, YAML e etc**)
- Suporte a profiles de **múltiplas contas/regiões**
- Versões atuais: **AWS CLI v2(recomendada)**

Exemplo:

{% highlight ruby %}

aws s3 ls
aws ec2 describe-instances --region us-east-1

{% endhighlight %}


#### Named Profile - Múltiplas Contas

Gerenciando múltiplas contas/ambientes com profiles diferentes


{% highlight ruby %}

~/.aws/credentials

[default]
aws_access_key_id=AKIA_DEFAULT
aws_secret_access_key=secret1

[dev]
aws_access_key_id=AKIA_DEV
aws_secret_access_key=secret2

[prod]
aws_access_key_id=AKIA_PROD
aws_secret_access_key=secret3

{% endhighlight %}

<BR>

{% highlight ruby %}

Uso dos profiles

#Usar profile específico
aws s3 ls --profile dev

#Definir profile padrão
export AWS_PROFILE=prod

#Verificar identidade atual
aws sts get-caller-identity

{% endhighlight %}


|**DICAS DA PROVA - AWS CLI:**|
|----|
|O sts será muito utilizado para debug|
|**Há uma pasta oculta por padrão chamada .aws/, contém os arquivos:**|
| `~/.aws/credentials`(Access Keys)|
| `~/.aws/config` (região,output format)|
|**Ordem de Precedência(frequência)**|
|CLI option > Env vars > credentials file > IAM Role|
| **Named Profile**|
|`--profile ou AWS_PROFILE` para múltiplas contas|
|aws `sts get-caller-identity` para verificar|
|**LEMBRE-SE**|
|**Onde ficam as credenciais da CLI?**|
|**Resp:** `>~/.aws/credentials`|


### AWS SDKs Programatic Access

### Exercícios Práticos - Criando uma Conta de Desenvolvimento - Portal IAM

**Passo 00**

Na console, localize e acesse o **portal IAM** e localize no menu o **Iam Users**

<img src="{{ '/assets/img/img_100.png' | relative_url }}" alt="img_100" width="500" height="auto" />
<br>
<br>

**Passo 01**

Clique em **Create Users**

<img src="{{ '/assets/img/img_101.png' | relative_url }}" alt="img_101" width="500" height="auto" />
<br>
<br>

**Passo 02**

Defina um nome para o seu usário e a seguir prossiga com a configuração 

<img src="{{ '/assets/img/img_102.png' | relative_url }}" alt="img_102" width="500" height="auto" />
<br>
<br>

**Passo 03**

- Neste caso as **Permissions Options**, utilize a políticas padrões/recomendadas pela AWS. 

-  Defina as permissões que o usuário poderá ter, neste caso optamos pela permissão de apenas de leitura **Read Only**.

<img src="{{ '/assets/img/img_103.png' | relative_url }}" alt="img_103" width="500" height="auto" />
<br>
<br>

**Passo 04**

Revise o cadastro antes de prosseguir com a configuração, a seguir siga com a finalização da criação de um novo usuário. 

<img src="{{ '/assets/img/img_104.png' | relative_url }}" alt="img_104" width="500" height="auto" />
<br>
<br>
  

**Passo 05**

Na página principal do portal IAM, verifique a lista de usuários e identifique a conta criada. 

<img src="{{ '/assets/img/img_105.png' | relative_url }}" alt="img_105" width="500" height="auto" />
<br>
<br>  

**Passo 06**

Para realizamos teste, verifique se você possui o **AWS CLI** na sua máquina utilizando o `aws --version`. 

<img src="{{ '/assets/img/img_106.png' | relative_url }}" alt="img_106" width="500" height="auto" />
<br>
<br>  

**Passo 07**

Após confirmar se você possui o AWS CLI instalado, retorne no seu usuário e acesse o campo **Security Credentials**. 

<img src="{{ '/assets/img/img_107.png' | relative_url }}" alt="img_107" width="500" height="auto" />
<br>
<br>  

**Passo 08**

Para utilizar o AWS CLI com segurança, será necessário criar uma **Access Key**/**Secret Key**, conforme a imagem abaixo:

<img src="{{ '/assets/img/img_108.png' | relative_url }}" alt="img_108" width="500" height="auto" />
<br>
<br>  


**Passo 09**

Ao cadastrar uma nova Secret Key para acessar o AWS CLI, opte por **Command Line Interface - CLI**. 

<img src="{{ '/assets/img/img_109.png' | relative_url }}" alt="img_109" width="500" height="auto" />
<br>
<br>  

**Passo 10**

É indicado criar tags em caso de execução em **ambientes produtivos**. 

<img src="{{ '/assets/img/img_110.png' | relative_url }}" alt="img_110" width="500" height="auto" />
<br>
<br> 


**Passo 11**

Ao criar uma nova Secret, **salve as informações em um local seguro e em caso de testes**, evite "chumbar" as informações, caso você salve a sua aplicação em um repositório. Neste caso o ideal é criar um arquivo `.gitignore` para proteger suas informações. 

<img src="{{ '/assets/img/img_111.png' | relative_url }}" alt="img_111" width="500" height="auto" />
<br>
<br> 


Para testarmos as Secrets no AWS CLI, realize a sequência abaixo:

- No terminal acesse: `aws configure --profile dev-cli`
- Insira as informações criadas na console

<img src="{{ '/assets/img/img_112.png' | relative_url }}" alt="img_112" width="500" height="auto" />
<br>
<br> 

- Defina a região `us-east-1`
- Defina o formato do ***output*, neste caso utilizamos `JSON`

<img src="{{ '/assets/img/img_113.png' | relative_url }}" alt="img_113" width="500" height="auto" />
<br>
<br> 

- Como teste, vamos criar um **Bucket S3** criados na conta AWS. Porém lembre-se **nosso usuário só possui acesso Read Only**.

`aws s3 ls --profile dev-cli`

`aws mb s3://teste-criar-bucket-12345 --profile dev-cli`

<img src="{{ '/assets/img/img_114.png' | relative_url }}" alt="img_114" width="500" height="auto" />
<br>
<br> 

### Teste prático: 

Foi realizado um teste prático configurando o AWS CLI e testando chamadas com SDK: <a href="https://start.spring.io/" target="_blank">Spring Initializr</a>


### AWS Lambda - Anatomia da Função Lambda

Componentes de uma Função Lambda:

A Lambda possui **5 funções**:

- **Handler**
- **Runtime**
- **Layers** 
- **Config**

- Handler:Ponto de Entrada do código
- Runtime do Ambiente: Ambiente de Execução (Python. Node.js, Java, etc)
- Deployment Package: Código + Dependência (Zip ou Container)
- Configuração: Memória , timeout, variáveis de ambiente
- Excecution Role: Permissões IAM da função



#### O Handler - Ponto de Entrada

O Handler é a função que o Lambda chama quando invocada.

***formato: arquivo.funcao (exemplo: index.handler, main.lambda_handler)*

**Python (lambda_function.py)**

{% highlight ruby %}

def lambda_handler(event, context):
  #event: dados de entrada
  #context: info do runtime

name - event.get('name', 'World')  
return {
    'statusCode': 200,
    ' body': f'Hello {name}!'
}
{% endhighlight %}

<br>

**Node.js (index.js)**

{% highlight ruby %}

exports.handler = async (event) => {
  // event: dados de entrada

  const name = event.name || 'World';
  body: `Hello ${name}!`
  };
};
{% endhighlight %}

<br>



|**DICAS DA PROVA**|
|----|
|**Lambda Padrão**:`lambda_function.lambda_handler(Python)` ou `index.handler(Node.js)`|


##### Event e Context Objects

**Event Object**

Dados de Entrada de Invocação:

Conteúdo varia por fonte
- API Gateway: headers, body, path
- S3: bucket, key,evento
- SQS: Records com mensagens
- Formato JSON

**Context Object**

Info do Ambiente de execução:

Propriedades úteis:
- `function_name`
- `memory_limit_in_mb`
- `aws_request_id`
- `get_remaining_time_in_millis()`



|**DICAS DA PROVA**|
|----|
|Use `context.get_remaining_time_in_millis()` para evitar timeout|


**Runtimes Disponíveis:**

Python| Node.js|Java|.NET|Go|Ruby|Custom Runtime(bootstrap)


#### Ciclo de Vida da Execução

| **INIT** | **INVOKE** | **SHUTDOWN** |
|  :---:         |     :---:      |    :---:   |
| - Download do Código  | Executa Handler    | Ociosidade |
| - Inicializa Runtime  | Processa Evento    | Destroy env|
| - Executa Código Fora do handler(global) |   | **Após ~15 minutos sem uso**|
| - **COLD START** | **WARM START(reuso)**  | |

**Cold Star vs Warm Start**

- **Cold Start:** Primeira Invocação - Inclui as fases INIT( mais lenta)

- **Warm Start:** Invocações Subsequentes - Reusa Ambientes (mais rápido)


|**DICAS DA PROVA**|
|----|
|Mantenha **Conexões DB** fora do Handler para reutilização|
|**Código fora do Handler (no escopo global) executa apenas o INIT**|
|**Inicialização fora do Handler = executa 1x no cold start**|


## Criando minha primeira função Lambda

**Serverless = Sem gerenciamento de Servidores**

Você foca no código e a AWS foca na infraestrutura:

- Provisionamento automático de recursos
- Escalabilidade Automática (0 a Milhões de Instâncias)
- Alta disponibilidade integrada
- Pagamento apenas pelo uso ( Pay-per-Use)
- Patches e manutenção gerenciado


#### Visão Geral do Lambda

O **AWS Lambda** é o serviço de  computação **Serverless** da AWS.

***Sempre que foi perguntado sobre execução de código sem servidores, lembre-se do AWS Lambda***

- **Execute o código sem gerenciar ou provisionar servidores**
- Suporta múltiplas linguagens ( Python, Java, Node.js, Go, .Net, Ruby e etc)
- **Executa códigos em resposta a eventos ( Event Driven Architecture)**
- Escala automaticamente com a Demanda
- **Paga por número de requests + Duração da Execução**


> Event Source(S3, API,SQS...) -----> AWS Lambda(Seu Código) -----> Destination (DynamoDB,S3)


#### Casos de Uso Comum

**Apis Serverless**

APIs Gateway + Lambda + DynamoDB

- REST API sem servidores 
- Escala automática por aquisição
- Custo zero quando ocioso


**Processamento de Dados**

S3 Event --> AWS Lamdba --> Processamento

- Redimensionar Imagens
- Processar Arquivos CSV/JSON
- ETL em tempo real ( Conforme demanda)


|**Boas Práticas**|
|----|
|Mantenha funções focadas e pequenas|
|Use variáveis de ambiente para configurações|
|Habilite o X-Ray para tracing distribuído|
|Configure timeout e memória adequados ao workload|

<BR>

#### Limites e Cótas - IMPORTANTE CAI MUITO NA PROVA

|**Recurso**|**Limite** |**Observação** | 
|----|---- |----|
|**Timeout Máximo** | **15 minutos (900s)** |**CAI MUITO NA PROVA**|
|**Memória** |**128 MB - 10.240 MB** |**CPU Proporciona a memória** |
|**Package Size(zip)**|**50 MB zipped** |**250MB unzipped** |**User layers para Libs grandes**|
|Storage/tmp|512 MB - 10.240 MB | Efêmero não persistente |
|Concurrent Executions| 1000 (Defaut - Gratuitos/mês - Free Tier)| Pode solicitar Aumento ( Pago a parte) |


> Lambda e Stateless cada invocação é realizada independemente
> Storage/tml não persiste entre invocações diferente


### Componentes da função Lambda

Uma função lambda é composta por:

 > **Função Lambda: Handler --> Runtime --> Deployment Package --> Configuração --> Exceution Role

|****|**** |
|----|---- |
|**Handler** | Ponto de Entrada do Código ( Função que processa o Evento)
|**Runtime** |Ambiente de Excecução (Python, Node.js,Java e etc)|
|**Deployment Package**|Código + Dependências (Zip ou Container)|
|**Configuração**|Memória,TimeOut,Variáveis de Ambiente|
|**Execution Role**|Permissões IAM da função |


### Aprofundando em Event e Context Object

#### Handler: Ponto de Entrada

O Handler é a **função** que o Lambda chama quando invocado.

**Exemplo de formato de arquivos**: `arquivo.funcao`(`ìndex.handler`, `main.lambda_handler`)

**Python `lambda.function.py`**

```

def lambda_handler(event, context): # recebe dois parâmetros

# event: dados de entrada
# context: info de  runtime

name = event.get ('name', 'World')
return {
  'statusCode': 200,
  'body': f'Hello {name}!'
}

```
<br>


**Node.js `index.js`**

```

exports.handler = async (event) =>{

    // event: dados de entrada

    const name = event.name || 'World';
    return {
    statusCode: 200,
    body: 'Hello ${name}!'
    },
},    

```

<br>


> Handler Padrão: lambda_function.lambda_handler(Pyhton) ou index.handler(Node.js)


#### Explicando os: Events Context e o Event Object

**Event Object**

Dados de entrada da invocação

Conteúdo varia por fonte:
- API Gateway: headers, body, path
- S3:Bucket, key, evento
- SQS:Records com mensagens
- Formato Json 


**Context Object**

Info do ambiente de execução

Propriedade úteis:
- `function_name`
- `memory_limit_in_mb`
- `aws_request_id`
- `get_remaining_time_in_millis()`


<br>

|**DICAS DA PROVA**||
|----|---|
|**Use:**|`get_remaining_time_in_millis()` **para evitar timeout**| 
|**Runtimes Disponíveis:** | Python, .NET,Java, Go, Ruby, Custom Runtime (bootstrap)


#### Explicando o Ciclo de Vida da Execução Lambda

> INIT --> INVOKE --> SHUTDOWN

**INIT** 

Ocorre apenas na primweira invocação

- Download do Código
- Inicializa Runtime
- Executa Código Fora do Handler (Escopo Global)
- **Cold Start**

**INVOKE** 

- Executa Handler
- Processa Evento
- Retoma resposta
- **Warm Start(Reuso)**

**Shutdown** 

- Ociosidade
- Destoy ENV
- **~ 15 minutos sem uso o ambiente é destruído**

#### Diferença entre Cold Start & Warm Start


|||
|----|---|
|**Cold Start:**|Ocorre apenas na primeira invocação - Inclui a fase **INIT**(main lenta)| 
|**Warm Start(quente)** |Invocações Subsequentes - **Reuso de ambientes** (mais rápido - Economiza Tempo e Dinheiro)|


|**DICAS DA PROVA**| |
|----|----|
|**DICA 1**|**Mantenha conexões Banco de Dados(DB) FORA do Handler para utilização**|
|**DICA 2**|**Código fora do Handler (no escopo global) executa apenas 1x o INIT**|


## Configurações de Memória

> A memória é o principal fator de  de performance do Lambda. Pois ao aumentar a memória você melhora a performance do seu processamento, economizando dinheiro durante o processo. 


- Range mínimo de **128 MB** até **10.240 MB (10GB)**
- Incrementos de **1MB**
- o **CPU é proporcional à memória alocada**
- O **Network bandwidth aumenta com a memória**

| Memória | vCPU Equivalente | Uso Típico|
|-----|-----| ----
|128 MB| ~0.08 vCPU|Utilizadodo em funções simples|
|512 MB| ~0.33 vCPU|Utilizado em APIs leves|
|1.769 MB|**1 vCPU completa** |Utilizado em processamentos médios|
|3.008+ MB|2+ vCPUs|Utilizado ML, vídeos e CPU intensivo|

**Nota**: vCPU é uma unidade de processamento virtual, usada em ambientes de Cloud e em ambientes virtuais.

|**NOTAS**| |
|----|----|
|**CPU Física**|**processador real do hardware.**|
|**vCPU**|**fatia lógica do processador, disponibilizada para uma máquina virtual, container ou serviço de nuvem.**|


#### Configurações de TIMEOUT

> Timeout: Tempo máximo de execução da função   


- **Mínimo**: **1 segundo** 
- **Máximo**: **900 segundos == 15 minutos*
- **Default**: 3 segundos
- **Se exceder**: **Task timed out after X seconds*

|**Boas Práticas**|
|----|
|**APIs:10 - 30 segundos**|
|**Processamento: ajuste ao workload**|
|**Use:** `context.get_remaining_time()`|
|**Sempre menor que o necessário**|

|**ATENÇÃO !!**|
|----|
|**Timeout NÃO mata execução limpa**|
|**Conexões DB(Bando de Dados) podem ficar abertas**|
|**Billing continua até no TIMEOUT(continua cobrando billing)**|
|**Precisa de mais 15 minutos use o Step Function**|


|**CAI NA PROVA**|
|----|
|**Se precisar de mais 15 minutos, use**  `Step Functions` ou `EC2/Fargate`|

<br>

#### Variáveis de Ambiente


> São configurações dinâmicas sem alterar o código

- Use para: URLs de APIs, connections strings, feature flags
- Limite|: 4 KB total ( todas as varáveis combinadas)
- Podem ser criptografadas com KMS
- São acessíveis via `process.env`(Node) ou os.environ(Python)


**Python** (Captura durante a execução)

```
import os
db_host = os.environ ['DB_HOST']
api_key = os.environ.get('API_KEY)

```
<br>


**Node.js**

```

const dbHost = process.env.DB_HOST;
const apiKey = process.env.API_KEY;

//Fallback com default

const.env = process.env.ENV || 'dev' 

```
<br>

**Variáveis Reservadas (automáticas, já existente no ambiente):**

`AWS_REGION`| `AWS_LABDA_FUNCTION_NAME`| `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`



#### Outras configurações Importantes

| Configuração | Descrição | **Dica para a Prova**|
|-----|-----| ----
|**Ephemeral Storage (/tmp)**| 512 MB - 10.240 MB|**NÃO PERSISTE ENTRE INVOCAÇÕES(PODEM PERGUNTAR COMO PEGADINHA)**|
|**Execution Role**| IAM Role da função |**Aplica o princípio de menor privilégio**|
|**VPC Config**|Conecta a recursos em VPC |Adiciona **Latência no Cold Start**|
|**Concurrency**|Limite de execuções simultâneas| **Reserved x Provisioned**|
|**Tracing(X-Ray)**|`Active` ou `PassThrough`| **Active = Lambda envia traces**|

|**NOTAS**| |
|----|----|
|**Trace/Tracing**|**É o registro do caminho de execução de uma operação em um sistema distribuído:** Mostra onde a requisição começou,quais serviços ela passou, quanto tempo cada etapa levou e onde aconteceram erros ou atrasos|
||Um exemplo simples seria um usuário realizando uma compra ou uma request passando por uma API Gateway, Lambda, banco de dados ou serviço|
||O tracing é útil,pois ajuda a encontrar gargálos, facilita na depuração de erros e mostra onde a aplicação está lenta ou falhando|
|**KMS**|O **AWS KEY(KMS) é usado para gerenciar, criar e controlar chaves de criptografia**|
||Criptografa dados na AWS, protege Secrets, arquivos de banco de dados, controla quem pode usar as chaves e realiza rotações de chaves se necessário|

|**DICAS DA PROVA**||
|----|---|
|**Memória:**| **- 128 mb - 10.240 MB** / **CPU é proporcional (1.769 MB == 1 GB)**|  
|**Timeout:** |**Máximo: 15 minutos(900s)** / **Se exceder 15 minutos utilize Step Functions**|
|**Variáveis de Ambiente:** |**Limite Total de 4KB**/ **Criptografia utilizando KMS(AWS KEY) / `process.env`(Node.js) e `os.environ`(Python)|


## Ajustando as configurações de uma Lambda


> Testando a capacidade da Lambda combinando memória, mas tempo de execução

Script inserido na Lambda

```
def lambda_handler(event, context):
    inicio = time.time()

    # Ler configurações via variáveis de ambiente
    app_env = os.environ.get("APP_ENV", "dev")
    db_host = os.environ.get("DB_HOST", "localhost")
    feature_flag = os.environ.get("FEATURE_NOVA", "false").lower() == "true"

    # Simular carga CPU proporcional ao parâmetro do evento
    workload = event.get("workload", "light")

    if workload == "heavy":
        result = sum(math.sqrt(i) for i in range(1_000_000))
        print(f"Cálculo pesado concluído: {result:.2f}")
    elif workload == "medium":
        result = sum(math.sqrt(i) for i in range(100_000))
        print(f"Cálculo médio concluído: {result:.2f}")
    else:
        result = sum(i for i in range(1_000))
        print(f"Cálculo leve concluído: {result}")

    duracao_ms = (time.time() - inicio) * 1000

    print(f"Ambiente: {app_env}")
    print(f"DB Host: {db_host}")
    print(f"Feature Nova Ativa: {feature_flag}")
    print(f"Duração interna: {duracao_ms:.2f}ms")
    print(f"Memória configurada: {context.memory_limit_in_mb}MB")
    print(f"Tempo restante: {context.get_remaining_time_in_millis()}ms")

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "env": app_env,
                "db_host": db_host,
                "feature_flag": feature_flag,
                "workload": workload,
                "duration_ms": round(duracao_ms, 2),
                "memory_mb": context.memory_limit_in_mb,
            }
        ),
    }


```

#### Exemplo de Configuração e teste de performance da Lambda


**Passo 00**

Na console, localize e acesse a sessão de **Lambda**. Como no passo anterior, crie uma nova Lambda.

<img src="{{ '/assets/img/img_115.png' | relative_url }}" alt="img_115" width="500" height="auto" />
<br>
<br>

<img src="{{ '/assets/img/img_116.gif' | relative_url }}" alt="img_116" width="500" height="auto" />
<br>
<br>

**Passo 02**
 
 Na sessão de Code, você insere e realiza o deploy da função lambda que será testada

<img src="{{ '/assets/img/img_117.png' | relative_url }}" alt="img_117" width="500" height="auto" />
<br>
<br>

<img src="{{ '/assets/img/img_118.png' | relative_url }}" alt="img_118" width="500" height="auto" />
<br>
<br>


**Passo 03**
 
 Na sessão de Configuration, acesse a sessão de variável de ambiente

<img src="{{ '/assets/img/img_120.png' | relative_url }}" alt="img_120" width="500" height="auto" />
<br>
<br>


**Passo 04**
 
 Na sessão a seguir iremos criar um teste para verificar a performance 

<img src="{{ '/assets/img/img_121.png' | relative_url }}" alt="img_121" width="500" height="auto" />
<br>
<br>

**Passo 05**
 
 Na sessão a seguir iremos criar um teste para verificar a performance 

<img src="{{ '/assets/img/img_122.gif' | relative_url }}" alt="img_122" width="500" height="auto" />
<br>
<br>

**Passo 06**
 
 Acesse o **Cloudwatch** para visualizar os **eventos de logs** para acompanhamento da performance

<img src="{{ '/assets/img/img_123.png' | relative_url }}" alt="img_123" width="500" height="auto" />
<br>
<br>



























