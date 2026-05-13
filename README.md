# 🎭 Acervo Pessoal - PortCervo

O **PortCervo** é um hub pessoal dinâmico desenvolvido para catalogar e exibir consumos de mídia (filmes, animes, jogos) e hobbies de forma organizada e visualmente atraente. Este projeto foi o ponto de partida para a criação do meu portfólio profissional.

> **Status do Projeto:** Ativo (Versão de Acervo)  
> **Live Demo:** [adrianzx01.github.io/site-portcervo/](https://adrianzx01.github.io/site-portcervo/)

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído focado em performance e manipulação de DOM sem dependências pesadas:

* **HTML5 & CSS3:** Estrutura e estilização avançada com variáveis CSS.
* **JavaScript (Vanilla):** Lógica de navegação entre abas e manipulação dinâmica de elementos.
* **Fetch API:** Consumo de arquivos locais em formato **JSON** para renderização de conteúdo.
* **FontAwesome:** Ícones para a interface.
* **Google Fonts:** Tipografia personalizada.

---

## 🛠️ Funcionalidades

* **Navegação Single Page (SPA):** Troca de abas instantânea via JavaScript, sem recarregamento de página.
* **Gerenciador de Mídia Dinâmico:** O conteúdo é alimentado por arquivos JSON, facilitando a atualização sem mexer na estrutura HTML.
* **Music Player Integrado:** Player de áudio customizado com estética Cyberpunk e equalizador visual dinâmico.
* **Design Responsivo:** Adaptado para diferentes resoluções de tela.

---

## 📂 Estrutura de Arquivos Principal

```text
├── assets/             # Imagens, GIFs e arquivos de áudio
├── data/               # Arquivos JSON (animes.json, filmes.json, etc.)
├── index.html          # Estrutura principal
├── style.css           # Estilização e animações neon
└── script.js           # Lógica de carregamento assíncrono e player
```

---

## 💡 Como Atualizar o Conteúdo

Para adicionar novos itens ao acervo, basta inserir um novo objeto no arquivo correspondente dentro da pasta `/data`:

```text
{
    "titulo": "Nome da Obra",
    "descricao": "Breve resumo sobre o que achei.",
    "status": "Concluído",
    "imagem": "assets/capa-da-obra.jpg"
}
```

---

## 👤 Autor

Desenvolvido por Adrian Silva.

Este repositório serve como histórico de aprendizado em desenvolvimento Front-End e manipulação de dados assíncronos.
