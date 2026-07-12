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

Serviço global que controle quem pode fazer o quê na AWS na sua conta AWS,o qual possui 4 pílares:

Exemplo: Usuário > funcionários
         Groups > Times
         Roles > Crachás de Acesso

- **Users**: Possuem identidades Individuais com credenciais permanentes;
    - Acesso via Console(CLI) ou Navegador
    - Podem acessar via senha na console ou Access Key para SDK/CLI
    - Podem pertencer a Múltiplos Grupos
    - **A AWS possue um limite de 5000 usuários por conta**

- **Groups**: Coleções de usuários com permissões comum, que herdam as permissões de acesso. 
    - **A AWS permite 300 grupos por conta**
    - **Cada usuário pode pertencer a 10 grupos no máximo**
    - **Um grupo NÃO pode estar dentro de outro grupo(Aninhamento)**
    - **Grupos não possuem crendenciais próprias**

Exemplos de Grupos: **Developers, DevOps, Admins, ReadOnly**

- **Roles**: As Roles possuem credenciais **TEMPORÁRIAS** utilizadas por um serviço/usuário, a qual expira automáticamente após o uso 

**Nota: :triangular_flag_on_post: Essa informação cai muito nos exame!!**

**Casos de Usos**

- Instâncias EC2,a qual precisa ler um arquivo armazenado no S3, assumindo uma role.
- Uma função Lambda que precisa gravar no DynamoDB, a qual assume uma role para realizar esta ação.
- Usuário de uma conta AWS, que precisa acessar recursos de uma outra conta(**Cross Account**), via Access Role.
- Usuário externos autenticados via Google ou Microsoft, utilizam o **Identity Federation** via Role. 

|----|
|**DICA DE OURO**|
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

|------|
|**DICAS DA PROVA - AWS IAM**|
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
- Saídas em vários formatod (**JSON, Text, Table, YAML e etc**)
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


|----|
|**DICAS DA PROVA - AWS CLI:**|
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

<img src="{{ '/assets/img/img_100.png' | relative_url }}" alt="img_100" width="500" height="auto" />/>
<br>
<br>

**Passo 01**

Clique em **Create Users**

<img src="{{ '/assets/img/img_101.png' | relative_url }}" alt="img_101" width="500" height="auto" />/>
<br>
<br>

**Passo 02**

Defina um nome para o seu usário e a seguir prossiga com a configuração 

<img src="{{ '/assets/img/img_102.png' | relative_url }}" alt="img_102" width="500" height="auto" />/>
<br>
<br>

**Passo 03**

- Neste caso as **Permissions Options**, utilize a políticas padrões/recomendadas pela AWS. 

-  Defina as permissões que o usuário poderá ter, neste caso optamos pela permissão de apenas de leitura **Read Only**.

<img src="{{ '/assets/img/img_103.png' | relative_url }}" alt="img_103" width="500" height="auto" />/>
<br>
<br>

**Passo 04**

Revise o cadastro antes de prosseguir com a configuração, a seguir siga com a finalização da criação de um novo usuário. 

<img src="{{ '/assets/img/img_104.png' | relative_url }}" alt="img_104" width="500" height="auto" />/>
<br>
<br>
  

**Passo 05**

Na página principal do portal IAM, verifique a lista de usuários e identifique a conta criada. 

<img src="{{ '/assets/img/img_105.png' | relative_url }}" alt="img_105" width="500" height="auto" />/>
<br>
<br>  

**Passo 06**

Para realizamos teste, verifique se você possui o **AWS CLI** na sua máquina utilizando o `aws --version`. 

<img src="{{ '/assets/img/img_106.png' | relative_url }}" alt="img_106" width="500" height="auto" />/>
<br>
<br>  

**Passo 07**

Após confirmar se você possui o AWS CLI instalado, retorne no seu usuário e acesse o campo **Security Credentials**. 

<img src="{{ '/assets/img/img_107.png' | relative_url }}" alt="img_107" width="500" height="auto" />/>
<br>
<br>  

**Passo 08**

Para utilizar o AWS CLI com segurança, será necessário criar uma **Access Key**/**Secret Key**, conforme a imagem abaixo:

<img src="{{ '/assets/img/img_108.png' | relative_url }}" alt="img_108" width="500" height="auto" />/>
<br>
<br>  


**Passo 09**

Ao cadastrar uma nova Secret Key para acessar o AWS CLI, opte por **Command Line Interface - CLI**. 

<img src="{{ '/assets/img/img_109.png' | relative_url }}" alt="img_109" width="500" height="auto" />/>
<br>
<br>  

**Passo 10**

É indicado criar tags em caso de execução em **ambientes produtivos**. 

<img src="{{ '/assets/img/img_110.png' | relative_url }}" alt="img_110" width="500" height="auto" />/>
<br>
<br> 


**Passo 11**

Ao criar uma nova Secret, **salve as informações em um local seguro e em caso de testes**, evite "chumbar" as informações, caso você salve a sua aplicação em um repositório. Neste caso o ideal é criar um arquivo `.gitignore` para proteger suas informações. 

<img src="{{ '/assets/img/img_111.png' | relative_url }}" alt="img_111" width="500" height="auto" />/>
<br>
<br> 


Para testarmos as Secrets no AWS CLI, realize a sequência abaixo:

- No terminal acesse: `aws configure --profile dev-cli`
- Ensira as informações criadas na console

<img src="{{ '/assets/img/img_112.png' | relative_url }}" alt="img_112" width="500" height="auto" />/>
<br>
<br> 

- Defina a região `us-east-1`
- Defina o formato do ***output*, neste caso utilizamos `JSON`

<img src="{{ '/assets/img/img_113.png' | relative_url }}" alt="img_113" width="500" height="auto" />/>
<br>
<br> 

- Como teste, vamos criar um **Bucket S3** criados na conta AWS. Porém lembre-se **nosso usuário só possui acesso Read Only**.

`aws s3 ls --profile dev-cli`

`aws mb s3://teste-criar-bucket-12345 --profile dev-cli`

<img src="{{ '/assets/img/img_114.png' | relative_url }}" alt="img_114" width="500" height="auto" />/>
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


|----|
|**DICAS DA PROVA**|
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


|----|
|**DICAS DA PROVA**|
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

**Cold Starr vs Warm Start**

- **Cold Start:** Primeira Invocação - Inclui as fases INIT( mais lenta)

- **Warm Start:** Invocações Subsequentes - Reusa Ambientes (mais rápido)

|----|
|**DICAS DA PROVA**|
|Mantenha **Conexões DB** fora do Handler para reutilização|
|**Código fora do Handler (no escopo global) executa apenas o INIT**|
|**Inicialização fora do Handler = executa 1x no cold start**|


#### Criando minha primeira função Lambda

Passo 00

Na console da AWS localize o microsserviço Lambda


Passo 01

Lembre-se o **Lambda é event-driver, ou seja, só executa quando algo acontece**.














