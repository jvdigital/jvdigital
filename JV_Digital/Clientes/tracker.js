// --- Initial Leads Database ---
const initialLeads = [
    {
        "id": 1,
        "name": "Restaurante O Fado",
        "sector": "Restaurante",
        "city": "Lisboa",
        "website": "Nenhum",
        "instagram": "@ofadolisboa",
        "problem": "Não tem website. Instagram muito ativo com pratos excelentes. Clientes não conseguem ver o menu fixado de forma limpa no telemóvel.",
        "contact": "geral@ofadolisboa.com",
        "status": "A contactar"
    },
    {
        "id": 2,
        "name": "Barbearia Imperial",
        "sector": "Barbearia",
        "city": "Porto",
        "website": "http://barbeariaimperial-old.pt",
        "instagram": "@barbearia_imperial",
        "problem": "Website antigo de 2018, não adaptado para telemóvel. Marcações feitas apenas por telefone ou DM lenta.",
        "contact": "912 888 777",
        "status": "A contactar"
    },
    {
        "id": 3,
        "name": "Café Central de Coimbra",
        "sector": "Café",
        "city": "Coimbra",
        "website": "Nenhum",
        "instagram": "@cafecentralcoimbra",
        "problem": "Sem website. Apenas página de Facebook desatualizada no Google. Excelente esplanada e menus de almoço que poderiam ser mostrados diariamente.",
        "contact": "geral@cafecentralcoimbra.pt",
        "status": "A contactar"
    },
    {
        "id": 4,
        "name": "Oficina AutoRápido",
        "sector": "Oficina",
        "city": "Braga",
        "website": "Nenhum",
        "instagram": "@autorapidobraga",
        "problem": "Falta de presença web estruturada. Google Maps com informações de horário incompletas e sem link para agendamentos.",
        "contact": "934 555 111",
        "status": "A contactar"
    },
    {
        "id": 5,
        "name": "Estética Magnólia",
        "sector": "Estética",
        "city": "Aveiro",
        "website": "Nenhum",
        "instagram": "@magnolia.estetica",
        "problem": "Dependência total do Instagram Direct para reservas de tratamentos. Perdem clientes pela demora na resposta às mensagens.",
        "contact": "magnolia.aveiro@email.com",
        "status": "A contactar"
    },
    {
        "id": 6,
        "name": "Ginásio FitLife",
        "sector": "Ginásio",
        "city": "Faro",
        "website": "http://fitlifefaro.pt",
        "instagram": "@fitlife_faro",
        "problem": "Site extremamente lento a carregar no telemóvel. Sem botão direto para iniciar conversa de WhatsApp com a receção.",
        "contact": "info@fitlifefaro.pt",
        "status": "A contactar"
    },
    {
        "id": 7,
        "name": "Restaurante Taberna do Zé",
        "sector": "Restaurante",
        "city": "Évora",
        "website": "Nenhum",
        "instagram": "@tabernadoze.evora",
        "problem": "Menu de almoço e vinhos disponibilizado apenas em PDF pesado no link do Instagram, difícil de descarregar e ler no ecrã do telemóvel.",
        "contact": "961 222 333",
        "status": "A contactar"
    },
    {
        "id": 8,
        "name": "Barbearia Vintage",
        "sector": "Barbearia",
        "city": "Guimarães",
        "website": "Nenhum",
        "instagram": "@barbeariavintage_guimaraes",
        "problem": "Agenda gerida manualmente num livro de papel. Sem opção de marcação online automática para libertar tempo de atendimento.",
        "contact": "911 345 999",
        "status": "A contactar"
    },
    {
        "id": 9,
        "name": "Oficina do Bairro",
        "sector": "Oficina",
        "city": "Setúbal",
        "website": "Nenhum",
        "instagram": "Nenhum",
        "problem": "Não tem website nem redes sociais. Tem apenas ficha no Google Maps, mas sem fotos nem descrição dos serviços especializados.",
        "contact": "265 999 123",
        "status": "A contactar"
    },
    {
        "id": 10,
        "name": "Café do Porto",
        "sector": "Café",
        "city": "Porto",
        "website": "Nenhum",
        "instagram": "@cafedoporto.baixa",
        "problem": "Negócio conceituado na zona histórica mas sem presença digital oficial além do TripAdvisor. Clientes têm dificuldade em encontrar menu de brunch.",
        "contact": "info@cafedoporto.pt",
        "status": "A contactar"
    },
    {
        "id": 11,
        "name": "Clínica Estética Bela",
        "sector": "Estética",
        "city": "Lisboa",
        "website": "Nenhum",
        "instagram": "@bela.estetica.clinica",
        "problem": "Tem Instagram excelente, mas sem site para detalhar os benefícios de cada tratamento avançado ou tabela de preços organizados.",
        "contact": "clinica.bela@gmail.com",
        "status": "A contactar"
    },
    {
        "id": 12,
        "name": "Ginásio IronPump",
        "sector": "Ginásio",
        "city": "Braga",
        "website": "Nenhum",
        "instagram": "@ironpump_braga",
        "problem": "Ginásio com boa comunidade mas sem site oficial para inscrições online, regulamento de mensalidades ou grelha de aulas de grupo.",
        "contact": "921 777 222",
        "status": "A contactar"
    },
    {
        "id": 13,
        "name": "Restaurante Pizzaria Bella",
        "sector": "Restaurante",
        "city": "Aveiro",
        "website": "Nenhum",
        "instagram": "@pizzariabella.aveiro",
        "problem": "Sem site de menu digital rápido. Partilham fotos desfocadas da ementa física nas 'histórias' do Instagram.",
        "contact": "pizzariabella@hotmail.com",
        "status": "A contactar"
    },
    {
        "id": 14,
        "name": "Barbearia Moderno",
        "sector": "Barbearia",
        "city": "Coimbra",
        "website": "Nenhum",
        "instagram": "@barbeariamoderno_coimbra",
        "problem": "Falta de agendamento online automático. Agenda cheia de falhas por chamadas não atendidas durante os cortes de cabelo.",
        "contact": "967 444 888",
        "status": "A contactar"
    },
    {
        "id": 15,
        "name": "Oficina TecnicCar",
        "sector": "Oficina",
        "city": "Faro",
        "website": "Nenhum",
        "instagram": "Nenhum",
        "problem": "Oficina tradicional bem avaliada no Maps mas sem site para detalhar serviços especializados de eletrónica e mecânica.",
        "contact": "289 123 456",
        "status": "A contactar"
    },
    {
        "id": 16,
        "name": "Pastelaria Doce Aroma",
        "sector": "Café",
        "city": "Leiria",
        "website": "Nenhum",
        "instagram": "@docearoma.leiria",
        "problem": "Sem site próprio. Aceitam encomendas de bolos de aniversário apenas por chamada ou DM, originando muitos mal-entendidos.",
        "contact": "docearoma.leiria@outlook.com",
        "status": "A contactar"
    },
    {
        "id": 17,
        "name": "Clínica Dentária Sorriso",
        "sector": "Estética",
        "city": "Viseu",
        "website": "http://clinicasorrisoviseu.pt",
        "instagram": "@clinicasorriso_viseu",
        "problem": "Website antigo que não funciona bem no ecrã de telemóveis (não é responsivo). Formulário de contacto dá erro ao enviar.",
        "contact": "geral@clinicasorrisoviseu.pt",
        "status": "A contactar"
    },
    {
        "id": 18,
        "name": "Churrasqueira Nova",
        "sector": "Restaurante",
        "city": "Bragança",
        "website": "Nenhum",
        "instagram": "@churrasqueiranova",
        "problem": "Takeaway local muito forte que necessita de um menu simples para telemóvel e botão de chamada rápida direta no ecrã principal.",
        "contact": "933 111 888",
        "status": "A contactar"
    },
    {
        "id": 19,
        "name": "Barbearia D. João",
        "sector": "Barbearia",
        "city": "Lisboa",
        "website": "Nenhum",
        "instagram": "@barbeariadjoao",
        "problem": "Falta de automatização. Utilizam um link genérico que direciona para um chat de WhatsApp caótico para fazer agendamentos.",
        "contact": "918 333 444",
        "status": "A contactar"
    },
    {
        "id": 20,
        "name": "Stand AutoNorte",
        "sector": "Oficina",
        "city": "Porto",
        "website": "http://autonorte-stand-old.pt",
        "instagram": "@autonorte_stand",
        "problem": "Site desatualizado onde os clientes não conseguem pesquisar carros disponíveis de forma intuitiva no telemóvel.",
        "contact": "info@autonorte.pt",
        "status": "A contactar"
    },
    {
        "id": 21,
        "name": "Ginásio TargetFit",
        "sector": "Ginásio",
        "city": "Aveiro",
        "website": "Nenhum",
        "instagram": "@targetfit_aveiro",
        "problem": "Sem website oficial. Apenas partilham fotos do espaço no Instagram. Necessitam de um portal simples para novos sócios.",
        "contact": "geral@targetfit.pt",
        "status": "A contactar"
    },
    {
        "id": 22,
        "name": "Studio Chic Cabeleireiros",
        "sector": "Estética",
        "city": "Porto",
        "website": "Nenhum",
        "instagram": "@studiochic_porto",
        "problem": "Cabeleireiro com agenda concorrida mas sem site próprio. Clientes ligam várias vezes durante o dia interrompendo o trabalho.",
        "contact": "922 456 789",
        "status": "A contactar"
    },
    {
        "id": 23,
        "name": "Restaurante O Lagar",
        "sector": "Restaurante",
        "city": "Santarém",
        "website": "Nenhum",
        "instagram": "@olagar.santarem",
        "problem": "Restaurante tradicional excelente sem presença online oficial. Perda de turistas que procuram sítios para comer no Google.",
        "contact": "info@olagarsantarem.pt",
        "status": "A contactar"
    },
    {
        "id": 24,
        "name": "PetShop Patinhas",
        "sector": "Loja",
        "city": "Braga",
        "website": "Nenhum",
        "instagram": "@petshoppatinhas.braga",
        "problem": "Sem site institucional. Donos de animais querem agendar banhos e tosquias e têm de ligar ou enviar mensagens no Instagram.",
        "contact": "936 999 888",
        "status": "A contactar"
    },
    {
        "id": 25,
        "name": "Garrafeira Regional",
        "sector": "Loja",
        "city": "Coimbra",
        "website": "Nenhum",
        "instagram": "@garrafeira.coimbra",
        "problem": "Falta de catálogo digital de vinhos. Clientes não sabem que stock de vinhos especiais e edições limitadas estão disponíveis.",
        "contact": "geral@garrafeiracoimbra.pt",
        "status": "A contactar"
    },
    {
        "id": 26,
        "name": "Hamburgueria Craft",
        "sector": "Restaurante",
        "city": "Lisboa",
        "website": "http://hamburgueriacraft.slow",
        "instagram": "@hamburgueria_craft_lisboa",
        "problem": "Site antigo extremamente lento que não é otimizado para o SEO local do Google, fazendo-os perder visibilidade face aos rivais.",
        "contact": "geral@hamburgueriacraft.pt",
        "status": "A contactar"
    },
    {
        "id": 27,
        "name": "Barbearia Classic",
        "sector": "Barbearia",
        "city": "Braga",
        "website": "Nenhum",
        "instagram": "@barbeariaclassic.braga",
        "problem": "Sem presença web estruturada para reservas rápidas. Elevada taxa de no-show por falta de SMS de aviso ou marcação formal.",
        "contact": "919 777 555",
        "status": "A contactar"
    },
    {
        "id": 28,
        "name": "Oficina Multimarcas",
        "sector": "Oficina",
        "city": "Viseu",
        "website": "Nenhum",
        "instagram": "Nenhum",
        "problem": "Sem site de apresentação de serviços. Clientes não conseguem pedir orçamentos rápidos de peças de forma digital.",
        "contact": "232 444 555",
        "status": "A contactar"
    },
    {
        "id": 29,
        "name": "Spa & Relax Cascais",
        "sector": "Estética",
        "city": "Cascais",
        "website": "http://sparelaxcascais-flash.pt",
        "instagram": "@sparelax_cascais",
        "problem": "Website antigo desenhado com tecnologia obsoleta que não abre corretamente no Chrome/Safari em telemóveis.",
        "contact": "reservas@sparelaxcascais.pt",
        "status": "A contactar"
    },
    {
        "id": 30,
        "name": "Padaria Alentejana",
        "sector": "Café",
        "city": "Évora",
        "website": "Nenhum",
        "instagram": "@padaria.alentejana",
        "problem": "Sem catálogo digital para encomendas de pão regional e bolos típicos. Processo por chamada manual ineficiente.",
        "contact": "padariaalentejana@gmail.com",
        "status": "A contactar"
    }
];

