---
layout: post
title: "Java + API Rest + Spring Boot 3"
categories: [java]
series_order: 1
author:
- Ana Laura
meta: "Springfield"
modified_date: 2025-11-21
---

##  Projeto: MedCenter 

O **Med Center** é uma ferramenta de **CRM (Customer Relationship Management)**a qual tem como principal objetivo a gestão de cadastro de profissionais da área da saúde, especificamente médicos.

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

**Nota**: Neste caso, realizei a configuração de um arquivo yml para acompanhar na esteira a evolução do projeto.
Inicialmente, as sessões de testes unitários foram comentadas.
Foi incluído esse tipo de arquivo para abranger as rotinas de CI e CI.

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

Após incluir um projeto novo ou obtê-lo via um projeto já existente, é necessário atualizar as dependências do Maven

Acesse ao Maven e realizei o **clean** e o **install** para baixar todas as dependências necessárias. Verifique as configurações em sua IDE acessando:`View -> Tool Windows -> Maven`

O Maven também poderá ser instalado via Plugin em sua IDE, acesse as configurações de sua IDE e busque por: `Plugins -> Marketplace -> Maven`

<img src="{{ '/assets/img/img_04.png' | relative_url }}" alt="img_04"/>
<br>
<br>

## Testando a API:

Neste caso, utilizaremos o **Insomnia**, mas temos como opção o **Postman**.

Para realizar essa configuração, siga o passo a passo:

