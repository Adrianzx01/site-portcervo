let bancoDeDados = {};

async function carregarLista(categoria, idContainer) {
    try {
        const resposta = await fetch(`data/${categoria}.json`);
        const dados = await resposta.json();
        bancoDeDados[categoria] = dados;
        renderizarCards(categoria, idContainer, dados);
    } catch (erro) {
        console.error(`Erro ao carregar ${categoria}:`, erro);
    }
}

function renderizarCards(categoria, idContainer, itens) {
    const container = document.getElementById(idContainer);
    container.innerHTML = "";

    itens.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        let infoExtra = "";
        let labelStatus = "Status"; // Padrão
        let valorStatus = item.status || "N/A";

        // Mapeamento específico por categoria conforme seus JSONs
        if (categoria === "filmes") {
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Diretor:</strong> ${item.diretor}</p>
                <p><strong>Gênero:</strong> ${item.genero}</p>`;
        } else if (categoria === "series") {
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Criador:</strong> ${item.criador}</p>
                <p><strong>Emissora:</strong> ${item.emissora}</p>
                <p><strong>Temp/Eps:</strong> ${item.temporadas}T / ${item.episodios}E</p>`;
        } else if (categoria === "animes") {
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Estúdio:</strong> ${item.estudio}</p>
                <p><strong>Gênero:</strong> ${item.genero}</p>
                <p><strong>Temp/Eps:</strong> ${item.temporadas}T / ${item.episodios}E</p>`;
        } else if (categoria === "mangas") {
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Autor:</strong> ${item.autor}</p>
                <p><strong>Gênero:</strong> ${item.genero}</p>
                <p><strong>Volumes:</strong> ${item.volumes_lidos}</p>`;
        } else if (categoria === "hqs") {
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Autor:</strong> ${item.autor}</p>
                <p><strong>Editora:</strong> ${item.editora}</p>`;
        } else if (categoria === "jogos") {
            labelStatus = "Progresso"; // Muda o nome para Jogos
            valorStatus = item.progresso; // Pega o valor do campo progresso
            infoExtra = `
                <p><strong>Ano:</strong> ${item.ano}</p>
                <p><strong>Desenvolvedor:</strong> ${item.desenvolvedor}</p>
                <p><strong>Gênero:</strong> ${item.genero}</p>
                <p><strong>Plataforma:</strong> ${item.plataforma}</p>`;
        }

        card.innerHTML = `
            <img src="${item.capa}" alt="${item.titulo}">
            <div class="card-info">
                <h3>${item.titulo}</h3>
                <div class="detalhes">${infoExtra}</div>
                <p><strong>${labelStatus}:</strong> ${valorStatus}</p>
                <p><strong>Nota:</strong> <span class="nota">${item.nota}/10</span></p>
            ${item.review ? `
            <button class="btn-comentario" onclick="abrirModal('${item.review.replace(/'/g, "\\'")}')">
            <i class="fas fa-comment-dots"></i> Comentários
            </button>
        ` : ''}
        </div>
        `;
        container.appendChild(card);
    });
}

function filtrar(categoria, termo) {
    let dadosFiltrados;
    if (termo === 'todos') {
        dadosFiltrados = bancoDeDados[categoria];
    } else {
        dadosFiltrados = bancoDeDados[categoria].filter(item => 
            (item.status === termo) || (item.progresso === termo)
        );
    }
    renderizarCards(categoria, `lista-${categoria}`, dadosFiltrados);

    const botoes = document.querySelectorAll(`#${categoria} .btn-filtro`);
    botoes.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

function mostrarAba(idAba) {
    // 1. Esconder todas as seções
    const abas = document.querySelectorAll('.aba-conteudo');
    abas.forEach(aba => aba.classList.remove('active'));

    // 2. Remover o destaque de todos os links do menu
    const links = document.querySelectorAll('nav a');
    links.forEach(link => link.classList.remove('active-link'));

    // 3. Mostrar a seção clicada
    const abaSelecionada = document.getElementById(idAba);
    if (abaSelecionada) {
        abaSelecionada.classList.add('active');
    }

    // 4. Destacar o link clicado no menu
    // Usamos um seletor para achar o link que tem o onclick da aba atual
    const linkAtivo = Array.from(links).find(link => link.getAttribute('onclick').includes(idAba));
    if (linkAtivo) linkAtivo.classList.add('active-link');
}

function abrirModal(texto) {
    const modal = document.getElementById('modal-comentario');
    const campoTexto = document.getElementById('texto-comentario');
    
    campoTexto.innerText = texto;
    modal.style.display = "block";
}

function fecharModal() {
    document.getElementById('modal-comentario').style.display = "none";
}

// Fechar se clicar fora da caixa
window.onclick = function(event) {
    const modal = document.getElementById('modal-comentario');
    if (event.target == modal) {
        fecharModal();
    }
}

// Para o site não abrir vazio, definimos uma aba inicial ao carregar
window.onload = () => {
    setTimeout(() => {
        mostrarAba('perfil'); // Abre em filmes por padrão após o carregamento
    }, 100);
};

// Chamadas iniciais
carregarLista('filmes', 'lista-filmes');
carregarLista('series', 'lista-series');
carregarLista('hqs', 'lista-hqs');
carregarLista('mangas', 'lista-mangas');
carregarLista('animes', 'lista-animes');
carregarLista('jogos', 'lista-jogos');