---
layout: post
title: "Git - Introdução"
categories: [git]
series_order: 1
author:
- Ana Laura Martins
meta: "Springfield"
modified_date: 2025-11-10
---

### Introdução ao Git

Anotações do curso de **Introdução ao Git**

**Acessando o conteúdo do terminal:**

{% highlight ruby %}

pwd

{% endhighlight %}


**Acessando um diretório:**

{% highlight ruby %}

cd nomedoarquivo.md

{% endhighlight %}

**Listando todo o conteúdo do diretório:**

{% highlight ruby %}

ls

{% endhighlight %}

**Criando um novo repositório:**

{% highlight ruby %}

git init nomedomeurepo.md

{% endhighlight %}

**Acessando o meu novo repo utilize o comando:**

{% highlight ruby %}

cd nomedomeurepo.md

{% endhighlight %}

**Conferindo o status do novo repo:**

{% highlight ruby %}

git status # será exibida uma mensagem na tela

{% endhighlight %}

**Convertendo uma projeto existente em um Repo do Git**

{% highlight ruby %}

 git init

{% endhighlight %}

> Será exibida a mensagem informando que um repo vazio foi inicializado e o caminho do diretório ../../../nomedomeurepo


### Tracked (Rastreado) / Un-tracked(Não rastreado)

O git identifica quando há um arquivo modificado ou se o mesmo está desatualizado.

**Git Workflow**

- Edite e salve arquivo em nossos computadores;
- Adicione os arquivos na área de preparação (staging área);
	- rastreie o que foi modificado

**Commit the files:**

- **Staging(área de preparação)** = Exemplo: colocar uma carta em um envelope
- **Commit** = Colocar o envelope em uma caixa dos correios.

**Adicionando um arquivo na área de staging:**

{% highlight ruby %}

git add meuarquivo.md

{% endhighlight %}

**Adicionando todos os arquivos na área de staging:**

{% highlight ruby %}

git add .

{% endhighlight %}

**Use o git commit para realizar o commit**

{% highlight ruby %}

git commit -m "meu primeiro commit"

{% endhighlight %}

> -m: representa a mensagem de log conforme a nossa escolha.

#### The Commit Structure

Os commits possuem 3 partes:

1. **Commit:** Contém metadatas - logs, nome do autor, hora do commit;
2. **Árvore:** Nomes, localização dos diretórios, arquivos e etc;
3. **Blobs:** Conteúdo.

#### Git Log

Ao adicionar o comando poderemos visualizar a data do commit,a mensagem de log e o hash do commit.

{% highlight ruby %}

git log

{% endhighlight %}

**Verificar um número especifico dos últimos commits realizados use:**

{% highlight ruby %}

git log -3 # irá aparecer na tela os logs dos 3 últimos commits

{% endhighlight %}

**Outra opção é procurar o log por um arquivo específico:**

{% highlight ruby %}

git log meuarquivo.html

{% endhighlight %}

**Posso também misturar os dois comando, procurando os 3 últimos logos do `meuarquivo.html`**

{% highlight ruby %}

git log -3 meuarquivo.html

{% endhighlight %}

**Podemos personalizar a busca por data:**

`git log --since='Month Day Yea'`

Exemplo:

{% highlight ruby %}

 git log --since='April 30 2025'

{% endhighlight %}

**Podemos também inserir um intervalo de busca:**

{% highlight ruby %}

git log --since='Apr 2 2025' --until='Oct 10 2025'

{% endhighlight %}

**Podemos também realizar uma busca via os primeiros número do hash de um commit:**

{% highlight ruby %}

git log 
git show c27fa856

{% endhighlight %}

### Comparações

{% highlight ruby %}

git diff # Diferenças entre versões

{% endhighlight %}

**Comparações entre a última versão do commit com a última versão do documento que não está na área de preparação(staging):**

{% highlight ruby %}

git diff report.md

{% endhighlight %}

**Comparando um arquivo na área de staging:**

1. Adicione um arquivo: `meuarquivo.md`

{% highlight ruby %}

git add report.md

{% endhighlight %}

2. Compare a última versão com a versão que está na área de staging:

{% highlight ruby %}

git diff --staged report.md

{% endhighlight %}

> Será possível visualizar as hashs dos Commits, as mensagens e a comparação entre a atual e o último Commit

**Para comparar todas as versões com o último Commit utilize:**

{% highlight ruby %}

git diff --staged

{% endhighlight %}

**Para comparar dois Commits;**

{% highlight ruby %}

git log
git diff 1245xs4 36d74a8d ( É possível inverter os hashes também)

{% endhighlight %}

**Também podemos utilizar a palavra HEAD em maiúscula, para realizar comparações entre as HEAD's:**

{% highlight ruby %}

git diff HEAD~1 HEAD~2

{% endhighlight %}

### Restaurando Versões

`git revert`

**Reverte mudanças entre hashes(45d1596) e commits(HEADS):**

{% highlight ruby %}

git revert HEAD

{% endhighlight %}

Para **Salvar(CTRL + 0)** | **Enter** | **Fechar( CTRL + X)**

**Reverter sem alterar o texto**

{% highlight ruby %}

git revert --no-edit HEAD

{% endhighlight %}

**Reverter sem o commit(trás os arquivos à área de staging):**

{% highlight ruby %}

git revert -n HEAD

{% endhighlight %}

> O comando git revert funciona no commits, não em arquivos individuais.

**Para reverter um único arquivo utilize o comando abaixo:**

{% highlight ruby %}

git checkout 

{% endhighlight %}

**Novamente escolha entre um hash ou um HEAD:**

{% highlight ruby %}

git checkout HEAD~1 -- meuarquivo.md

{% endhighlight %}




