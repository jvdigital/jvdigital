// --- Mock database seeds ---
const defaultVehicles = [
    {
        id: 1,
        ownerName: "Carlos Oliveira",
        ownerPhone: "912 345 678",
        plate: "45-DF-92",
        brand: "Audi",
        model: "A3 Sportback",
        year: 2015,
        fuel: "Diesel",
        tech: "Vasco Costa",
        faultDesc: "Embraiagem a patinar ao subir rotações, pedal muito rijo.",
        entryDate: "29/05/2026",
        status: "A Reparar",
        diagnosis: "Kit de embraiagem totalmente gasto. Necessário substituição do prato, disco e rolamento de encosto.",
        parts: [
            { name: "Kit Embraiagem Sachs", price: 155.00 },
            { name: "Valvulina Caixa Velocidades", price: 22.50 }
        ],
        labor: 85.00,
        deliveredDate: null
    },
    {
        id: 2,
        ownerName: "Ana Santos",
        ownerPhone: "934 999 123",
        plate: "AA-78-AA",
        brand: "BMW",
        model: "320d Coupe",
        year: 2012,
        fuel: "Diesel",
        tech: "Daniel Mota",
        faultDesc: "Fumo branco constante pelo escape, perda ligeira de potência.",
        entryDate: "30/05/2026",
        status: "Em Diagnóstico",
        diagnosis: "",
        parts: [],
        labor: 0.00,
        deliveredDate: null
    },
    {
        id: 3,
        ownerName: "Miguel Sousa",
        ownerPhone: "961 444 888",
        plate: "92-ZS-12",
        brand: "Renault",
        model: "Clio 1.2",
        year: 2017,
        fuel: "Gasolina",
        tech: "Afonso Silva",
        faultDesc: "Ruído estranho de pancada seca na suspensão dianteira esquerda ao passar em buracos.",
        entryDate: "28/05/2026",
        status: "Pronto",
        diagnosis: "Amortecedor esquerdo com fuga grave de óleo. Substituição dos amortecedores dianteiros por segurança.",
        parts: [
            { name: "Par Amortecedores Dianteiros Monroe", price: 110.00 },
            { name: "Alinhamento Direção 3D", price: 25.00 }
        ],
        labor: 45.00,
        deliveredDate: null
    },
    {
        id: 4,
        ownerName: "Rui Ferreira",
        ownerPhone: "918 333 444",
        plate: "10-XT-85",
        brand: "Mercedes-Benz",
        model: "C220 CDI",
        year: 2016,
        fuel: "Diesel",
        tech: "Vasco Costa",
        faultDesc: "Revisão periódica anual (Troca óleo e filtros).",
        entryDate: "10/05/2026",
        status: "Entregue",
        diagnosis: "Efetuada mudança de óleo e filtros recomendados pela marca. Verificado nível de travões.",
        parts: [
            { name: "Filtro Óleo Bosch", price: 12.50 },
            { name: "Filtro de Ar Bosch", price: 18.00 },
            { name: "Óleo Castrol Edge 5W30 5L", price: 55.00 }
        ],
        labor: 35.00,
        deliveredDate: "11/05/2026"
    }
];

// --- Load Database ---
let vehicles = JSON.parse(localStorage.getItem('oficina_vehicles')) || defaultVehicles;