### Passo 01
Para iniciarmos a utilização do Insomnia, baixe o software através do site: [Insomnia](https://insomnia.rest/download)

Após a instalação, abra o software e crie um novo projeto, clicando em "Create" e selecionando "New Request".

<img src="{{ '/assets/img/img_06_01.png' | relative_url }}" alt="img_06_01"/>
<br>
<br>


### Passo 02
No menu lateral esquerdo, identifique a opção `Colletions`, crie um nome para sua colletion, neste caso nomearemos como **Requisições**, pois será nesta collection que testaremos o **CRUD** do nosso sistema.

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

### Classe Controller : MedicoController.java

Para testar as requisições e identificar se os dados foram enviados corretamente, foi criada uma **Classe Controller** `MedicoController.java`.

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

A seguir, vá até o Insomnia e envie novamente a **requisição POST** para o endpoint [http://localhost:8080/medicos](http://localhost:8080/medicos).

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

Execute novamente a aplicação e envie a requisição pelo Insomnia e, a seguir, verifique no prompt do Spring Boot se os dados foram impressos corretamente:

<img src="{{ '/assets/img/img_06_13.png' | relative_url }}" alt="img_06_13"/><br>
<br>

Em um outro exemplo, podemos testar o spring requisitando, ao invés do bloco todo, apenas um dos itens. Utilizando o **cep** individualmente, testamos a requisição do mesmo no Insomnia e o retorno do mesmo.


<img src="{{ '/assets/img/img_07.png' | relative_url }}" alt="img_07"/><br>
<br>

**ATENÇÃO:** Porém, ao realizar a requisição novamente, ainda será retornado na tela o bloco do `json` com todas as informações, pois quando a requisição utiliza uma `string` a mesma entende tudo como String trazendo o bloco completo (imagem anterior). 

**Para trazer os campos individualmente, é necessário criar uma classe separada para cada um e especificá-la posteriormente.** 


### Criando Campos Individuais - Padrão DTO (Data Transfer Object)

#### Classe - DadosCadastroMedico

Na classe `MedicoController` substitua o `string` do método cadastrar, criando uma nova classe, `DadosCadastroMedico`, e o parâmetro `dados`. 

#### Cadastrando Record - Especialidades

Para cadastrar essa nova classe, foi utilizado uma recurso, o qual deixa o código mais limpo e menos verboso. 

O sistema sugere o recurso `record` para correção.

Obs: O `record` também é **imutável por padrão**, o que significa que os campos não podem ser alterados após a criação do objeto


<img src="{{ '/assets/img/img_08_01.png' | relative_url }}" alt="img_08_01"/><br>
<br>

Altere o nome do novo **pacote** para `medicos`, pois tudo referente a médicos será criado no mesmo. 

<img src="{{ '/assets/img/img_08_02.png' | relative_url }}" alt="img_08_02"/><br>
<br>

#### Cadastrando Enun - Especialidades

Na classe **DadoscadatrosMedicos** será necessária para gerar um novo `enum` para `especialidade`, utilize o mesmo recurso de correção e opte por **criar enum**. Cadastre o enum no pacote `medicos`.

<img src="{{ '/assets/img/img_08_03.png' | relative_url }}" alt="img_08_03"/><br>
<br>

Os itens de cadastro para esta aplicação serão cadastrados conforme a issue <a href="https://github.com/analaurafra/med_voll_api/issues/6" target="_blank">Cadastro de Médicos</a> no Github.

<img src="{{ '/assets/img/img_09.png' | relative_url }}" alt="img_09"/><br>
<br>

#### Cadastrando Record - DadosEndereco

A seguir, retornaremos à classe **DadoscadatrosMedicos** e inserir um novo item `DadosEndereco`, sendo necessário criar um novo `record` e um novo pacote `endereco` para este item, para abranger todos os elementos que compõem um endereço completo. 

<img src="{{ '/assets/img/img_10.png' | relative_url }}" alt="img_10"/><br>
<br>

O `record` `DadosEndereco` devem possuir todos os campos:

<img src="{{ '/assets/img/img_11.png' | relative_url }}" alt="img_11"/><br>
<br>


Ao retornar na classe `MedicoController`, substitua o **parâmetro** `String json` para o `record` `DadosCadastroMedico`. Execute a aplicação e realize uma nova requisição ao Insomnia. 

<img src="{{ '/assets/img/img_12.png' | relative_url }}" alt="img_11"/><br>
<br>

Inicialmente foi gerado um **Erro 400**, pois os valores informados no `enum` foram cadastrados em maiúsculo, sendo necessário adequar o arquivo json. 


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

Para realizar o cadastro de pacientes, realizamos os passos anteriores, porém, alguns contaram com algumas adequações:

<img src="{{ '/assets/img/img_17.png' | relative_url }}" alt="img_17"/><br>
<br>

- Criação da Classe Java Record `DadosCadastroPaciente.java`. As informações para cadastros de pacientes estão disponíveis na issue <a href="https://github.com/analaurafra/med_voll_api/issues/6" target="_blank">Cadastro de Pacientes</a> no Github.


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

**Dica**: Fique atento à classe Cadastro de Pacientes, deve indicar a tela <a href="http://localhost:8080/pacientes" target="_blank">http://localhost:8080/pacientes</a>. 

- Execução da aplicação local:

<img src="{{ '/assets/img/img_17_03.png' | relative_url }}" alt="img_17_03"/><br>
<br>

## Banco de Dados - Validação e Persistência

Nesta aplicação, iremos utilizar o Banco de Dados **MySql**. 
Baixe o mesmo seguindo a documentação : <a href="https://www.alura.com.br/artigos/mysql-instalacao-configuracao" target="_blank"> Instalação - MySQL</a>


**Importante**: Antes de seguir, é indicado realizar o registro do Mysql nas **Variáveis de Ambiente** da sua máquina: `C:\Program Files\MySQL\MySQL Server 8.0\bin`. Localize o caminho conforme a instalação realizada na sua máquina.


<img src="{{ '/assets/img/img_20.png' | relative_url }}" alt="img_20"/><br>
<br>


Para habilitar a aplicação para a realização da Validação e Persistência, será necessário incluir novas dependências (módulo de banco de dados, spring data etc) no arquivo `pom.xml`.


Para encontrar as dependências, vá novamente ao site <a href="https://start.spring.io/" target="_blank">Spring Initializr</a> 

> ADD DEPENDENCES --> ADICIONAR DEPENDÊNCIAS --> EXPLORE DEPENDENCIES --> COPIE AS DEPENDÊNCIAS

Nesta ocasição foram adicionas as dependências adicionais abaixo:

- `Validation` - I/O
- `Spring Data JPA` - SQL
- `MySQL Driver` - SQL
- `Flyway Migration SQL` - SQL


{% highlight ruby %}

 <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-core</artifactId>
    </dependency>
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-mysql</artifactId>
    </dependency>
    <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-j</artifactId>
      <scope>runtime</scope>
    </dependency>
<dependency>

{% endhighlight %}


Após adicionar as dependências, realize um **reload** no Maven.  


## Configurando o Application.Properties

Ao atualizar o Maven, serão gerados alguns **erros**, os quais solicitam informações do banco de dados. Para realizar essas configurações, temos que acessar o arquivo e preencher os parâmetros referentes à (**aplicação,login e senha**): 

>src --> application.properties 

{% highlight ruby %}

spring.datasource.url=jdbc:mysql://localhost/meudatabase 
spring.datasource.username=meu_usuario
spring.datasource.password=minha_senha

{% endhighlight %}

<img src="{{ '/assets/img/img_18.png' | relative_url }}" alt="img_18"/><br>
<br>

Ao instalar o MySql, você deve ter definido o **login e a senha**. Também será necessário criar um **novo database**.

### Criando um Banco de Dados

É possível criar um banco de dados utilizando uma IDE, como o MySql WorkBanch, mas neste caso utilizaremos a linha de comando em um prompt. 

No terminal do projeto ou em um no PowerShell / Git, digite o comando abaixo:

```
mysql -u root -p

```

Ou, caso ocorram erros, digite o comando da pasta bin:

**Obs:** Utilizei como terminal o **Git**, pois os demais estavam gerando erros. 

```
'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p

enter password: MINHASENHADOSQL

create database (NOMEDOSEUDATABASE)

```

<img src="{{ '/assets/img/img_19.png' | relative_url }}" alt="img_19"/><br>
<br>

Confira se a aplicação está rodando realizando corretamente a execução do mesmo:

<img src="{{ '/assets/img/img_21.png' | relative_url }}" alt="img_21"/><br>
<br>

### Entidade JPA

O **Spring DataJPA** utiliza a **JPA** como ferramenta de mapeamento objeto-relacional.
Será necessário criar uma entidade JPA para representar uma tabela no Banco de Dados que será a classe de domínio para utilização da persistência.   

**Passo 01:**

Vá no src >> main >> java >> medicos. Clique no pacote `medico`, utilize o atalho **ALT + INSERT**, escolha a opção **new java class**, nomeie como `Medico.java`

<img src="{{ '/assets/img/img_30.png' | relative_url }}" alt="img_30"/><br>
<br>

A classe será criada, onde a mesma terá os atributos que representam o Médico.

**Obs:** <font color="red"> Os atributos serão os mesmos criados no record dos passos anteriores, porém o DTO é diferente de JPA, mas conterão as mesmas informações. </font>

<img src="{{ '/assets/img/img_31.png' | relative_url }}" alt="img_31"/><br>
<br>

Insira os atributos e informações, porém será necessário criar uma nova classe `Endereco.java`. 
<img src="{{ '/assets/img/img_32.png' | relative_url }}" alt="img_32"/><br>
<br>

A mesma terá as mesmas informações do `record` relacionado a endereço.

<img src="{{ '/assets/img/img_33.png' | relative_url }}" alt="img_33"/><br>
<br>

Passo 02: 

Retorne para a entidade `Medico.java`, onde será necessário inserir as informações da **JPA**.

Selecione o método e o substitua pelo código a seguir.
<img src="{{ '/assets/img/img_34.png' | relative_url }}" alt="img_34"/><br>
<br>

{% highlight ruby %}

import jakarta.persistence.*; // por enquanto mantive disponível para todos
import med.voll.api.endereco.Endereco;

@Table(name = "medicos")
@Entity(name = "Medico")
public class Medico {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String crm;

    @Enumerated(EnumType.STRING)
    private Especialidade especialidade;

    @Embedded  // utilizei embeddable attributes da jpa o qual irá considerar que os campos fazem parte da mesma tabela de médicos
    private Endereco endereco;
    
}

{% endhighlight %}

<br>

<img src="{{ '/assets/img/img_35.png' | relative_url }}" alt="img_35"/><br>
<br>

Vá até a classe `endereco` e em cima da classe, ensira a anotação `@Embeddable`.

<img src="{{ '/assets/img/img_36.png' | relative_url }}" alt="img_36"/><br>
<br>



{% highlight ruby %}

import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {


}
{% endhighlight %}

<br>

Após inserir o JPA, é necessário incluir mais informações como os ***Guetters, Setters,equals, construtors, hashcodes, to string***. Em uma aplicação Java que <font color="red">não utiliza o Spring Boot</font>, essas informações seriam inseridas manualmente. 

Porém, um dos recursos do Spring é a utilização da biblioteca **Lombok**, a qual irá gerar códigos automáticos em tempo de compilação.

**Obs:** Para evitar erros, instale o **Plugin da biblioteca Lombok** na sua IDE e também verifique se você **incluiu a dependência** do mesmo no arquivo `pom.xml`. 

Passo 03:

Retorne na classe `Medico.java` e ensira as notações do Lombok:

<img src="{{ '/assets/img/img_36.png' | relative_url }}" alt="img_36"/><br>
<br>


{% highlight ruby %}

import jakarta.persistence.*; // por enquanto mantive disponível para todos
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.endereco.Endereco;


@Table(name = "medicos")
@Entity(name = "Medico")
@Getter
@NoArgsConstructor //gerar o construtor default sem argumentos
@AllArgsConstructor //construtor que recebe todos os campos
@EqualsAndHashCode(of ="id") //irá gerar em cima do id e não em cima de todos os atributos.
public class Medico {

}

{% endhighlight %}

O mesmo deverá ocorrer na classe `Endereco.java`

<img src="{{ '/assets/img/img_38.png' | relative_url }}" alt="img_38"/><br>
<br>


{% highlight ruby %}

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {

}

{% endhighlight %}

Após este passo, as nossas duas entidades `Medico.java` e `Endereco.java` estarão mapeadas para utilização da JPA. 
Para salvar, por exemplo, a entidade `Medico.java` em um banco de dados, no geral utilizamos as classes **DAO (Data Access Object)**, porém no **Spring Data JPA**, o Spring Boot em geral não costuma utilizar as classes DAO. 

Onde o **Spring Data JPA** criou um mecanismo para gerenciamento destes dados de **persistência** utilizando interfaces. 


PERSISTÊNCIA - DAO (Data Access Object)

O **padrão de projeto DAO**, conhecido também por Data Access Object, é utilizado para persistência de dados, onde seu principal objetivo é **separar regras de negócio de regras de acesso a banco de dados**. 

Nas classes que seguem esse padrão, **isolamos todos os códigos que lidam com conexões, comandos SQLs e funções diretas ao banco de dados, para que assim tais códigos não se espalhem por outros pontos da aplicação**, algo que dificultaria a manutenção do código e também a troca das tecnologias e do mecanismo de persistência.

Exemplo de uma **classe padrão dao**

```
public class ProdutoDao {

    private final EntityManager entityManager;

    public ProdutoDao(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    public void create(Produto produto) {
        entityManager.persist(produto);
    }

    public Produto read(Long id) {
        return entityManager.find(Produto.class, id);
    }

    public void update(Produto produto) {
        entityManager.merge(produto);
    }

    public void remove(Produto produto) {
        entityManager.remove(produto);
   }

}

```

REPOSITORY

O **Spring Boot** trabalha com **Repository** que substitui o uso das classes DAO. Que são interfaces já disponibilizadas pelo Spring Boot. 

Passo 01:

Crie uma nova interface, no pacote `medico` clicando em cima do pacote e inserindo os comandos ALT + INSERT, escolha a interface e nomeie como `MedicoRepository`.

**Obs.:** Por padrão, adicionamos o sufixo repository para identificar o tipo da interface. 

Para inserir o Spring Data será necessário inserir um comando extends e os generics informando o tipo da entidade (`Medico`) e tipo de atributo da chave primária (`Long`). 


<img src="{{ '/assets/img/img_39.png' | relative_url }}" alt="img_39"/><br>
<br>


```

package med.voll.api.medico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository <Medico, Long> 


```

O próximo passo é utilizar o Repository no nosso controller `Medico.Controller.java`. 

Iremos inicialmente excluir o System Out do método cadastrar e mandar o repository persistir o médico no banco de dados.

Portanto, eu preciso da classe da interface repository, atribuindo-a mesma na classe controller. Quem irá instanciar o método repository será o Spring Data. Onde teremos que inserir a notação `@Autowired` que irá instanciar e passar os repository dentro da nossa classe controller. 


<img src="{{ '/assets/img/img_40.png' | relative_url }}" alt="img_40"/><br>
<br>


{% highlight ruby %}


    @Autowired
     private MedicoRepository repository;


{% endhighlight %}

O próximo passo será ir até o método `cadastrar` e inserir o `repository`, o qual herda do JPA Repository, que possui um método chamado `save` que irá salvar, realizando um insert na tabela do banco de dados. 

Porém, eu preciso passar um objeto do tipo `médico`. Mas até o momento eu apenas possuo as informações do meu DTO representado pelo record `DadosCadastroMedicos`, sendo necessário realizar a conversão destas informações. 

Eu poderia passar os parâmetros um a um, porém é possível criar um construtor na classe médico. 

<img src="{{ '/assets/img/img_41.png' | relative_url }}" alt="img_41"/><br>
<br>

{% highlight ruby %}

  public void cadastrar(@RequestBody DadosCadastroMedico dados) { //metodo cadastrar irá receber um json
    repository.save(new Medico(dados));

}

{% endhighlight %}


Na classe `Medico.java`, inserimos os constructor e seus parâmetros.

<img src="{{ '/assets/img/img_43.png' | relative_url }}" alt="img_43"/><br>
<br>

{% highlight ruby %}

  public Medico(DadosCadastroMedico dados) {
    this.nome = dados.nome();
    this.email = dados.email();
    this.crm = dados.crm();
    this.especialidade = dados.especialidade();
    this.endereco = new Endereco(dados.endereco()); //será necessário criar um construtor p/ endereço
  }


{% endhighlight %}

Porém também será necessário criar um constructor para classe `Endereco.java`

<img src="{{ '/assets/img/img_44.png' | relative_url }}" alt="img_44"/><br>
<br>

{% highlight ruby %}

    public Endereco(DadosEndereco dados) {
        this.logradouro = dados.logradouro();
        this.bairro = dados.bairro();
        this.cep = dados.cep();
        this.uf = dados.uf();
        this.cidade = dados.cidade();
        this.numero = dados.numero();
        this.complemento = dados.complemento();
    }

{% endhighlight %}    


Execute o projeto dando um **Run** no `ApiApplication` e a seguir iremos testar via **Insomnia** realizando as requisições:

A princípio, pode ser que seja gerados um erro, informando que a tabela médicos não existe. E de fato a mesma ainda não foi criada, pois criamos apenas um database no meu MySQL. 

<img src="{{ '/assets/img/img_45.png' | relative_url }}" alt="img_45"/><br>
<br>



CRIANDO A TABELA

Uma das opções para criar a tabela seria acessar o meu MySQL, acessar o meu banco de dados e criar uma tabela médicos. 
Porém, como boa prática, vamos utilizar um outro método que controle a evolução (versionamento) deste banco de dados para fins de rastreabilidade. 

Utilizaremos uma ferramenta de Migrations, onde anteriormente adicionamos a dependência Flyway. O qual é uma biblioteca externa que realiza controle de migrações com o banco de dados. Portanto, utilizaremos o Flyway para criação de tabelas no Spring Boot. 

Obs: Confira em seu arquivo `pom.xml` se as dependências do mesmo se encontram no seu arquivo.

Para salvar os dados, teremos que criar um novo diretório dentro da pasta `resources` que se encontra na árvore do projeto

Selecione a pasta **resources** e dê o comando ALT + INSERT, escolha a opção **Directory** a seguir, nomeie como `db/migration`

<img src="{{ '/assets/img/img_46.png' | relative_url }}" alt="img_46"/><br>
<br>

<font color ="red">IMPORTANTE: Todas às vezes que você for mexer com Migrations, é necessário "Stoppar" o Projeto. Pois estamos utilizando o método devtools </font>

A seguir, dentro do diretório db >> migrations, dê novamente o comando ALT + INSERT e opte pela opção FILE. Nomeie o arquivo como: `V1__create-table-medicos.sql`

<font color ="red">Obs: Por padrão, o Flyway possui uma nomenclatura que deve ser utilizada desta forma:</font>

| Nome | Descrição|
|----|----|
|V1| Número da Versão do Arquivo|
|__ | Underline Duplo |
|nome-do-meu-arquivo| Nome do arquivo da sua escolha|
|.sql| Extensão da tabela|

<img src="{{ '/assets/img/img_47.png' | relative_url }}" alt="img_47"/><br>
<br>

Será gerado o arquivo `V1__create-table-medicos.sql` vazio, a seguir insira o comando SQL:

{% highlight ruby %}

create table medicos(

    id bigint not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    crm varchar(6) not null unique,
    especialidade varchar(100) not null,
    logradouro varchar(100) not null,
    bairro varchar(100) not null,
    cep varchar(9) not null,
    complemento varchar(100),
    numero varchar(20),
    uf char(2) not null,
    cidade varchar(100) not null,

    primary key(id)

);

{% endhighlight %}    


<img src="{{ '/assets/img/img_48.png' | relative_url }}" alt="img_48"/><br>
<br>

A seguir, execute novamente a aplicação e verifique o log, caso sejam gerados erros, os mesmos podem ser gerados solicitando adequações das dependências no arquivo `pom.xml`. Também é interessante rodar os comandos **maven clean e install** e dar um **update** no projeto. Lembrando que isso só deve ser feito quando tiver finalizado os migrations. 

A seguir veremos um log com a mensagem informando que 1 migration foi realizada com sucesso. 

<img src="{{ '/assets/img/img_49.png' | relative_url }}" alt="img_49"/><br>
<br>

Será necessário inserir no nosso controller a notação **@Transactional** do tipo Spring.

```
import org.springframework.transaction.annotation.Transactional;

@PostMapping //mapeando o metodo post
     @Transactional
        public void cadastrar(@RequestBody DadosCadastroMedico dados) { //metodo cadastrar irá receber um json
        repository.save(new Medico(dados)); // os constructor criados puxarão as infos do json

     }

```

TESTANDO O BANCO DE DADOS

No terminal, vamos abrir o nosso banco de dados sql:

```
mysql -u root -p
Enter password: **********

```

Será solicitada a senha de acesso do banco de dados, a qual foi criada nos passos anteriores


<img src="{{ '/assets/img/img_50.png' | relative_url }}" alt="img_50"/><br>
<br>

A seguir, insira o comando para aparecer a tabela. 
Obs: A tabela ***flyway_schema_history*** é uma tabela do flyway, não deve ser modificada!

```
mysql> use nomedomeubancodedados
Database changed  
mysql> show tables;

+------------------------+
| Tables_in_med_voll_api |
+------------------------+
| flyway_schema_history  |
| medicos                |
+------------------------+
2 rows in set (0.01 sec)

```

<img src="{{ '/assets/img/img_51.png' | relative_url }}" alt="img_51"/><br>
<br>

 Para abrir a tabela `medicos` insira o comando abaixo e visualize as informações:

```
mysql> desc medicos;

```

<img src="{{ '/assets/img/img_52.png' | relative_url }}" alt="img_52"/><br>
<br>

SALVANDO OS DADOS NA TABELA 

Para testar se conseguiremos salvar os nossos dados na tabela, realize uma nova requisição via Insomnia:

Para testar se as informações foram enviadas do Insomnia para a Tabela, rode o comando:

```
select * from medicos;

```

<img src="{{ '/assets/img/img_53.png' | relative_url }}" alt="img_53"/><br>
<br>

<font color ="blue">Realizei um novo teste inserindo informações novas no meu arquivo Json do Insomnia, pois quando você tenta consultar, será gerado um erro informando a duplicidade de informações.</font>

<br>

<font color ="red">Também precisei realizar algumas adequações nas dependências do Flyway, "chumbando" meu login e senha do banco de dados.</font>

<img src="{{ '/assets/img/img_55.png' | relative_url }}" alt="img_55"/><br>
<br>



{% highlight ruby %}

{
  "nome": "Ana Laura",
  "email": "ana.laura.novo@vmed.center.com",
  "crm": "654321",
  "especialidade": "GINECOLOGIA",
  "endereco": {
    "logradouro": "Rua das Flores",
    "bairro": "Centro",
    "cep": "12345678",
    "cidade": "São Paulo",
    "uf": "SP",
    "numero": "100",
    "complemento": "apto 200"
  }
}

{% endhighlight %}

Na imagem, é possível observar uma nova linha com novos dados, repita os passos anteriores para consultar a nova linha:

<img src="{{ '/assets/img/img_54.png' | relative_url }}" alt="img_54"/><br>
<br>


VALIDAÇÕES DOS CAMPOS OBRIGATÓRIOS

É muito importante realizar as validações das informações que estão chegando na API.
Para isso, anteriormente instalamos a dependência do **módulo de validation**, o qual será integrado ao **Bean Validation**.

Mediante **anotações**, o Bean Validation irá verificar cada um dos campos. 

Exemplo: Record `DadosCadastroMedico.java`, pois neste arquivo constam os campos que estão chegando na requisição.

-  Para facilitar a visualização, após o parêntese separe os campos;
-  Realize as anotações conforme o tipo do campo:

{% highlight ruby %}

package med.voll.api.medico;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import med.voll.api.endereco.DadosEndereco;

public record DadosCadastroMedico(

        @NotBlank    //O nome é obrigatório e não pode ser nulo e nem vazio
        String nome,

        @NotBlank
        @Email      // verifique se o e-mail contem todos os campos obrigatórios do e-email
        String email,

        @NotBlank
        @Pattern(regexp = "\\d{4,6}") //o crm precisa ter obrigatoriamente os dígitos (inspeção regular)
        String crm,

        @NotNull  // A especialidade é um Enum e não pode ser nula.
        Especialidade especialidade,

        @NotNull
        @Valid
        DadosEndereco endereco) { // Dados endereço é um outro dto, sendo necessário validá-lo através do @Valid

}


{% endhighlight %}    


<img src="{{ '/assets/img/img_56.png' | relative_url }}" alt="img_56"/><br>
<br>


- Realize o mesmo para o Record `DadosEndereco.java`:

{% highlight ruby %}

package med.voll.api.endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosEndereco(

        @NotBlank  //O nome é obrigatório e não pode ser nulo e nem vazio
        String logradouro,

        @NotBlank
        String bairro,

        @NotBlank
        @Pattern(regexp = "\\d{8}") //o crm precisa ter obrigatoriamente os dígitos (inspeção regular)
        String cep,

        @NotBlank
        String cidade,

        @NotBlank
        String uf,

        String complemento,

        String numero) {

}

{% endhighlight %}



<img src="{{ '/assets/img/img_57.png' | relative_url }}" alt="img_57"/><br>
<br>


- No controller `MedicoController.java` preciso incluir o `@Valid`, para solicitar que o Spring se integre com o Bean Validation. 


{% highlight ruby %}

@PostMapping //mapeando o metodo post
@Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroMedico dados) { //metodo cadastrar irá receber um json
    repository.save(new Medico(dados)); // os constructor criados puxarão as infos do json

 }

{% endhighlight %}


<img src="{{ '/assets/img/img_58.png' | relative_url }}" alt="img_58"/><br>
<br>

- Para testar, vá até o Insomnia e altere os dados do arquivo Json, conforme cada especificação de cada campo:

Exemplo: Deixei o campo do Nome Vazio, é gerada uma informação com o campo @NotBlank e que o mesmo não pode ser vazio.

<img src="{{ '/assets/img/img_59.png' | relative_url }}" alt="img_59"/><br>
<br>

CRIANDO UMA NOVA MIGRATION

Quero inserir um novo campo `telefone` no meu cadastro
Para isso, precisarei atualizar o meu arquivo migrations, para isso, siga os passos a seguir:

- No controller DadosCadastroMedicos insira o novo atributo logo após o campo e-mail

```
@NotBlank
String telefone,

```
<img src="{{ '/assets/img/img_62.png' | relative_url }}" alt="img_62"/><br>



- A seguir vá para a classe `Medico.java` para atualizar a JPA e o ***Constructor***:

```
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String crm;

    @Enumerated(EnumType.STRING)
    private Especialidade especialidade;

    @Embedded  // utilizei embeddable attributes da jpa o qual irá considerar que os campos fazem parte da mesma tabela de médicos
    private Endereco endereco;

    public Medico(DadosCadastroMedico dados) {
        this.nome = dados.nome();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.crm = dados.crm();
        this.especialidade = dados.especialidade();
        this.endereco = new Endereco(dados.endereco()); //será necessário criar um construtor p/ endereço
    }


```

<img src="{{ '/assets/img/img_61.png' | relative_url }}" alt="img_61"/><br>
<br>


- Agora é necessário atuar no banco de dados por meio da migration. Como a migration V1 já foi executada, então gere uma nova versão. Interrompa o projeto antes de criar a nova migration:


- Crie a versão V2, alterando o nome e adequando as informações do código SQL. Neste caso nomeamos como 

`V2__alter-table-add-column-telefone.sql`.


<img src="{{ '/assets/img/img_63.png' | relative_url }}" alt="img_63"/><br>
<br>

```
alter table medicos add telefone varchar(20) not null;

```
<img src="{{ '/assets/img/img_60.png' | relative_url }}" alt="img_60"/><br>
<br>


- Para conferir se a migration foi executada com sucesso, execute o programa e confira no log:

<img src="{{ '/assets/img/img_64.png' | relative_url }}" alt="img_64"/><br>
<br>

- Inclua o campo telefone no arquivo **JSON** e altere alguns campos para evitar erros, teste e verifique se a requisição **foi bem sucedida retornou código 200** indicando que a requisição foi bem sucedida.

<img src="{{ '/assets/img/img_65.png' | relative_url }}" alt="img_65"/><br>
<br>

### Replicando o Data JPA Para Pacientes


- Criando a nova classe `Paciente.java`:

<img src="{{ '/assets/img/img_66.png' | relative_url }}" alt="img_66"/><br>
<br>


{% highlight ruby %}

package med.voll.api.pacientes;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.endereco.Endereco;

@Table(name = "Pacientes")
@Entity(name = "Paciente")
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of ="id")
public class Paciente {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;7
    private String cpf;
    private String email;
    private String telefone;

