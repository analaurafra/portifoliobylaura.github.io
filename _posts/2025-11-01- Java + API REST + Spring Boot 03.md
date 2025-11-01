---
layout: post
---

##  Projeto: MedCenter - Spring Boot 3 + Java + API REST 

O **Med Center** é uma ferramenta de **CRM (Customer Relationship Management)**, o qual tem como principal a gestão de cadastrado de profissionais da área da saúde, especificamente médicos. 

### Utilizando o Spring Boot 3 + Java + API REST 

#### Especificações da Estrutura do Projeto

- Java - Nesta ocasião estamos utilizando o Java `17`;
- SDK - `21`;
- Módules - SDK `21`;
- Language Level - Java `21`;
- Spring Boot `3`.

Para verificar no Itellij : File -> Project Structure 

<img src="{{ '/assets/img/img_03.png' | relative_url }}" alt="img_03"/>

<br>
<br>

## Criando um Novo Projeto:

Para criar um novo projeto acesse o site: <a href="https://start.spring.io/" target="_blank">Spring Initializr</a>

Neste projeto iremos utilizar:

- Projetc : Maven;
- Language : Java;
- Spring Boot : `3.5.7` (Neste caso estamos utilizando esta versão);
- Java : `17`;
- Package - `jar`.

<img src="{{ '/assets/img/img_01.png' | relative_url }}" alt="img_01"/>
<br>
<br>

## Criando meu Repo no Github:

- RepoName: <a href="https://github.com/analaurafra/med_voll_api" target="_blank">med_voll_api</a>
- Workflow: <a href="https://github.com/analaurafra/med_voll_api/blob/main/.github/workflows/ci-cd.yml" target="_blank">ci-cd - YML</a>

**Nota**: Neste caso realizei a configuração de um arquivo yml para acompanhar na esteira a evolução do projeto.
Inicialmente as sessões de testes unitários foram comentadas.
Foi incluindo esse tipo de arquivo para abranger as rotinas de CI e CI.

<img src="{{ '/assets/img/img_02.png' | relative_url }}" alt="img_02"/>
<br>
<br>

## Scrum:

Foi criado um projeto através das ferramentas de Github Projetos em formato de <a href="https://github.com/users/analaurafra/projects/1/views/1" target="_blank">Kanban Board</a>, onde as **Issues** são evoluídas, conforme evolução
do projeto.

<img src="{{ '/assets/img/img_05.png' | relative_url }}" alt="img_05"/>
<br>
<br>


## Configurações de Build - Maven

Após incluir um projeto novo ou obtê-lo através de um projeto já existente, é necessário atualizar as dependências do Maven

Acesse ao Maven e realizei o **clean** e o **install** para baixar todas as dependências necessárias. Verifique as configurações em sua IDE acessando:`View -> Tool Windows -> Maven`

O Maven também poderá ser instalado via Plugin em sua IDE, acesse as configurações de sua IDE e busque por: `Plugins -> Marketplace -> Maven`

<img src="{{ '/assets/img/img_04.png' | relative_url }}" alt="img_04"/>
<br>
<br>

## Testando a API:

Neste caso utilizaremos o **Insomnia**, mas temos como opção o **Postman**.

Para realizar essa configuração siga o passo a passo:

### Passo 01
Para iniciarmos a utilização do Insomnia, baixe o software através do site: [Insomnia](https://insomnia.rest/download)

Após a instalação, abra o software e crie um novo projeto, clicando em "Create" e selecionando "New Request".

<img src="{{ '/assets/img/img_06_01.png' | relative_url }}" alt="img_06_01"/>
<br>
<br>


### Passo 02
No menu lateral esquerdo identifique a opção `Colletions`, criei um nome para sua colletion, neste caso nomearemos como **Requisições**, pois será neste collection que testaremos o **CRUD** do nosso sistema.

<img src="{{ '/assets/img/img_06_02.png' | relative_url }}" alt="img_06_02"/>
<br>

<img src="{{ '/assets/img/img_06_03.png' | relative_url }}" alt="img_06_03"/>
<br>

<img src="{{ '/assets/img/img_06_04.png' | relative_url }}" alt="img_06_04"/>
<br>

<img src="{{ '/assets/img/img_06_05.png' | relative_url }}" alt="img_06_05"/>
<br>
<br>
Após nomear a Collection Requisição, selecione o método HTTP desejado **(GET, POST, PUT, DELETE, etc.)** e insira a URL da API que você deseja testar.

<img src="{{ '/assets/img/img_06_06.png' | relative_url }}" alt="img_06_06"/>
<br>

<img src="{{ '/assets/img/img_06_07.png' | relative_url }}" alt="img_06_07"/>
<br>


Iniciaremos com o **Método POST**, o qual irá **enviar** os dados para a API.

<img src="{{ '/assets/img/img_06_08.png' | relative_url }}" alt="img_06_08"/>
<br>
<br>

Antes de enviar a requisição é necessário informar o corpo da requisição. Quais dados serão enviados para a API.
Neste caso utilizaremos o formato **JSON**. 

Utilize o exemplo abaixo no prompt de corpo da requisição:


{% highlight ruby %}

{
"nome": "Ana Laura Martins",
"email": "analaura_fra@vmed.center.com",
"crm": "123456",
"especialidade": "ortopedia",
"endereco": {
    "logradouro": "rua 1",
    "bairro": "bairro",
    "cep": "12345678",
    "cidade": "Brasilia",
    "uf": "DF",
    "numero": "1",
    "complemento": "complemento"
    }
}

{% endhighlight %}


Na imagem abaixo temos o exemplo do corpo da requisição preenchida e enviada, porém temos como resultado um erro, já previsível, pois estamos realizando uma requisição para o endereço <a href="http://localhost:8080/medicos" target="_blank">http://localhost:8080/medicos</a>, porém ainda não foi criado nenhum `controller` na nossa aplicação, que atenda a essa requisição.

<img src="{{ '/assets/img/img_06_09.png' | relative_url }}" alt="img_06_09"/>
<br>
<br>

## Classe Controller - Criando o Endpoint

A classe `controller` é responsável por receber e mapear as requisições HTTP, processá-las e retornar as respostas apropriadas. Ela atua como uma ponte entre o cliente (por exemplo, um navegador web ou aplicativo móvel) e a lógica de negócios da aplicação.

### Classe Controler : MedicoController.java

Para testar à requisições e identificar se os dados foram enviados corretamente, foi criado uma **Classe Controller** `MedicoController.java`.

<img src="{{ '/assets/img/img_06_12.png' | relative_url }}" alt="img_06_12"/>
<br>
<br>

Abaixo segue o código da classe criada para teste prévio:

```
package med.voll.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("medicos") //irá chamar apenas o caminho /medicos

public class MedicoController {

    //Criando metodo cadastro e postmapping para atender à solicitação POST

    @PostMapping
    public void cadastrar(String json) {
        System.out.println(json);
    }
}

```

A seguir vá até ao Insomnia e envie novamente a **requisição POST** para o endpoint [http://localhost:8080/medicos](http://localhost:8080/medicos).

<img src="{{ '/assets/img/img_06_10.png' | relative_url }}" alt="img_06_10"/>
<br>
<br>  

Para verificar se houve alguma resposta, verifique o console do Spring Boot, onde você verá os dados enviados sendo impressos.

<img src="{{ '/assets/img/img_06_11.png' | relative_url }}" alt="img_06_11"/><br>
<br>

Para garantir que a nossa requisição está sendo enviada corretamente, é necessário incluir `@RequestBody`(corpo) no parâmetro do método `cadastrar`, para que o Spring Boot saiba que deve mapear o corpo da requisição para o parâmetro do método.

{% highlight ruby %}

    @PostMapping
    public void cadastrar(@RequestBody String json) {
        System.out.println(json);
    }

{% endhighlight %}

Execute novamente a aplicação e envie a requisição pelo Insomnia e a seguir verifique no prompt do Spring Boot se os dados foram impressos corretamente:

<img src="{{ '/assets/img/img_06_13.png' | relative_url }}" alt="img_06_13"/><br>
<br>

Em um outro exemplo, podemos testar o spring requisitando ao invés do bloco todo, apenas um dos itens. Utilizando o **cep** individualmente, testamos a requisição do mesmo no Insomnia e o retorno do mesmo.


<img src="{{ '/assets/img/img_07.png' | relative_url }}" alt="img_07"/><br>
<br>

**ATENÇÃO:** Porém ao realizar a requisição novamente, ainda será retornado na tela o bloco do `json` com todas as informações, pois quando a requisição utiliza uma `string` a mesma entende tudo como String trzendo o bloco completo(imagem anterior). 

**Para trazer os campos individualmente é necessário criar uma classe separada para cada e especificá-la posteriormente.** 


### Criando Campos Individuais - Padrão DTO (Data Transfer Object)

#### Classe - DadosCadastroMedico

Na classe `MedicoController` substitua o `string` do método cadastrar, criando uma nova classe, `DadosCadastroMedico`, e o parâmetro `dados`. 

#### Cadastrando Record - Especialidades

Para cadastrar essa nova classe, foi utilizado uma recurso,o qual deixa o código mais limpo e menos verboso. 

O sistema sugere o recurso `record`para correção

Obs: O `record` também é **imutável por padrão**, o que significa que os campos não podem ser alterados após a criação do objeto


<img src="{{ '/assets/img/img_08_01.png' | relative_url }}" alt="img_08_01"/><br>
<br>

Altere o nome do novo **pacote** para `medicos`, pois tudo referente a médicos, será criado no mesmo. 

<img src="{{ '/assets/img/img_08_02.png' | relative_url }}" alt="img_08_02"/><br>
<br>

#### Cadastrando Enun - Especialidades

Na classe **DadoscadatrosMedicos**, será necessário gerar um novo `enum` para `especialidade`, utilize o mesmo recurso de correção e opte por **criar enum**. Cadastre o enum no pacote `medicos`.

<img src="{{ '/assets/img/img_08_03.png' | relative_url }}" alt="img_08_03"/><br>
<br>

Os itens de cadastros para esta aplicação serão cadastrados conforme issue <a href="https://github.com/analaurafra/med_voll_api/issues/6" target="_blank">Cadastro de Médicos</a> no Github.

<img src="{{ '/assets/img/img_09.png' | relative_url }}" alt="img_09"/><br>
<br>

#### Cadastrando Record - DadosEndereco

A seguir iremos retornar à classe **DadoscadatrosMedicos** e inderir um novo item `DadosEndereco`, sendo necessário criar um novo `record` e um novo pacote `endereco` para este item, para abranger todos os elementos que compõem um endereço completo. 

<img src="{{ '/assets/img/img_10.png' | relative_url }}" alt="img_10"/><br>
<br>

O `record` `DadosEndereco` devem possuir todos os campos:

<img src="{{ '/assets/img/img_11.png' | relative_url }}" alt="img_11"/><br>
<br>


Ao retornar na classe `MedicoController`, substitua o **parâmetro** `String json` para o `record` `DadosCadastroMedico`. Execute a aplicação e realize uma nova requisição ao Insomnia. 

<img src="{{ '/assets/img/img_12.png' | relative_url }}" alt="img_11"/><br>
<br>

Iniciamente foi gerado um **Erro 400**, pois os valores informados no `enum` foram cadastrados em maiúsculo, sendo necessário adequar o arquivo json. 


<img src="{{ '/assets/img/img_13.png' | relative_url }}" alt="img_12"/><br>
<br>

Após adequações, ao realizar uma nova requisição identificamos o sucesso no retorno da requisição via Insomnia e também no Intelij.

<img src="{{ '/assets/img/img_14.png' | relative_url }}" alt="img_13"/><br>
<br>

<img src="{{ '/assets/img/img_15.png' | relative_url }}" alt="img_14"/><br>
<br>

**Obs:** Os itens (complemento e número) são opcionais. Se eu apagar um item do json, mas ainda mantê-lo cadastrado no meu record, não serão gerados erros, mas estes itens retornarão como null.

No exemplo abaixo, retirei os itens: Complemento e Número do código `json`.

<img src="{{ '/assets/img/img_16.png' | relative_url }}" alt="img_14"/><br>
<br>

Ao executar a aplicação, identificamos os itens em `null`.

<img src="{{ '/assets/img/img_16_01.png' | relative_url }}" alt="img_14"/><br>
<br>

Como estamos utilizando o `record`, o sistema imprime as informações neste formato.

```
NOMEDORECORD[ITEM=DADODOINTEM, ITEM02=DADOITEM02]

```

#### Classe Controller - PacientesController.java

Para realizar o cadastro de Pacientes, realizamos os passos anteriores, porém, alguns contaram com algumas adequações:

<img src="{{ '/assets/img/img_17.png' | relative_url }}" alt="img_17"/><br>
<br>

- Criação da Classe Java Record `DadosCadastroPaciente.java`. A informações para cadastros de pacientes, está disponível na issue <a href="https://github.com/analaurafra/med_voll_api/issues/6" target="_blank">Cadastro de Pacientes</a> no Github.


<img src="{{ '/assets/img/img_17_01.png' | relative_url }}" alt="img_17_01"/><br>
<br>

- Criação de arquivo Json com dados de cadastro de paciente e testes de requisições

<img src="{{ '/assets/img/img_17_02.png' | relative_url }}" alt="img_17_02"/><br>
<br>


{% highlight ruby %}

{
	"nome": "Ana Laura Martins",
	"email": "analaura_fra@gmail.com",
	"telefone": "123456",
	"cpf":"12345678999",
	"endereco": {
		"logradouro": "rua 2",
		"bairro": "bairro",
		"cep": "12345678",
		"cidade": "São Paulo",
		"uf": "SP",
		"numero": "1",
		"complemento": "complemento"
	}
}

{% endhighlight %}

**Dica**: Fique atento a classe Cadastro de Pacientes deve indicar a tela <a href="http://localhost:8080/pacientes" target="_blank">http://localhost:8080/pacientes</a>. 

- Execução da aplicação local:

<img src="{{ '/assets/img/img_17_03.png' | relative_url }}" alt="img_17_03"/><br>
<br>