// Active Selected Vehicle State inside modal
let activeVehicleId = null;
let modalTemporaryParts = [];

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Date Display
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
        const today = new Date();
        dateDisplay.textContent = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    }

    // --- Tab Switching Logic ---
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.getAttribute('data-tab');
            
            // Toggle active menu class
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');

            // Toggle active tab content
            tabContents.forEach(tab => {
                if (tab.id === `tab-${tabName}`) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Trigger specific actions on tab open
            if (tabName === 'dashboard') {
                updateDashboard();
            } else if (tabName === 'trabalho') {
                renderWorkTable();
            } else if (tabName === 'historico') {
                renderHistoryTable();
            }
        });
    });

    // --- Form Check-In Handler ---
    const checkInForm = document.getElementById('checkInForm');
    if (checkInForm) {
        checkInForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const ownerName = document.getElementById('owner_name').value;
            const ownerPhone = document.getElementById('owner_phone').value;
            const plate = document.getElementById('veh_plate').value.toUpperCase();
            const brand = document.getElementById('veh_brand').value;
            const model = document.getElementById('veh_model').value;
            const year = parseInt(document.getElementById('veh_year').value) || null;
            const fuel = document.getElementById('veh_fuel').value;
            const tech = document.getElementById('veh_tech').value;
            const faultDesc = document.getElementById('veh_fault').value;

            // Date entry formatting (DD/MM/AAAA)
            const today = new Date();
            const entryDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

            // Create object
            const newVehicle = {
                id: Date.now(), // Unique ID
                ownerName,
                ownerPhone,
                plate,
                brand,
                model,
                year,
                fuel,
                tech,
                faultDesc,
                entryDate,
                status: "Em Diagnóstico",
                diagnosis: "",
                parts: [],
                labor: 0.00,
                deliveredDate: null
            };

            // Save to database
            vehicles.push(newVehicle);
            saveData();

            // Reset and redirect
            checkInForm.reset();
            showToast("Veículo registado com sucesso!");

            // Switch to Trabalho list
            document.querySelector('[data-tab="trabalho"]').click();
        });
    }

    // --- Search handlers ---
    const globalSearch = document.getElementById('globalSearchInput');
    if (globalSearch) {
        globalSearch.addEventListener('input', () => {
            // Trigger table render depending on which tab is active
            const activeTab = document.querySelector('.tab-content.active').id;
            if (activeTab === 'tab-trabalho') {
                renderWorkTable();
            } else if (activeTab === 'tab-historico') {
                renderHistoryTable();
            }
        });
    }

    document.getElementById('filterWorkStatus').addEventListener('change', renderWorkTable);
    document.getElementById('filterWorkTech').addEventListener('change', renderWorkTable);

    // --- Modal events ---
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('btnCancelModalDetails').addEventListener('click', closeModal);
    document.getElementById('btnBackToDetails').addEventListener('click', () => switchModalSubTab('reparar'));
    
    // Delete vehicle logic
    document.getElementById('btnDeleteVehicle').addEventListener('click', () => {
        if (!activeVehicleId) return;

        if (confirm("Tem a certeza de que deseja eliminar definitivamente esta viatura da base de dados? Esta ação não pode ser desfeita e irá remover os seus dados de todos os painéis e faturas.")) {
            vehicles = vehicles.filter(v => v.id !== activeVehicleId);
            saveData();
            closeModal();
            showToast("Viatura eliminada com sucesso!");

            // Refresh UI
            updateDashboard();
            renderWorkTable();
            renderHistoryTable();
        }
    });
    
    // Modal tabs toggle
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-modaltab');
            switchModalSubTab(tabName);
        });
    });

    // Add part handler inside modal
    document.getElementById('btnAddPart').addEventListener('click', () => {
        const nameInput = document.getElementById('partNameInput');
        const priceInput = document.getElementById('partPriceInput');

        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value);

        if (!name || isNaN(price) || price <= 0) {
            alert("Por favor, introduza o nome da peça e um preço válido.");
            return;
        }

        modalTemporaryParts.push({ name, price });
        nameInput.value = '';
        priceInput.value = '';

        renderModalPartsList();
        calculateModalPrices();
    });

    // Labor cost change live calculator listener
    document.getElementById('modalLaborInput').addEventListener('input', calculateModalPrices);

    // Save Details
    document.getElementById('btnSaveModalDetails').addEventListener('click', saveModalDetails);

    // Print invoice action
    document.getElementById('btnPrintInvoice').addEventListener('click', () => {
        window.print();
    });

    // Deliver vehicle action
    document.getElementById('btnDeliverVehicle').addEventListener('click', deliverVehicle);

    // --- Initialize App ---
    updateDashboard();
});

// --- Save Data ---
function saveData() {
    localStorage.setItem('oficina_vehicles', JSON.stringify(vehicles));
}