    @Embedded
    private Endereco endereco;

    public Paciente(DadosCadastroPaciente dados) {
        this.nome = dados.nome();
        this.cpf = dados.cpf();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.endereco = new Endereco(dados.endereco());

    }
}

{% endhighlight %} 

- Neste caso, utilizamos as mesmas informações da classe `Endereco.java` já pré-configurada para médicos, pois os campos serão os mesmos, sendo **diferenciado pelo id de médicos e pacientes**.


- A seguir, faça as adequações na classe `PacienteController.java`:

<img src="{{ '/assets/img/img_67.png' | relative_url }}" alt="img_67"/><br>
<br>


{% highlight ruby %}

package med.voll.api.controller;


import med.voll.api.pacientes.DadosCadastroPaciente;
import med.voll.api.pacientes.Paciente;
import med.voll.api.pacientes.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pacientes")

public class PacientesController {

    @Autowired
    private PacienteRepository repository;

    @PostMapping
    @Transactional
    public void cadastrar(@RequestBody DadosCadastroPaciente dados) {
    repository.save(new Paciente(dados));

        // System.out.println( "Dados Recebidos: " +dados);
    }

}

{% endhighlight %} 


- Também será necessário criar o Repository para a classe Pacientes, onde às nomeamos de `PacienteRepository.java`:

<img src="{{ '/assets/img/img_68.png' | relative_url }}" alt="img_68"/><br>
<br>

{% highlight ruby %}

package med.voll.api.pacientes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository <Paciente, Long> {

}

{% endhighlight %}

- A classe `DadosCadastroPaciente.java` também foi configurada e adaptada para atender as necessidades dos campos e para cobertura de testes. 

<img src="{{ '/assets/img/img_69.png' | relative_url }}" alt="img_69"/><br>
<br>


{% highlight ruby %}

package med.voll.api.pacientes;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import med.voll.api.endereco.DadosEndereco;

public record DadosCadastroPaciente(

        @NotBlank
        String nome,

        @NotBlank
        String telefone,

        @NotBlank
        @Pattern(regexp = "\\d{3}\\.?\\d{3}\\.?\\d{3}\\-?\\d{2}") String cpf,

        @NotBlank
        @Email
        String email,

        @NotBlank
        @NotNull
        DadosEndereco endereco) {

}

{% endhighlight %}

- Para compor o banco de dados, incluímos uma query em SQL com os campos referentes ao cadastro de pacientes através das **migrations**. Lembrando que neste passo é necessário **Stopar** o projeto para evitar erros:

**Obs:** Inicialmente criei uma V1 nova e alterei o título do arquivo, porém houve um erro indicando duplicidade de versões.
Portando, é necessário sempre criar novas versões antes de executar a migration. A mesma foi nomeada como `V3__create-table-pacientes.sql`