// Load from LocalStorage or use initial data
let leads = JSON.parse(localStorage.getItem('jv_leads')) || initialLeads;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Populate City Filter Dynamically ---
    const filterCitySelect = document.getElementById('filterCity');
    const uniqueCities = [...new Set(leads.map(lead => lead.city))].sort();
    
    uniqueCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        filterCitySelect.appendChild(option);
    });

    // --- Render Initial Table and Stats ---
    renderTable();
    updateStats();

    // --- Filter Event Listeners ---
    document.getElementById('searchInput').addEventListener('input', renderTable);
    document.getElementById('filterSector').addEventListener('change', renderTable);
    document.getElementById('filterCity').addEventListener('change', renderTable);
    document.getElementById('filterStatus').addEventListener('change', renderTable);

    // --- Modal Closing Event Listeners ---
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('btnCancelModal').addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('scriptModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Modal copy action
    document.getElementById('btnCopyScriptModal').addEventListener('click', () => {
        const scriptContent = document.getElementById('modalScriptContent').textContent;
        copyToClipboard(scriptContent);
        closeModal();
    });
});

// --- Render Leads Table ---
function renderTable() {
    const tableBody = document.getElementById('leadsTableBody');
    const noResults = document.getElementById('noResults');
    
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const sectorVal = document.getElementById('filterSector').value;
    const cityVal = document.getElementById('filterCity').value;
    const statusVal = document.getElementById('filterStatus').value;

    tableBody.innerHTML = '';

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchVal);
        const matchesSector = sectorVal === 'all' || lead.sector === sectorVal;
        const matchesCity = cityVal === 'all' || lead.city === cityVal;
        const matchesStatus = statusVal === 'all' || lead.status === statusVal;

        return matchesSearch && matchesSector && matchesCity && matchesStatus;
    });

    if (filteredLeads.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        filteredLeads.forEach(lead => {
            const tr = document.createElement('tr');
            
            // Get correct CSS class for status pill
            let statusClass = 'status-todo';
            if (lead.status === 'Contactado') statusClass = 'status-contacted';
            if (lead.status === 'Respondeu') statusClass = 'status-replied';
            if (lead.status === 'Fechado (Ganho)') statusClass = 'status-won';
            if (lead.status === 'Rejeitado') statusClass = 'status-rejected';

            tr.innerHTML = `
                <td>
                    <strong>${lead.name}</strong>
                    <span class="meta"><i class="fa-solid fa-envelope"></i> ${lead.contact}</span>
                </td>
                <td><span class="status-pill status-won">${lead.sector}</span></td>
                <td>${lead.city}</td>
                <td><a href="https://instagram.com" target="_blank" style="color: #3b82f6; font-weight: 500;"><i class="fa-brands fa-instagram"></i> ${lead.instagram}</a></td>
                <td><div class="problem-text">${lead.problem}</div></td>
                <td>
                    <select class="table-status-select" data-id="${lead.id}" onchange="updateLeadStatus(this)">
                        <option value="A contactar" ${lead.status === 'A contactar' ? 'selected' : ''}>A contactar</option>
                        <option value="Contactado" ${lead.status === 'Contactado' ? 'selected' : ''}>Contactado</option>
                        <option value="Respondeu" ${lead.status === 'Respondeu' ? 'selected' : ''}>Respondeu</option>
                        <option value="Fechado (Ganho)" ${lead.status === 'Fechado (Ganho)' ? 'selected' : ''}>Fechado (Ganho)</option>
                        <option value="Rejeitado" ${lead.status === 'Rejeitado' ? 'selected' : ''}>Rejeitado</option>
                    </select>
                </td>
                <td class="action-cell">
                    <button class="btn btn-secondary btn-small" onclick="openScriptModal(${lead.id})">
                        <i class="fa-solid fa-message"></i> Ver Guião
                    </button>
                </td>
            `;
            
            tableBody.appendChild(tr);
        });
    }
}

