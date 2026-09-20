const eventos = [
    {
        id: 1,
        titulo: "Workshop de Git e GitHub",
        tipo: "Workshop",
        data: "2026-09-25",
        local: "Laboratório 2",
        descricao: "Atividade prática sobre versionamento.",
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestra sobre Inteligência Artificial",
        tipo: "Palestra",
        data: "2026-10-02",
        local: "Auditório Principal",
        descricao: "Discussão sobre aplicações acadêmicas da inteligência artificial.",
        status: "Agendado"
    },
    {
        id: 3,
        titulo: "Minicurso de JavaScript",
        tipo: "Minicurso",
        data: "2026-09-10",
        local: "Laboratório 1",
        descricao: "Introdução à manipulação do DOM com JavaScript.",
        status: "Realizado"
    }
];

const app = document.getElementById("app");
const linksViews = document.querySelectorAll("[data-view]");

function atualizarLinkAtivo(view) {
    linksViews.forEach(function (link) {
        link.classList.toggle("active", link.dataset.view === view);
    });
}

function exibirDashboard() {
    const totalEventos = eventos.length;
    const eventosAgendados = eventos.filter(function (evento) {
        return evento.status === "Agendado";
    }).length;
    const eventosRealizados = eventos.filter(function (evento) {
        return evento.status === "Realizado";
    }).length;

    app.innerHTML = `
        <h1 class="h3 mb-4">Dashboard</h1>
        <div class="row g-3">
            <div class="col-md-4">
                <div class="card dashboard-card border-primary">
                    <div class="card-body">
                        <h2 class="h5 card-title">Total de eventos</h2>
                        <p class="display-5 mb-0">${totalEventos}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card dashboard-card border-warning">
                    <div class="card-body">
                        <h2 class="h5 card-title">Eventos agendados</h2>
                        <p class="display-5 mb-0">${eventosAgendados}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card dashboard-card border-success">
                    <div class="card-body">
                        <h2 class="h5 card-title">Eventos realizados</h2>
                        <p class="display-5 mb-0">${eventosRealizados}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function exibirNovoEvento() {
    app.innerHTML = `
        <h1 class="h3 mb-4">Novo Evento</h1>
        <div id="mensagem"></div>
        <form id="formEvento" class="card card-body">
            <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" required>
            </div>
            <div class="mb-3">
                <label for="tipo" class="form-label">Tipo</label>
                <select class="form-select" id="tipo" required>
                    <option value="">Selecione</option>
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Minicurso">Minicurso</option>
                    <option value="Visita Técnica">Visita Técnica</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" class="form-control" id="data" required>
            </div>
            <div class="mb-3">
                <label for="local" class="form-label">Local</label>
                <input type="text" class="form-control" id="local" required>
            </div>
            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea class="form-control" id="descricao" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary align-self-start">Cadastrar</button>
        </form>
    `;

    const formulario = document.getElementById("formEvento");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", function (eventoSubmit) {
        eventoSubmit.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const tipo = document.getElementById("tipo").value;
        const data = document.getElementById("data").value;
        const local = document.getElementById("local").value.trim();
        const descricao = document.getElementById("descricao").value;

        if (!titulo || !tipo || !data || !local || !descricao.trim()) {
            mensagem.innerHTML = '<div class="alert alert-danger">Preencha todos os campos obrigatórios.</div>';
            return;
        }

        const novoId = eventos.reduce(function (maiorId, evento) {
            return Math.max(maiorId, evento.id);
        }, 0) + 1;

        eventos.push({
            id: novoId,
            titulo: titulo,
            tipo: tipo,
            data: data,
            local: local,
            descricao: descricao,
            status: "Agendado"
        });

        formulario.reset();
        mensagem.innerHTML = '<div class="alert alert-success">Evento cadastrado com sucesso.</div>';
    });
}

function criarInformacao(rotulo, valor) {
    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");
    destaque.textContent = `${rotulo}: `;
    paragrafo.append(destaque, document.createTextNode(valor));
    return paragrafo;
}

function criarCardEvento(evento) {
    const coluna = document.createElement("div");
    coluna.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");
    card.className = "card event-card shadow-sm";

    const corpo = document.createElement("div");
    corpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h2");
    titulo.className = "h5 card-title";
    titulo.textContent = evento.titulo;

    const badges = document.createElement("div");
    badges.className = "mb-3 d-flex gap-2";

    const badgeTipo = document.createElement("span");
    badgeTipo.className = "badge text-bg-primary";
    badgeTipo.textContent = evento.tipo;

    const badgeStatus = document.createElement("span");
    badgeStatus.className = evento.status === "Agendado" ? "badge text-bg-warning" : "badge text-bg-success";
    badgeStatus.textContent = evento.status;

    const descricao = document.createElement("p");
    descricao.className = "card-text";
    descricao.textContent = evento.descricao;

    const acoes = document.createElement("div");
    acoes.className = "mt-auto d-flex gap-2 flex-wrap";

    if (evento.status === "Agendado") {
        const botaoRealizar = document.createElement("button");
        botaoRealizar.type = "button";
        botaoRealizar.className = "btn btn-success btn-sm";
        botaoRealizar.textContent = "Marcar como Realizado";
        botaoRealizar.addEventListener("click", function () {
            evento.status = "Realizado";
            aplicarFiltros();
        });
        acoes.appendChild(botaoRealizar);
    }

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "btn btn-danger btn-sm";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
        const indice = eventos.findIndex(function (item) {
            return item.id === evento.id;
        });
        eventos.splice(indice, 1);
        aplicarFiltros();
    });

    badges.append(badgeTipo, badgeStatus);
    acoes.appendChild(botaoExcluir);
    corpo.append(
        titulo,
        badges,
        criarInformacao("Data", evento.data),
        criarInformacao("Local", evento.local),
        descricao,
        acoes
    );
    card.appendChild(corpo);
    coluna.appendChild(card);
    return coluna;
}

function renderizarEventos(listaEventos) {
    const lista = document.getElementById("listaEventos");
    lista.innerHTML = "";

    if (listaEventos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "alert alert-info";
        mensagem.textContent = "Nenhum evento encontrado.";
        lista.appendChild(mensagem);
        return;
    }

    listaEventos.forEach(function (evento) {
        lista.appendChild(criarCardEvento(evento));
    });
}

function aplicarFiltros() {
    const pesquisa = document.getElementById("pesquisa").value.trim().toLowerCase();
    const status = document.getElementById("filtroStatus").value;
    const eventosFiltrados = eventos.filter(function (evento) {
        const tituloCorresponde = evento.titulo.toLowerCase().includes(pesquisa);
        const statusCorresponde = status === "Todos" || evento.status === status;
        return tituloCorresponde && statusCorresponde;
    });
    renderizarEventos(eventosFiltrados);
}

function exibirEventos() {
    app.innerHTML = `
        <h1 class="h3 mb-4">Eventos</h1>
        <div class="row g-3 mb-4">
            <div class="col-md-8">
                <label for="pesquisa" class="form-label">Pesquisar por título</label>
                <input type="text" class="form-control" id="pesquisa" placeholder="Digite o título do evento">
            </div>
            <div class="col-md-4">
                <label for="filtroStatus" class="form-label">Status</label>
                <select class="form-select" id="filtroStatus">
                    <option value="Todos">Todos</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Realizado">Realizado</option>
                </select>
            </div>
        </div>
        <div id="listaEventos" class="row g-3"></div>
    `;

    document.getElementById("pesquisa").addEventListener("input", aplicarFiltros);
    document.getElementById("filtroStatus").addEventListener("change", aplicarFiltros);
    renderizarEventos(eventos);
}

function exibirView(view) {
    atualizarLinkAtivo(view);

    if (view === "dashboard") {
        exibirDashboard();
    }

    if (view === "novo") {
        exibirNovoEvento();
    }

    if (view === "eventos") {
        exibirEventos();
    }
}

linksViews.forEach(function (link) {
    link.addEventListener("click", function (eventoClick) {
        eventoClick.preventDefault();
        exibirView(link.dataset.view);
    });
});

exibirView("dashboard");