<img src="{{ '/assets/img/img_70.png' | relative_url }}" alt="img_70"/><br>
<br>

{% highlight ruby %}

create table pacientes(
    id bigint not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    cpf varchar(14) not null unique,
    telefone varchar(20) not null,
    logradouro varchar(100) not null,
    bairro varchar(100) not null,
    cep varchar(9) not null,
    complemento varchar(100),
    numero varchar(20),
    uf char(2) not null,
    cidade varchar(100) not null,

    primary key(id)
);

{% endhighlight %}


- Para testar se realmente foi criada a tabela no banco de dados foram utilizados os comandos padrões para acesso.
Podemos verificar a inclusão da tabela `pacientes` no banco de dados.

<img src="{{ '/assets/img/img_71.png' | relative_url }}" alt="img_71"/><br>
<br>


- Também verificar a estrutura da mesma:

<img src="{{ '/assets/img/img_72.png' | relative_url }}" alt="img_72"/><br>
<br>


- A imagem a seguir exemplifica os dados cadastrados na tabela através das requisições cadastradas via **Insomnia**. Lembrando que, para um novo cadastro, é necessário mudar algumas informações do cadastro para evitar erros de duplicidade.

<img src="{{ '/assets/img/img_73.png' | relative_url }}" alt="img_73"/><br>
<br>