// --- Recalculate Dashboard Stats ---
function updateStats() {
    const total = leads.length;
    const todo = leads.filter(l => l.status === 'A contactar').length;
    const contacted = leads.filter(l => l.status === 'Contactado').length;
    
    // Won covers Respondeu + Fechado (Ganho)
    const won = leads.filter(l => l.status === 'Respondeu' || l.status === 'Fechado (Ganho)').length;

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statTodo').textContent = todo;
    document.getElementById('statContacted').textContent = contacted;
    document.getElementById('statWon').textContent = won;
}

// --- Update Status in local array and storage ---
window.updateLeadStatus = function(selectElement) {
    const id = parseInt(selectElement.getAttribute('data-id'));
    const newStatus = selectElement.value;

    leads = leads.map(lead => {
        if (lead.id === id) {
            return { ...lead, status: newStatus };
        }
        return lead;
    });

    // Save to LocalStorage
    localStorage.setItem('jv_leads', JSON.stringify(leads));
    
    // Refresh
    updateStats();
    renderTable();
};

// --- Show copy toast notification ---
function showToast() {
    const toast = document.getElementById('copyToast');
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}

// --- Copy content to system clipboard ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast();
    }).catch(err => {
        console.error('Erro ao copiar para clipboard: ', err);
    });
}