// --- Display notification toast ---
function showToast(message) {
    const toast = document.getElementById('actionToast');
    const msgSpan = document.getElementById('toastMessage');
    if (toast && msgSpan) {
        msgSpan.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }
}

// --- Update Stats, lists and tech load in Dashboard ---
function updateDashboard() {
    const statDiag = document.getElementById('stat-diagnostico');
    const statRep = document.getElementById('stat-reparacao');
    const statPro = document.getElementById('stat-pronto');
    const statEnt = document.getElementById('stat-entregue');

    // Counts
    const diagCount = vehicles.filter(v => v.status === 'Em Diagnóstico').length;
    const repCount = vehicles.filter(v => v.status === 'A Reparar' || v.status === 'Aguardar Peças').length;
    const proCount = vehicles.filter(v => v.status === 'Pronto').length;
    const entCount = vehicles.filter(v => v.status === 'Entregue').length;

    statDiag.textContent = diagCount;
    statRep.textContent = repCount;
    statPro.textContent = proCount;
    statEnt.textContent = entCount;

    // Tech loads
    // Max capacity per technician for bar visualization is 5 active vehicles
    const maxCapacity = 5;
    const techs = ["Afonso Silva", "Vasco Costa", "Daniel Mota"];
    
    techs.forEach(tech => {
        const activeCount = vehicles.filter(v => v.tech === tech && v.status !== 'Entregue').length;
        const nameId = tech.split(' ')[0].toLowerCase(); // "afonso", "vasco", "daniel"
        
        const countSpan = document.getElementById(`load-${nameId}`);
        const loadBar = document.getElementById(`load-bar-${nameId}`);
        
        if (countSpan && loadBar) {
            countSpan.textContent = `${activeCount} ${activeCount === 1 ? 'viatura' : 'viaturas'} ativa`;
            const percentage = Math.min((activeCount / maxCapacity) * 100, 100);
            loadBar.style.width = `${percentage}%`;
        }
    });

    // Recent Vehicles (last 5 added)
    const recentBody = document.getElementById('recentVehiclesBody');
    if (recentBody) {
        recentBody.innerHTML = '';
        
        // Sort vehicles by id descending
        const sorted = [...vehicles].sort((a, b) => b.id - a.id).slice(0, 5);
        
        sorted.forEach(v => {
            const tr = document.createElement('tr');
            
            let statusPillClass = 'status-diagnostic';
            if (v.status === 'A Reparar' || v.status === 'Aguardar Peças') statusPillClass = 'status-repair';
            if (v.status === 'Pronto') statusPillClass = 'status-ready';
            if (v.status === 'Entregue') statusPillClass = 'status-delivered';

            tr.innerHTML = `
                <td><strong style="font-family: var(--font-mono); color: var(--primary);">${v.plate}</strong></td>
                <td>${v.brand} ${v.model}</td>
                <td><span class="status-pill ${statusPillClass}">${v.status}</span></td>
                <td>${v.entryDate}</td>
            `;
            recentBody.appendChild(tr);
        });
    }
}