LISTAGEM - Médicos (Get)

O próximo passo será realizar a listagem das informações referente ao cadastro de médicos. 
Para isso, teremos que incluir no nosso Controller `MedicoController.java` o métodos **Listar**:


<img src="{{ '/assets/img/img_74.png' | relative_url }}" alt="img_74"/><br>
<br>

```

// Metodo Listar
     @GetMapping
         public List <Medico> listar() {
         return repository.findAll(); // a entidade JpaRepository já possui todos os métodos cadastrados em a necessidade de repetí-los na `MedicoRepository`

         }


```

Até o momento o nosso ***repository*** não irá utilizar o ***save*** assim como ocorre no cadastro, será utilizado o ***findAll***. O ***findAll*** irá listar e encontrar todas as informações. Também não utilizaremos o `public void` sendo substituido por `public List` para criar a lista. 

Utilizaremos a mesma entidade `JpaRepository` que se encontra atualmente no repository `MedicoRepository.java`, pois esta entidade também engloba todos os métodos como (POST, GET e etc)

<img src="{{ '/assets/img/img_75.png' | relative_url }}" alt="img_75"/><br>
<br>

Nesta lista devem ser devolvidos: Nome, email,CRM e especialidade, o endereço e telefone não.
Porém, se eu solicitar que seja listado tudo referente a Médico, todas as informações retornarão.
Para que sejam retornados apenas o dados que eu eu quero, será necessário realizar uma mudança na nossa classe:
Criando um novo `record` : `DadosListagemMedicos`:

<img src="{{ '/assets/img/img_76.png' | relative_url }}" alt="img_76"/><br>
<br>

Mude o pacote de `controller` para `medico`:

```
     // Metodo Listar
     @GetMapping
         public List <DadosListagemMedico> listar() {
         return repository.findAll(); // a entidade JpaRepository já possui todos os métodos cadastrados em a necessidade de repetí-los na `MedicoRepository`

         }

```

<img src="{{ '/assets/img/img_77.png' | relative_url }}" alt="img_77"/><br>
<br>

Declare as propriedades do DTO do `record`, as quais devolverão **apenas as informações necessárias da minha preferência**:

<img src="{{ '/assets/img/img_78.png' | relative_url }}" alt="img_78"/><br>
<br>

```
package med.voll.api.medico;

public record DadosListagemMedico(

        String nome,

        String email,

        String crm,

        Especialidade especialidade) { // Enum Especialidade
}

```

Será necessário realizar uma **conversão**, no controller `MedicoController.java`, onde o retorno deverá ser de `Medicos` para `DadosListagemMedico`:


<img src="{{ '/assets/img/img_79.png' | relative_url }}" alt="img_79"/><br>
<br>


```
     @GetMapping
         public List <DadosListagemMedico> listar() {
         return repository.findAll().stream().map(DadosListagemMedico::new); 
         }

```

Será necessário criar um `constructor` na classe `DadosListagemMedico`:

<img src="{{ '/assets/img/img_80.png' | relative_url }}" alt="img_80"/><br>
<br>
<br>

<img src="{{ '/assets/img/img_81.png' | relative_url }}" alt="img_81"/><br>
<br>


```

    public DadosListagemMedico(Medico medico){
        this(medico.getNome(), medico.getEmail(), medico.getCrm(), medico.getEspecialidade());

    }


```

Logo após criar o construtor, ao retornar no controller, será necessário finalizar incluindo o comando para **converter** o retorno em uma lista `toList()`:

<img src="{{ '/assets/img/img_82.png' | relative_url }}" alt="img_82"/><br>
<br>

```
  @GetMapping
         public List <DadosListagemMedico> listar() {
         return repository.findAll().stream().map(DadosListagemMedico::new).toList();

         }

```

TESTANDO A LISTAGEM 


No Insomnia, será necessário criar uma nova requisição para testar a Listagem.

Neste caso utilizaremos o método `GET`, onde o nosso localhost deverá ser incluso.

Como queremos **receber** e não **enviar** apenas é necessário enviar a requisição e verificar se serão retornadas as informações em formato de **JSON e Arrays**.

Como podemos observar as informações referentes ao objetivo completo **não** foram retornas, confirmando o sucesso da listagem. 


<img src="{{ '/assets/img/img_83.png' | relative_url }}" alt="img_83"/><br>
<br>

PAGINAÇÃO NO SPRING BOOT


Nesta aplicação, queremos que ao realizar uma busca, o usuário receba os cadastros já realizado na plataforma de forma paginada. Para que não sejam carregados todos os cadastros de uma vez, pois ao receber todos os cadastros,0 isso poderá impactar na memória e na performance do projeto. 


Para evitar esse tipo de conflito iremos utilizar a **Paginação**.


No Spring Boot existe uma classe que se chama **Pageable**, neste caso devemos utilizar a do tipo **springframework**.

Acesse a classe Controller `MedicoController.java` e no método `public List` será inclusa classe `paginable` o parâmetro de `paginacao`

No `findAll`, também passaremos como parametro a `paginacao`:

Uma outra alteração, será a troca do retorno do método `public List`para `public Page`, a qual já possui os *generics***
(>, < e etc).


```
     // Metodo Listar
     @GetMapping
         public Page<DadosListagemMedico> listar(Pageable paginacao) {  
         return repository.findAll(paginacao).stream().map(DadosListagemMedico::new).toList();

         }


```


Porém ao mudar o método de list para page o retorno do repository também deverá ser adequado:

```
    return repository.findAll(paginacao).map(DadosListagemMedico::new);
```

- Podemos retirar a chamada para o método `stream()`,pois o método `Page`já possui o mesmo. 
- O `To List` também poderá ser retirado, pois o `map` já realiza a conversão e devolve uma lista.

<img src="{{ '/assets/img/img_84.png' | relative_url }}" alt="img_84"/><br>
<br>


Após realizar as adequações, retorne ao Insomnia e **execute novamente a requisição**.
Repare que o prompt irá apresentar um novo comportamente onde o `Spring` adicionará um `Pageable` no arquivo `JSON` devolvendo as informações da Paginação.

<img src="{{ '/assets/img/img_85.png' | relative_url }}" alt="img_85"/><br>
<br>

Para controlar o número de registros por requisição, será necessário realizar uma alteração na ***url*** do Insomnia adicionando um parâmetro ***size***. Por padrão o Spring retorna 20 registros. Neste caso quero que seja listado apenas 1 registro, conforme destacado na imagem abaixo. 

```
http://localhost:8080/medicos?size=1 

```

<img src="{{ '/assets/img/img_86.png' | relative_url }}" alt="img_86"/><br>
<br>

Para definir qual a página você deseja obter a informação é necessário realizar novamente a adequação da ***url***

```
http://localhost:8080/medicos?size=1&page=2

```

ORDENAÇÃO

Para realizar a ordenação dos dados cadastrados, iremos utilizar um novo parâmetro chamado ***sort***. Neste caso podemos informar qual parâmetro queremos destacar. 

```
http://localhost:8080/medicos?sort=crm
```
<img src="{{ '/assets/img/img_88.png' | relative_url }}" alt="img_88"/><br>
<br>

Por padrão a ordenação ocorre de forma **crescente**, mas para converter em ordem **decrescente** podemos incluir o `desc`na url 

```
http://localhost:8080/medicos?sort=crm,desc
```

<img src="{{ '/assets/img/img_87.png' | relative_url }}" alt="img_87"/><br>
<br>