// --- Generate custom template copy based on lead sector ---
window.openScriptModal = function(id) {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    let scriptText = '';

    if (lead.sector === 'Restaurante') {
        scriptText = `Olá, equipa do ${lead.name}! Estive a ver a vossa página e os vossos pratos têm um aspeto incrível, especialmente as fotos no vosso Instagram ${lead.instagram}. 🍕\n\nReparei que atualmente não têm um website onde os clientes possam consultar o vosso menu completo, horários e fazer reservas facilmente direto pelo telemóvel.\n\nSou o João da JV Digital e ajudo negócios locais a criarem websites modernos e rápidos.\n\nGostaria de vos mostrar, sem qualquer tipo de compromisso, uma ideia simples de como o vosso menu e contactos poderiam ficar integrados num site responsivo para telemóvel.\n\nFaria sentido dar uma vista de olhos na proposta visual gratuita?\n\nObrigado e votos de muito sucesso!`;
    } else if (lead.sector === 'Barbearia') {
        scriptText = `Olá, equipa da ${lead.name}! Tudo bem? Tenho acompanhado os vossos cortes e o vosso espaço no Instagram ${lead.instagram} tem muito estilo. 💈\n\nReparei que para fazer marcações de corte ou barba os clientes têm de enviar mensagem privada ou ligar diretamente.\n\nSou o João da JV Digital e desenvolvo websites modernos para negócios locais, incluindo sistemas inteligentes de marcação online onde o cliente pode escolher o serviço, o barbeiro preferido e o horário de forma automática pelo telemóvel.\n\nPosso preparar uma demonstração rápida de como seria o vosso site com essa funcionalidade de marcações, de forma gratuita e sem qualquer compromisso. Faria sentido ver essa ideia?\n\nUm abraço e bom trabalho!`;
    } else {
        scriptText = `Olá! Estive a acompanhar o vosso trabalho aqui no Instagram ${lead.instagram} e parabéns pelo serviço de excelência que oferecem em ${lead.city}. 👍\n\nReparei que quando as pessoas vos procuram na internet, não encontram um site oficial com os vossos serviços, horários e contactos organizados de forma moderna.\n\nEu sou estudante de TPSI (Tecnologias de Informação) e crio websites simples, rápidos e adaptados ao telemóvel para negócios na nossa região.\n\nPosso criar um modelo conceitual do vosso site (uma página simples para mostrar como ficaria) sem cobrar nada por isso e sem compromisso. Se gostarem, podemos falar; se não, ficam com uma ideia visual gratuita do potencial digital do vosso negócio.\n\nO que acham da ideia?\n\nObrigado!`;
    }

    document.getElementById('modalBusinessName').textContent = lead.name;
    document.getElementById('modalScriptContent').textContent = scriptText;

    const modal = document.getElementById('scriptModal');
    modal.classList.remove('hidden');
};

function closeModal() {
    const modal = document.getElementById('scriptModal');
    modal.classList.add('hidden');
}
