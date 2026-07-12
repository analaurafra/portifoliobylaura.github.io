---
layout: post
title: "Fundamentos da IA Generativa com Bedrock"
categories: [ia]
series_order: 1
author:
- Ana Laura Martins
meta: "Springfield"
modified_date: 2025-11-13
---

## Fundamentos da IA Generativa com Bedrock — Nexa

Anotações e práticas do Bootcamp de **Fundamentos da IA Generativa com Bedrock**.

Treinamento imersivo sobre os **Fundamentos da Inteligência Artificial Generativa** e treinamento prático utilizando os serviços da **AWS**, como:

- **Amazon Bedrock**
- **PartyRock**
- **Amazon Nova**
- **AgentCore**

Trilha de aprendizado para aplicação da IA em soluções reais.

### Machine Learning

É uma área da inteligência artificial que procura ensinar máquinas via dados de entrada.

Machine Learning = a máquina aprender com você ou com uma massa de dados de outras pessoas.

Machine Learning aprende com várias pessoas, oferecendo conteúdo personalizado.

### Modelos de algoritmos das IAs

- **Algoritmo de Aprendizado Supervisionado:** modelos de dados de entrada com respostas corretas, onde serão abstraídos os dados corretos, cujo o modelo buscará padrões de forma mais facilitada. O profissional de machine learning tem um papel de "professor".

- **Algoritmo de Aprendizado Não Supervisionado:** neste modelo, há uma massa de entrada apenas e o algoritmo ajuda a agrupar e facilitar a análise dos mesmos.

- **Algoritmo de Aprendizado por Reforço:** o agente aprende com o usuário interagindo com o ambiente, recebendo recompensas mediante acertos e punições mediante erros.

### Visão computacional

- **Redes Neurais Convolucionais:** inspirada no funcionamento do cérebro humano, possui capacidade de identificar padrões para reconhecimento de controles (formato de um objeto, animal, imagens, detectar sentimentos, movimentos humanos ou não humanos, compreensão do ambiente etc.).

  É possível imputar uma massa de dados maior, porém o sistema consegue diferenciar — exemplo: sistema de um carro autônomo, como um Tesla.

- **Detecção e Reconhecimento Facial:** utilizado em várias tecnologias como sistemas de banco, vigilância, tickets de shows etc. Identificando padrões através destes recursos.

### Processamento de Linguagem Natural (PNL)

É uma subárea da inteligência artificial que busca permitir que computadores compreendam e interajam através da linguagem humana.

Utiliza um algoritmo de Redes Neurais para extrair informações a partir da linguagem natural.

São treinados via textos, onde posteriormente reconhecem padrões e atribuem probabilidades dentro do contexto atual, comparando as massas de dados.

O algoritmo utiliza um modelo matemático no backend (token) para chegar próximo da resposta do contexto do usuário.

- **Desambiguação Semântica:** uma mesma palavra ou frase pode ter o mesmo significado; a desambiguação semântica analisa a ambiguidade das palavras e utiliza o contexto para identificar quais informações são mais adequadas.

- **Redes Neurais de Linguagem:** o processo de geração de texto utiliza um volume gigante de textos como massa de dados, com vários modelos de abstração da gramática. O prompt gera respostas coerentes.

### Robótica

A robótica está presente no nosso dia a dia e de forma acessível. É uma área multidisciplinar que engloba várias tecnologias, com a intenção de trazer autonomia a equipamentos como Alexa, Echo Dots etc.

Os robôs são equipados com câmeras e sensores que interpretam objetos e reconhecem imagens. Utilizam sensores táteis e emocionais mediante diversos algoritmos de aprendizagem de máquina, por reforço (aprendizagem com base em recompensas e Deep Learning).

### Desmistificando a Inteligência Artificial

**IAs Generativas Aplicadas:** são sistemas capazes de criar, adaptar e aprimorar conteúdos de maneira autônoma, sempre aprendendo e se aperfeiçoando (ex.: GPT).

#### Chatbots

| Ferramenta | Empresa |
|------------|---------|
| ChatGPT | OpenAI |
| Bing Chat | Microsoft |
| Google Bard | Google |

#### Assistentes virtuais

| Assistente | Empresa |
|------------|---------|
| Google Assistant | Google |
| Alexa | Amazon |
| Siri | Apple |

**Gamma App** — IA de geração de apresentações de slides.

Chatbots (IAs Generativas) são ferramentas de consulta a uma IA utilizando linguagem natural:

- **Bard** — precisa criar uma conta; exclusivo do Google
- **Bing Chat** — não precisa criar uma conta; inspirado no modelo da OpenAI (parceria com a OpenAI)
- **ChatGPT** — precisa criar uma conta; inspirado no modelo da OpenAI

### Na prática — API de voz da OpenAI

Exemplo de teste da API da OpenAI para gerar mensagem de voz via **Postman**.

1. Crie uma conta na plataforma OpenAI
2. Localize a API de áudio no Postman
3. Gere um token em [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. **Atenção:** é necessário possuir créditos na OpenAI para concluir o teste

**Método:** `POST`

**URL:** [https://api.openai.com/v1/audio/speech](https://api.openai.com/v1/audio/speech)

**Headers:**

```http
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "model": "gpt-4o-mini-tts",
  "voice": "alloy",
  "input": "Olá! Este é um teste de áudio gerado pela API."
}
```

Depois que enviar, o Postman baixa o arquivo `.mp3` como resposta — você pode ouvir o áudio gerado.
