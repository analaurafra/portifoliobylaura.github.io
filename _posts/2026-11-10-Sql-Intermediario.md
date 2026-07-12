---
layout: post
title: "SQL Intermediário"
categories: [sql]
series_order: 2
author:
- Ana Laura Martins
meta: "Springfield"
modified_date: 2026-06-01
---

## SQL Intermediário

O `COUNT()` conta o número de registros com um valor em um campo

**Exemplos:** conta data de nascimento presente na tabela people:

{% highlight ruby %}

SELECT COUNT(birthdate) AS count_birthdates
FROM people;

{% endhighlight %}

> Irá aparecer a soma total dos aniversários da tabela

Use o Alias `AS` para maior clareza.

**Exemplo:** Para contar vários campos:

{% highlight ruby %}

SELECT COUNT(names) AS count_names, COUNT(birthdate) AS count_birthadates
FROM people;

{% endhighlight %}

**COUNT(field-name):** Conta os valores em um campo;
**COUNT(*):** Conta toda registros em uma tabela.
> * representa todas as tabelas

{% highlight ruby %}

SELECT COUNT(*) AS total_records
FROM people;

{% endhighlight %}

### DISTINCT

Remove duplicatas e retorna valores exclusivos: 

{% highlight ruby %}

SELECT language
FROM films;

{% endhighlight %}

**Exemplo:** Quais idiomas contém a tabela films?

{% highlight ruby %}

SELECT DISTINCT language
FROM films;

{% endhighlight %}

### COUNT() e DISTINCT()

A junção destes dois comandos conta valores exclusivos:

{% highlight ruby %}

SELECT COUNT (DISTINCT birthdate) AS count_distinct_birthdate
FROM people;

{% endhighlight %}

Retorna o número de países únicos representados na tabela films, com o alias `count_distinct_countries`.
SELECT COUNT(DISTINCT country) AS count_distinct_countries
FROM films;

> Neste caso serão somadas todas as datas de nascimento, porém temos que lembrar que há chances de pessoas cadastradas tabela terem a mesma data de nascimento entre si. 

{% highlight ruby %}

COUNT(0) inclui infos duplicadas
DISTINCT exclui os duplicados

{% endhighlight %}


Conte os registros de idiomas e países na tabela films; `use count_languages` e `count_countries` como alias para as colunas.

{% highlight ruby %}

SELECT COUNT(language) AS count_languages, COUNT(country) AS count_countries
FROM films;

{% endhighlight %}


### Execução de Consultas

**Obs:** O SQL não é processado na ordem que é escrito:

{% highlight ruby %}

SELECT name
FROM people
LIMIT 10;

{% endhighlight %}


### Depuração do Código SQL

O código SQL é processado de forma diferente de outras linguagens de programação, pois você precisa informar ao processador de onde extrair os dados antes de fazer as seleções.

{% highlight ruby %}

SELECT nme
FROM people;

{% endhighlight %}

> Notamos que o nome está escrito incorreto, onde será gerado um log de erro indicando que o mesmo não existe

**Outros erros como:**

- esquecer vírgula
- ponto e virgula no final
- capitalização (maiúscula)

{% highlight ruby %}

SELCT tile, country, duration
FROM films;

{% endhighlight %}

> Será gerado um erro de sintaxe, pois o comando `SELECT` foi escrito incorretamente

**A formatação no SQL não é obrigatória, adicione quebra de linhas e recuos.**

{% highlight ruby %}

SELECT
     title,
     release_year,
     country
FROM filmes
LIMIT 10;

{% endhighlight %}

**Obs:** No **Postgres SQL** não é necessário finalizar a consulta com ponto e vírgula, mas como **boa prática** o ideal é mantê-lo.

Nomes não padronizados devem ser escritos entre aspas duplas

{% highlight ruby %}

SELECT title, "release year", country
FROM films
LIMIT 3; 

{% endhighlight %}


Para seguir os padrões de como escrever seu código de forma padronizada acesse o guia [SQL STYLE](https://www.sqlstyle.guide/).

CONTINUA....







 