// --- Render active work queue table ---
function renderWorkTable() {
    const tbody = document.getElementById('workTableBody');
    const noResults = document.getElementById('workNoResults');
    if (!tbody) return;

    tbody.innerHTML = '';

    const searchVal = document.getElementById('globalSearchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterWorkStatus').value;
    const techFilter = document.getElementById('filterWorkTech').value;

    const filtered = vehicles.filter(v => {
        // Exclude delivered
        if (v.status === 'Entregue') return false;

        const matchesSearch = v.plate.toLowerCase().includes(searchVal) || v.ownerName.toLowerCase().includes(searchVal);
        
        let matchesStatus = true;
        if (statusFilter !== 'all' && statusFilter !== 'active') {
            matchesStatus = v.status === statusFilter;
        }

        const matchesTech = techFilter === 'all' || v.tech === techFilter;

        return matchesSearch && matchesStatus && matchesTech;
    });

    if (filtered.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        filtered.forEach(v => {
            const tr = document.createElement('tr');
            
            let statusPillClass = 'status-diagnostic';
            if (v.status === 'Aguardar Peças') statusPillClass = 'status-waiting';
            if (v.status === 'A Reparar') statusPillClass = 'status-repair';
            if (v.status === 'Pronto') statusPillClass = 'status-ready';

            tr.innerHTML = `
                <td><strong style="font-family: var(--font-mono); color: var(--primary); font-size: 0.95rem;">${v.plate}</strong></td>
                <td><strong>${v.brand} ${v.model}</strong><span style="display: block; font-size: 0.75rem; color: var(--text-muted);">${v.fuel} | ${v.year || '--'}</span></td>
                <td>${v.ownerName}</td>
                <td><i class="fa-solid fa-user-gear" style="font-size: 0.8rem; color: var(--primary); margin-right: 5px;"></i> ${v.tech}</td>
                <td>${v.entryDate}</td>
                <td><span class="status-pill ${statusPillClass}">${v.status}</span></td>
                <td class="text-center">
                    <button class="btn btn-secondary btn-small" onclick="openVehicleDetails(${v.id})">
                        <i class="fa-solid fa-sliders"></i> Gerir
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// --- Render archived history table ---
function renderHistoryTable() {
    const tbody = document.getElementById('historyTableBody');
    const noResults = document.getElementById('historyNoResults');
    if (!tbody) return;

    tbody.innerHTML = '';

    const searchVal = document.getElementById('globalSearchInput').value.toLowerCase();

    const filtered = vehicles.filter(v => {
        // Only delivered
        if (v.status !== 'Entregue') return false;

        return v.plate.toLowerCase().includes(searchVal) || v.ownerName.toLowerCase().includes(searchVal);
    });

    if (filtered.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        filtered.forEach(v => {
            const tr = document.createElement('tr');
            
            // Calculate total price faturado
            const partsTotal = v.parts.reduce((sum, item) => sum + item.price, 0);
            const totalInvoice = (partsTotal + v.labor) * 1.23;

            tr.innerHTML = `
                <td><strong style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.95rem;">${v.plate}</strong></td>
                <td><strong>${v.brand} ${v.model}</strong></td>
                <td>${v.ownerName}</td>
                <td>${v.tech}</td>
                <td>${v.deliveredDate || '--'}</td>
                <td><strong style="color: var(--green);">${totalInvoice.toFixed(2)}€</strong> <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 500;">(c/ IVA)</span></td>
                <td class="text-center">
                    <button class="btn btn-secondary btn-small" onclick="openVehicleDetails(${v.id})">
                        <i class="fa-solid fa-file-invoice-dollar"></i> Fatura
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// --- Open details modal ---
window.openVehicleDetails = function(id) {
    const v = vehicles.find(item => item.id === id);
    if (!v) return;

    activeVehicleId = id;
    
    // Load metadata
    document.getElementById('modalPlate').textContent = v.plate;
    document.getElementById('md-owner').textContent = `${v.ownerName} (${v.ownerPhone})`;
    document.getElementById('md-vehicle').textContent = `${v.brand} ${v.model} ${v.year ? v.year : ''} [${v.fuel}]`;
    document.getElementById('md-tech').textContent = v.tech;
    document.getElementById('md-fault').textContent = v.faultDesc;

    // Load Form values
    document.getElementById('modalStatusSelect').value = v.status;
    document.getElementById('modalDiagnosisNote').value = v.diagnosis;
    document.getElementById('modalLaborInput').value = v.labor.toFixed(2);

    // Make local copy of parts
    modalTemporaryParts = [...v.parts];
    renderModalPartsList();
    calculateModalPrices();

    // Default modal tab
    switchModalSubTab(v.status === 'Entregue' ? 'faturar' : 'reparar');

    // Show/Hide deliver button or delivered banner based on status
    const deliverBtn = document.getElementById('btnDeliverVehicle');
    const deliveredBanner = document.getElementById('deliveredBanner');
    const headerTabs = document.querySelector('.modal-tabs');
    const statusSelect = document.getElementById('modalStatusSelect');
    const diagNote = document.getElementById('modalDiagnosisNote');
    const laborInput = document.getElementById('modalLaborInput');
    const addPartBlock = document.querySelector('.add-part-form');
    const btnSave = document.getElementById('btnSaveModalDetails');

    if (v.status === 'Entregue') {
        deliverBtn.classList.add('hidden');
        deliveredBanner.classList.remove('hidden');
        headerTabs.classList.add('hidden');
        
        // Disable editing inputs
        statusSelect.disabled = true;
        diagNote.disabled = true;
        laborInput.disabled = true;
        addPartBlock.classList.add('hidden');
        btnSave.classList.add('hidden');
    } else {
        deliverBtn.classList.remove('hidden');
        deliveredBanner.classList.add('hidden');
        headerTabs.classList.remove('hidden');
        
        // Enable editing inputs
        statusSelect.disabled = false;
        diagNote.disabled = false;
        laborInput.disabled = false;
        addPartBlock.classList.remove('hidden');
        btnSave.classList.remove('hidden');
    }

    // Populate Invoice Sheet details
    populateInvoiceSheet(v);

    // Show modal
    document.getElementById('vehicleModal').classList.remove('hidden');
};

function closeModal() {
    document.getElementById('vehicleModal').classList.add('hidden');
    activeVehicleId = null;
}

// --- Toggle Modal Sub-Tabs ---
function switchModalSubTab(tabName) {
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const tabReparar = document.getElementById('modal-tab-reparar');
    const tabFaturar = document.getElementById('modal-tab-faturar');

    modalTabBtns.forEach(btn => {
        if (btn.getAttribute('data-modaltab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tabName === 'reparar') {
        tabReparar.className = 'modal-subtabactive';
        tabFaturar.className = 'modal-subtabhidden';
    } else {
        // Regerar a fatura antes de mudar para garantir dados atualizados
        const v = vehicles.find(item => item.id === activeVehicleId);
        if (v) {
            // Se ainda não está no histórico, aplicamos os valores do modal temporário para visualização da fatura
            const previewVehicle = {
                ...v,
                status: document.getElementById('modalStatusSelect').value,
                diagnosis: document.getElementById('modalDiagnosisNote').value,
                parts: modalTemporaryParts,
                labor: parseFloat(document.getElementById('modalLaborInput').value) || 0.00
            };
            populateInvoiceSheet(previewVehicle);
        }
        
        tabReparar.className = 'modal-subtabhidden';
        tabFaturar.className = 'modal-subtabactive';
    }
}

// --- Render list of parts in modal ---
function renderModalPartsList() {
    const listUl = document.getElementById('modalPartsList');
    if (!listUl) return;

    listUl.innerHTML = '';
    
    // Check if editing is allowed (vehicle not delivered)
    const v = vehicles.find(item => item.id === activeVehicleId);
    const isReadOnly = v && v.status === 'Entregue';

    modalTemporaryParts.forEach((part, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${part.name}</span>
            <div>
                <span class="price-val">${part.price.toFixed(2)}€</span>
                ${!isReadOnly ? `<button type="button" class="delete-part-btn" onclick="removeModalPart(${index})"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
        `;
        listUl.appendChild(li);
    });

    if (modalTemporaryParts.length === 0) {
        listUl.innerHTML = '<li style="color: var(--text-muted); font-style: italic;">Nenhuma peça adicionada.</li>';
    }
}

window.removeModalPart = function(index) {
    modalTemporaryParts.splice(index, 1);
    renderModalPartsList();
    calculateModalPrices();
};

// --- Calculate running cost total in modal ---
function calculateModalPrices() {
    const labor = parseFloat(document.getElementById('modalLaborInput').value) || 0;
    const partsTotal = modalTemporaryParts.reduce((sum, item) => sum + item.price, 0);
    const total = labor + partsTotal;

    document.getElementById('modalTotalRunningPrice').textContent = `${total.toFixed(2)}€`;
}

// --- Save changes from Modal details back to DB ---
function saveModalDetails() {
    if (!activeVehicleId) return;

    const status = document.getElementById('modalStatusSelect').value;
    const diagnosis = document.getElementById('modalDiagnosisNote').value;
    const labor = parseFloat(document.getElementById('modalLaborInput').value) || 0.00;

    vehicles = vehicles.map(v => {
        if (v.id === activeVehicleId) {
            return {
                ...v,
                status,
                diagnosis,
                parts: [...modalTemporaryParts],
                labor
            };
        }
        return v;
    });

    saveData();
    closeModal();
    showToast("Alterações guardadas com sucesso!");
    
    // Refresh UI
    updateDashboard();
    renderWorkTable();
    renderHistoryTable();
}

// --- Populate Invoice Sheet data ---
function populateInvoiceSheet(vehicle) {
    document.getElementById('inv-number').textContent = `OF-2026/00${vehicle.id.toString().slice(-3)}`;
    
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    document.getElementById('inv-date').textContent = vehicle.deliveredDate || formattedDate;
    
    document.getElementById('inv-plate').textContent = vehicle.plate;
    document.getElementById('inv-client-name').textContent = vehicle.ownerName;
    document.getElementById('inv-client-phone').textContent = vehicle.ownerPhone;
    document.getElementById('inv-car-details').textContent = `${vehicle.brand} ${vehicle.model} (${vehicle.year || '--'}) - ${vehicle.fuel}`;
    document.getElementById('inv-car-tech').textContent = vehicle.tech;
    
    const diagText = vehicle.diagnosis ? `Sintomas: ${vehicle.faultDesc}\nDiagnóstico/Trabalho realizado: ${vehicle.diagnosis}` : `Sintomas: ${vehicle.faultDesc}\n(Aguardar diagnóstico do técnico)`;
    document.getElementById('inv-diagnosis-summary').textContent = diagText;

    // Load table items
    const itemsTbody = document.getElementById('invoiceItemsBody');
    itemsTbody.innerHTML = '';

    // Add Parts
    vehicle.parts.forEach(part => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Peça: ${part.name}</td>
            <td class="text-right">${part.price.toFixed(2)}€</td>
            <td class="text-right">1</td>
            <td class="text-right">${part.price.toFixed(2)}€</td>
        `;
        itemsTbody.appendChild(tr);
    });

    // Add Labor
    if (vehicle.labor > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Mão-de-Obra especializada</td>
            <td class="text-right">${vehicle.labor.toFixed(2)}€</td>
            <td class="text-right">1</td>
            <td class="text-right">${vehicle.labor.toFixed(2)}€</td>
        `;
        itemsTbody.appendChild(tr);
    }

    if (vehicle.parts.length === 0 && vehicle.labor === 0) {
        itemsTbody.innerHTML = '<tr><td colspan="4" class="text-center" style="color: var(--text-muted); font-style: italic;">Nenhum serviço faturado até ao momento.</td></tr>';
    }

    // Totals calculations
    const partsTotal = vehicle.parts.reduce((sum, item) => sum + item.price, 0);
    const subtotal = partsTotal + vehicle.labor;
    const tax = subtotal * 0.23; // 23% IVA Portugal
    const totalFinal = subtotal + tax;

    document.getElementById('inv-subtotal').textContent = `${subtotal.toFixed(2)}€`;
    document.getElementById('inv-tax').textContent = `${tax.toFixed(2)}€`;
    document.getElementById('inv-total-final').textContent = `${totalFinal.toFixed(2)}€`;
}

// --- Deliver Vehicle (Set status to delivered & archive) ---
function deliverVehicle() {
    if (!activeVehicleId) return;

    const today = new Date();
    const deliveredDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    // Confirm details updates before delivering
    const diagnosis = document.getElementById('modalDiagnosisNote').value;
    const labor = parseFloat(document.getElementById('modalLaborInput').value) || 0.00;

    vehicles = vehicles.map(v => {
        if (v.id === activeVehicleId) {
            return {
                ...v,
                status: "Entregue",
                diagnosis,
                parts: [...modalTemporaryParts],
                labor,
                deliveredDate: deliveredDate
            };
        }
        return v;
    });

    saveData();
    closeModal();
    showToast("Viatura entregue ao cliente com sucesso!");

    // Switch to Histórico tab
    document.querySelector('[data-tab="historico"]').click();
}
