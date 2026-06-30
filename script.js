// Banco de dados dos mods (Adicione novos itens aqui)
const modsData = [
    {
        id: 1,
        title: "John Deere 8R Series",
        version: "FS25",
        description: "Trator potente de alta tecnologia com animações realistas e configurações de pneus para o FS25.",
        image: "https://via.placeholder.com/400x250", // Substitua pelo link da imagem do mod
        downloadUrl: "https://link-do-download.com/mod1"
    },
    {
        id: 2,
        title: "Colheitadeira Case IH Axial-Flow",
        version: "FS22",
        description: "Perfeita para grandes colheitas. Inclui suporte a GPS e customização de capacidade de grãos.",
        image: "https://via.placeholder.com/400x250", 
        downloadUrl: "https://link-do-download.com/mod2"
    },
    {
        id: 3,
        title: "Mapa Vale do Eco (Eco Valley)",
        version: "FS19",
        description: "Mapa baseado na região sul do Brasil, com relevo realista e mais de 40 campos compráveis.",
        image: "https://via.placeholder.com/400x250",
        downloadUrl: "https://link-do-download.com/mod3"
    },
    {
        id: 4,
        title: "Pack de Reboques Facchini",
        version: "FS17",
        description: "Vários modelos de reboques brasileiros para transporte de grãos e maquinários pesados.",
        image: "https://via.placeholder.com/400x250",
        downloadUrl: "https://link-do-download.com/mod4"
    },
    {
        id: 5,
        title: "Antigo Trator Massey Ferguson 290",
        version: "FS15",
        description: "Clássico das fazendas brasileiras trazido de volta à vida no Farming Simulator 15.",
        image: "https://via.placeholder.com/400x250",
        downloadUrl: "https://link-do-download.com/mod5"
    }
];

// Elementos do DOM
const modsGrid = document.getElementById('modsGrid');
const searchBar = document.getElementById('searchBar');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentVersion = 'all';
let searchQuery = '';

// Função para renderizar os cards na tela
function renderMods() {
    modsGrid.innerHTML = '';

    const filteredMods = modsData.filter(mod => {
        const matchesVersion = currentVersion === 'all' || mod.version === currentVersion;
        const matchesSearch = mod.title.toLowerCase().includes(searchQuery) || 
                              mod.description.toLowerCase().includes(searchQuery);
        return matchesVersion && matchesSearch;
    });

    if (filteredMods.length === 0) {
        modsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8b949e;">Nenhum mod ou DLC encontrado.</p>`;
        return;
    }

    filteredMods.forEach(mod => {
        const card = document.createElement('div');
        card.classList.add('mod-card');

        card.innerHTML = `
            <img src="${mod.image}" alt="${mod.title}" class="mod-image" loading="lazy">
            <div class="mod-info">
                <span class="mod-badge">${mod.version}</span>
                <h3 class="mod-title">${mod.title}</h3>
                <p class="mod-desc">${mod.description}</p>
                <a href="${mod.downloadUrl}" target="_blank" class="download-btn">Baixar Mod</a>
            </div>
        `;
        modsGrid.appendChild(card);
    });
}

// Evento de Busca (Search)
searchBar.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderMods();
});

// Evento de Filtros por Versão (Botões)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove classe ativa de todos e adiciona no clicado
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentVersion = btn.getAttribute('data-version');
        renderMods();
    });
});

// Inicialização Inicial
renderMods();