Dica: Caso eu queira traduzir para português os parâmetros, é necessário realizar uma adequação dos mesmos no arquivo, `applications.properties`


```
spring.data.web.pageable.page-parameter=pagina
spring.data.web.pageable.size-parameter=tamanho
spring.data.web.sort.sort-parameter=ordem

```

O mesmo deve ser adequado na URL:

Exemplo: Para listar os médicos de nossa API trazendo apenas 5 registros da página 2, ordenados pelo e-mail e de maneira decrescente, a URL da requisição deve ser:

```
http://localhost:8080/medicos?tamanho=5&pagina=1&ordem=email,desc

```
<br>
<br>

ORDENAÇÃO - OPÇÃO 02

Eu posso configurar a ordenação de outra forma no meu controller `MedicoController.java`, definindo o número de requisições, o sort e demais parâmetros. 
 
```
 public Page<DadosListagemMedico> listar (@PageableDefault(size=10, sort={"nome"}) Pageable paginacao) 

```
<img src="{{ '/assets/img/img_89.png' | relative_url }}" alt="img_89"/><br>
<br>
   

**Os nomes dos comandos de paginação e ordenação, também poderão ser personalizados, porém é necessário utilizar o arquivo `application.properties`.** 

Para que seja destacado o log das requisições do arquivo sql e ordernar os mesmos ao executar a aplicação, será necessário incluir no arquivo `application.properties` os seguintes parâmetros:

```

# logs de comados sqls
spring.jpa.show-sql=true

# Formatando os logs de comando sql
spring.jpa.properties.hibernate.format_sql=true

```

<img src="{{ '/assets/img/img_90.png' | relative_url }}" alt="img_90"/><br>
<br>

Logo após, execute novamente via Insomnia e verifique o log no Intelij. Na imagem abaixo, podemos visualizar o log com que o SpringData está disparando no nosso banco de dados de forma listada. 

<img src="{{ '/assets/img/img_91.png' | relative_url }}" alt="img_91"/><br>
<br>

PAGINAÇÃO E ORDENAÇÃO - Pacientes


Também foram realizas as mesmas configurações para listagem de pacientes, abaixo segue imagem da requisição no Insominia destacando o `Pageable` e um exemplo de requisição com ordenação **descrescente**. 

<img src="{{ '/assets/img/img_92.png' | relative_url }}" alt="img_92"/><br>
<br>

Log de execução destacando o log ao executar a aplicação:

<img src="{{ '/assets/img/img_93.png' | relative_url }}" alt="img_93"/><br>
<br>

ATUALIZAÇÃO 

Para atualizar os dados de um cadastro, será necessário identificar a qual médico de refere, para isso, precisamos incluir o `id`no nosso dto e na nossa `listagem`.

Acesse o `record` `DadosAtualizacaoMedico.java` e inclua o `id`, tanto no record, quando no `constructor`:


```

package med.voll.api.medico;

public record DadosListagemMedico(

        Long id,

        String nome,

        String email,

        String crm,

        Especialidade especialidade
        ) {

    public DadosListagemMedico(Medico medico){
        this(medico.getId(), medico.getNome(), medico.getEmail(), medico.getCrm(), medico.getEspecialidade()), ;

    }
}


```

<img src="{{ '/assets/img/img_94.png' | relative_url }}" alt="img_94"/><br>
<br>


Após realizar as adequações, execute a requisição via Insomnia, repare que o `id` também é registrado no arquivo JSON. 

<img src="{{ '/assets/img/img_95.png' | relative_url }}" alt="img_95"/><br>
<br>

O mesmo foi adequado para a classe `PacienteController.java`:

```
package med.voll.api.pacientes;

public record DadosListagemPaciente(

        Long id,

        String nome,

        String email,

        String telefone) {

    public DadosListagemPaciente (Paciente paciente){
        this(paciente.getId(),paciente.getNome(), paciente.getEmail(),paciente.getTelefone());

    }

```

<img src="{{ '/assets/img/img_96.png' | relative_url }}" alt="img_96"/><br>
<br>



ATUALIZAÇÃO - MÉDICOS(PUT)


Após incluir o ***id***, agora é possível realizar alterações em cadastros especificos, conforme a nossa preferência.

Ainda no Insominia abra um novo arquivo no formato de uma **Requisição HTTP**, opte pela opção ***PUT***.

Ensira a URL: `chttp://localhost:8080/medico`

Neste caso iremos **enviar requisições**, portanto é necessário optar por um arquivo no formato ***JSON***.

No exemplo abaixo, **queremos que o cadastro com o id = 3 tenha seu número de telefone atualizado**:

```
{
	"id" : 3, 
	"telefone" : "19991611596"
		
}
```

Na imagem abaixo temos uma visão de uma tentativa de envio de requisições utilizando o método PUT, porém, ficou pendente incluir esse método em nosso controller `MedicoController.java`.

<img src="{{ '/assets/img/img_97.png' | relative_url }}" alt="img_97"/><br>
<br>

A seguir, inicialmente incluimos o Spring `@PutMapping` e ao instansiar a classe do tipo `void`teremos que incluir um novo `record` do tipo `DadosAtualizacaoMedico.java` para `medicos`: 

<img src="{{ '/assets/img/img_98.png' | relative_url }}" alt="img_98"/><br>
<br>


No `record` `DadosAtualizaMedico.java` foram incluso os campos opcionais e o id que é um campo obrigatórioe que não pode ser nulo. 

<img src="{{ '/assets/img/img_99.png' | relative_url }}" alt="img_99"/><br>
<br>


```
package med.voll.api.medico;

import jakarta.validation.constraints.NotNull;
import med.voll.api.endereco.Endereco;

public record DadosAtualicacaoMedicos(

        @NotNull
        Long id, // É obrigatório

        String nome, //É opcional

        String telefone, //É opcional

        Endereco endereco) { //É opcional

}

```

ATUALIZANDO NO BANCO DE DADOS

Para atualizar as requisições do objeto no banco de dados, será necessário carregar os dados atuais no banco de dados e **sobscrevê-lo**. 
    var medico :Medico = repository.GetReferenceById(dados.id());
    

