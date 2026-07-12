---
layout: post
title: "SQL - Introdução"
categories: [sql]
series_order: 1
author:
- Ana Laura Martins
meta: "Springfield"
modified_date: 2025-11-10
---

##  Introdução ao SQL

Anotações do curso de **Introdução ao SQL**

### Comandos Iniciais

- **STRING (VARCHAR)**: É uma cadeia de caracteres, o VARCHAR armazena Strings pequenas ou grandes;
- **INTERGER (INT)**: Armazena número inteiros;
- **FLOAT (NUMERIC)** : Armazenamento de números francionários - O NUMERIC armazena floats;
<br>

### ESQUEMA

É chamado como **"plantas" dos bancos de dados**.
O Esquema mostra o design de um banco de dados, relações entre tabelas, tipos de dados e etc.
<br>

### PALAVRAS CHAVE:


`SELECT` e `FROM` são as palavras mais utilizadas:

- **SELECT**: Indica quais campos devem ser selecionados;
- **FROM**: Indica o local que os nomes estão localizados.

**Exemplo 01:**Consulta(um campo): 

{% highlight ruby %}

SELECT name
FROM patrons; 

{% endhighlight %}

> O exemplo da consulta irá gerar um conjunto de resultados, listando os nomes em uma tabela. 

**Exemplo 02:**de Consulta(dois campos): 

{% highlight ruby %}

SELEC card_number, name
FROM patrons;

{% endhighlight %}


**Exemplo 03:** de Consulta(três campos): 

{% highlight ruby %}

SELECT member_id, card_number, name
FROM patrons;

{% endhighlight %}


**Exemplo 04:** de Consulta (todos os campos de uma tabela):

Insira um caractere coringa **"*"**;

{% highlight ruby %}

SELECT *
FROM patrons;

{% endhighlight %}

### ALIAS

Renomeie colunas para deixá-las mais claras ou curtas.

Vamos supor que uma tabela de relação de funcionários(`employees`) possui uma coluna chamada `name`, onde apresenta apenas o primeiro nome de 
cada funcionário e a tabela `year_hired` que apresenta o ano de contratação. 

{% highlight ruby %}

SELECT name, year_hired
FROM employees;

{% endhighlight %}

Para mudar o nome do campo da colunas podemos utilizar `AS` renomeando o name como `first_name`.

{% highlight ruby %}

SELECT name AS first_name
FROM employees;

{% endhighlight %}

> Após essa mudança o nome da coluna passará a se chamar `first_name`.

### DISTINCT

O `DISTINCT` é utilizado para trazer um valor único:

{% highlight ruby %}

SELECT DISTINCT year_hired
FROM employees;

{% endhighlight %}


### VIEW

Uma `VIEW` é uma consulta do SQL que funciona como uma tabela virtual 

#### Armazenando as consultas

{% highlight ruby %}

CREATE VIEW employee_hire_years AS SELECT id, name year_hire 
FROM employees;

{% endhighlight %}

**Pergunta:** E se você quiser usá-la mais tarde ou permitir que outras pessoas acessem e usem os resultados?

**Resposta:** A melhor maneira de fazer isso é criar uma `view`. **Lembre-se de que uma view é uma tabela virtual**. A view é muito semelhante a uma tabela real, mas, **ao invés de armazenar os dados é o código da consulta que é armazenado para uso posterior**.

**Exemplo 05:** Verifique se a `view` foi criada selecionando todas as colunas em `library_authors`.

{% highlight ruby %}

-- Your code to create the view:
CREATE VIEW library_authors AS
SELECT DISTINCT author AS unique_author
FROM books;

{% endhighlight %}


{% highlight ruby %}

-- Select all columns from library_authors
SELECT *
FROM library_authors;

{% endhighlight %}


### VARIANTES DO SQL

O SQL possui várias variações sendo gerenciado por outras empresas com pequenas diferenças entre si:

- **Oracle SQL**

- **Microsoft SQL Server**

- **PostgresSql:**
  - Gratuito;
  - Código Aberto;
  - Sistema de Banco de Dados e Variante SQL. 

- **SQL Server:**
  - Versões Gratuitas e Pagas;
  - Criado pela Microsoft;
  - Usa a variante T-SQL .

### LIMIT

Limita a quantidade de linhas e dados que queremos consultar:

**Exemplo 06:**

{% highlight ruby %}

SELECT genre 
FROM  books
LIMIT 10;

{% endhighlight %}

> Através desta consulta, iremos visualizar 10 linhas 
			





<!--
### Whaaat, a checklist??

- [ ] Milk
- [x] Cookies
  - [x] Classic Choco-chip
  - [x] Sourdough Choco-chip
- [ ] Chee-ee-eeee-zzze!!!!
-->