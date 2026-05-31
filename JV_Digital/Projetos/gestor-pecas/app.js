// --- Seed Database ---
const defaultInventory = [
    { id: 1, code: "CAP-AGV-K6", name: "Capacete AGV K6 S", category: "Motas", qty: 4, minQty: 2, cost: 310.00, sell: 429.00 },
    { id: 2, code: "ESC-AKR-CB", name: "Escape Akrapovič Slip-On Carbono", category: "Motas", qty: 2, minQty: 1, cost: 620.00, sell: 890.00 },
    { id: 3, code: "OLE-MOT-71", name: "Óleo Motul 7100 4T 10W40 4L", category: "Oficina", qty: 15, minQty: 5, cost: 32.00, sell: 49.90 },
    { id: 4, code: "PAS-BRE-SI", name: "Pastilhas Travão Brembo Sinter", category: "Oficina", qty: 1, minQty: 3, cost: 20.00, sell: 35.00 },
    { id: 5, code: "FIL-HIF-204", name: "Filtro Óleo Premium HF204", category: "Oficina", qty: 0, minQty: 4, cost: 5.50, sell: 9.50 }
];

const defaultMovements = [
    { id: 1, timestamp: "31/05/2026 10:30:15", code: "OLE-MOT-71", name: "Óleo Motul 7100 4T 10W40 4L", type: "in", qty: 10, reason: "Reabastecimento Fornecedor" },
    { id: 2, timestamp: "31/05/2026 14:15:22", code: "PAS-BRE-SI", name: "Pastilhas Travão Brembo Sinter", type: "out", qty: 2, reason: "Aplicação em Reparação" }
];

// --- Load Data ---
let inventory = JSON.parse(localStorage.getItem('stockpro_inventory')) || defaultInventory;
let movements = JSON.parse(localStorage.getItem('stockpro_movements')) || defaultMovements;

document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Switching SPA Logic ---
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section-content');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');

            // Switch active classes in menu
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');

            // Switch active section in workspace
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            // Specific updates per tab
            if (targetId === 'dashboard-section') {
                updateDashboard();
            } else if (targetId === 'inventory-section') {
                renderInventoryTable();
            } else if (targetId === 'movements-section') {
                renderMovementsLog();
            }
        });
    });

    // --- Filters & Search Listeners ---
    const invSearch = document.getElementById('inventorySearch');
    if (invSearch) invSearch.addEventListener('input', renderInventoryTable);
    
    const catFilter = document.getElementById('inventoryCategoryFilter');
    if (catFilter) catFilter.addEventListener('change', renderInventoryTable);

    // --- Add Part Form Submit ---
    const addPartForm = document.getElementById('addPartForm');
    if (addPartForm) {
        addPartForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const code = document.getElementById('part_code').value.toUpperCase().trim();
            const name = document.getElementById('part_name').value.trim();
            const category = document.getElementById('part_category').value;
            const qty = parseInt(document.getElementById('part_qty').value);
            const minQty = parseInt(document.getElementById('part_min').value);
            const cost = parseFloat(document.getElementById('part_cost').value);
            const sell = parseFloat(document.getElementById('part_sell').value);

            // SKU validation checks
            if (inventory.some(item => item.code === code)) {
                alert(`Já existe um artigo registado com o código ${code}!`);
                return;
            }

            const newPart = {
                id: Date.now(),
                code,
                name,
                category,
                qty,
                minQty,
                cost,
                sell
            };

            inventory.push(newPart);
            saveData();

            // Log Initial Stock Entry Movement
            if (qty > 0) {
                logMovement(code, name, 'in', qty, 'Registo Inicial Artigo');
            }

            addPartForm.reset();
            closeAddPartModal();
            showToast();
            updateDashboard();
        });
    }

    // --- Adjust Stock Form Submit ---
    const adjustStockForm = document.getElementById('adjustStockForm');
    if (adjustStockForm) {
        adjustStockForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const partId = parseInt(document.getElementById('adjust_part_id').value);
            const type = document.querySelector('input[name="adjust_type"]:checked').value;
            const qty = parseInt(document.getElementById('adjust_qty').value);
            const reason = document.getElementById('adjust_reason').value;

            const part = inventory.find(p => p.id === partId);
            if (!part) return;

            if (type === 'out' && part.qty < qty) {
                alert(`Erro: Stock insuficiente! Apenas tens ${part.qty} unidades deste artigo.`);
                return;
            }

            // Execute Surcharge/Deduction
            if (type === 'in') {
                part.qty += qty;
            } else {
                part.qty -= qty;
            }

            saveData();
            logMovement(part.code, part.name, type, qty, reason);

            adjustStockForm.reset();
            closeAdjustStockModal();
            showToast();

            // Refresh UI depending on active section
            const activeSec = document.querySelector('.section-content.active').id;
            if (activeSec === 'dashboard-section') updateDashboard();
            else if (activeSec === 'inventory-section') renderInventoryTable();
        });
    }

    // Adjust sub-tabs toggle events setup (Radio clicks style)
    const toggleRadios = document.querySelectorAll('input[name="adjust_type"]');
    toggleRadios.forEach(radio => {
        const card = radio.closest('.toggle-card');
        if (card) {
            card.addEventListener('click', () => {
                toggleRadios.forEach(r => {
                    const c = r.closest('.toggle-card');
                    if (c) c.classList.remove('selected');
                });
                card.classList.add('selected');
                radio.checked = true;

                // Adjust reasons list based on toggle
                const reasonSelect = document.getElementById('adjust_reason');
                reasonSelect.innerHTML = '';
                if (radio.value === 'in') {
                    addOption(reasonSelect, "Reabastecimento Fornecedor", "Reabastecimento Fornecedor");
                    addOption(reasonSelect, "Devolução de Cliente", "Devolução de Cliente");
                    addOption(reasonSelect, "Ajuste de Inventário", "Ajuste de Inventário");
                } else {
                    addOption(reasonSelect, "Venda ao Balcão", "Venda ao Balcão");
                    addOption(reasonSelect, "Aplicação em Reparação", "Aplicação em Reparação");
                    addOption(reasonSelect, "Ajuste de Inventário", "Ajuste de Inventário");
                }
            });
        }
    });

    function addOption(select, value, text) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        select.appendChild(opt);
    }

    // --- Init App Layout ---
    updateDashboard();

    // --- Overlay Click-to-Close Modals ---
    document.getElementById('addPartModal').addEventListener('click', function(e) {
        if (e.target === this) closeAddPartModal();
    });
    document.getElementById('adjustStockModal').addEventListener('click', function(e) {
        if (e.target === this) closeAdjustStockModal();
    });

    // --- Escape key to close modals ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAddPartModal();
            closeAdjustStockModal();
        }
    });
});

// --- Save Data ---
function saveData() {
    localStorage.setItem('stockpro_inventory', JSON.stringify(inventory));
    localStorage.setItem('stockpro_movements', JSON.stringify(movements));
}

// --- Log Movement ---
function logMovement(code, name, type, qty, reason) {
    const today = new Date();
    const timestamp = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;

    const newMove = {
        id: Date.now(),
        timestamp,
        code,
        name,
        type,
        qty,
        reason
    };

    movements.unshift(newMove); // Add to beginning of array
    saveData();
}

// --- Toast Feedback ---
function showToast() {
    const toast = document.getElementById('stockToast');
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2200);
    }
}

// --- Dashboard Logic ---
function updateDashboard() {
    const statValue = document.getElementById('statValue');
    const statProfit = document.getElementById('statProfit');
    const statCritical = document.getElementById('statCritical');
    const statTotalItems = document.getElementById('statTotalItems');
    const alertCard = document.getElementById('statAlertStockCard');

    // Calculate metrics
    let totalStockValue = 0;
    let totalPotentialProfit = 0;
    let criticalCount = 0;

    inventory.forEach(p => {
        totalStockValue += p.cost * p.qty;
        totalPotentialProfit += (p.sell - p.cost) * p.qty;
        if (p.qty <= p.minQty) {
            criticalCount++;
        }
    });

    statValue.textContent = `${totalStockValue.toFixed(2)}€`;
    statProfit.textContent = `${totalPotentialProfit.toFixed(2)}€`;
    statCritical.textContent = criticalCount;
    statTotalItems.textContent = inventory.length;

    // Flash red card if critical alert elements are on
    if (criticalCount > 0) {
        alertCard.classList.add('critical-alert');
    } else {
        alertCard.classList.remove('critical-alert');
    }

    // Populate Reabastecimento Quick Table
    const alertBody = document.getElementById('alertStockTableBody');
    if (alertBody) {
        alertBody.innerHTML = '';
        const criticalItems = inventory.filter(p => p.qty <= p.minQty);
        
        if (criticalItems.length === 0) {
            alertBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted); font-style: italic;">Nenhum alerta de reabastecimento ativo.</td></tr>';
        } else {
            criticalItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong style="color: var(--primary);">${item.code}</strong></td>
                    <td>${item.name}</td>
                    <td><span class="badge-stock critical">${item.qty} un</span></td>
                    <td style="color: var(--muted);">${item.minQty} un</td>
                `;
                alertBody.appendChild(tr);
            });
        }
    }

    // Populate Recent Movements Table (Last 5)
    const recentBody = document.getElementById('recentMovementsTableBody');
    if (recentBody) {
        recentBody.innerHTML = '';
        const recentMoves = movements.slice(0, 5);

        if (recentMoves.length === 0) {
            recentBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted); font-style: italic;">Nenhum movimento registado.</td></tr>';
        } else {
            recentMoves.forEach(move => {
                const tr = document.createElement('tr');
                const timeOnly = move.timestamp.split(' ')[1] || move.timestamp;
                tr.innerHTML = `
                    <td style="color: var(--muted);">${timeOnly}</td>
                    <td><strong>${move.name}</strong><span style="display:block; font-size:9px; color: var(--primary);">${move.code}</span></td>
                    <td><span class="badge-movement ${move.type}">${move.type === 'in' ? 'Entrada' : 'Saída'}</span></td>
                    <td><strong>${move.qty} un</strong></td>
                `;
                recentBody.appendChild(tr);
            });
        }
    }
}

// --- Render Inventory Section Table ---
function renderInventoryTable() {
    const tbody = document.getElementById('mainInventoryTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const searchVal = document.getElementById('inventorySearch').value.toLowerCase();
    const catVal = document.getElementById('inventoryCategoryFilter').value;

    const filtered = inventory.filter(p => {
        const matchesCategory = catVal === 'all' || p.category === catVal;
        const matchesSearch = p.code.toLowerCase().includes(searchVal) || p.name.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--muted); padding: 30px;">Nenhum artigo encontrado com os filtros atuais.</td></tr>';
        return;
    }

    filtered.forEach(p => {
        const tr = document.createElement('tr');
        const isCritical = p.qty <= p.minQty;
        
        tr.innerHTML = `
            <td><strong style="color: var(--primary); font-family: monospace;">${p.code}</strong></td>
            <td><strong>${p.name}</strong><span style="display:block; font-size:11px; color: var(--muted);">Min. Alerta: ${p.minQty} un</span></td>
            <td style="color: var(--muted);">${p.category}</td>
            <td><span class="badge-stock ${isCritical ? 'critical' : 'normal'}">${p.qty} un</span></td>
            <td>${p.cost.toFixed(2)}€</td>
            <td>${p.sell.toFixed(2)}€</td>
            <td>
                <div style="display:flex; gap: 8px;">
                    <button class="btn btn-secondary btn-small" onclick="openAdjustStockModal(${p.id})"><i class="fa-solid fa-arrow-right-arrow-left"></i> Ajustar</button>
                    <button class="btn btn-secondary btn-small text-red" style="border-color: rgba(239, 68, 68, 0.2);" onclick="deleteInventoryItem(${p.id})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Render Movements Log Section ---
function renderMovementsLog() {
    const tbody = document.getElementById('fullMovementsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (movements.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--muted); padding: 30px;">Nenhum movimento registado no historial.</td></tr>';
        return;
    }

    movements.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="color: var(--muted); font-size: 11px;">${m.timestamp}</td>
            <td><strong style="font-family: monospace;">${m.code}</strong></td>
            <td>${m.name}</td>
            <td><span class="badge-movement ${m.type}">${m.type === 'in' ? 'Entrada' : 'Saída'}</span></td>
            <td><strong>${m.qty} un</strong></td>
            <td><span style="color: var(--primary); font-weight: 600;">${m.reason}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Modal triggers ---
window.openAddPartModal = function() {
    document.getElementById('addPartModal').classList.remove('hidden');
};

window.closeAddPartModal = function() {
    document.getElementById('addPartModal').classList.add('hidden');
};

window.openAdjustStockModal = function(id) {
    const part = inventory.find(p => p.id === id);
    if (!part) return;

    document.getElementById('adjust_part_id').value = part.id;
    document.getElementById('adjustModalTitle').textContent = part.name;
    document.getElementById('adjustCurrentStock').textContent = `${part.qty} un`;
    document.getElementById('adjustPrices').textContent = `${part.cost.toFixed(2)}€ (Custo) / ${part.sell.toFixed(2)}€ (Venda)`;

    // Auto check/toggle first radio to trigger reason selection resets
    const inRadio = document.querySelector('input[name="adjust_type"][value="in"]');
    if (inRadio) {
        inRadio.closest('.toggle-card').click();
    }

    document.getElementById('adjustStockModal').classList.remove('hidden');
};

window.closeAdjustStockModal = function() {
    document.getElementById('adjustStockModal').classList.add('hidden');
};

// --- Delete Item from inventory ---
window.deleteInventoryItem = function(id) {
    const part = inventory.find(p => p.id === id);
    if (!part) return;

    if (confirm(`Aviso: Tem a certeza de que deseja eliminar o artigo ${part.name} [${part.code}] do inventário por completo?`)) {
        inventory = inventory.filter(p => p.id !== id);
        saveData();
        logMovement(part.code, part.name, 'out', part.qty, 'Eliminação Definitiva Artigo');
        
        renderInventoryTable();
        showToast();
    }
};

// --- Export Inventory to CSV file ---
window.exportInventoryToCSV = function() {
    if (inventory.length === 0) {
        alert("O inventário está vazio. Nada para exportar!");
        return;
    }

    // CSV header row (Portuguese compatible - delimiter ;)
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Excel UTF-8 representation
    csvContent += "Código SKU;Nome do Artigo;Categoria;Stock Atual;Stock Mínimo;Preço Custo;Preço Venda;Lucro Unidade\r\n";

    inventory.forEach(p => {
        const profit = p.sell - p.cost;
        const row = [
            p.code,
            p.name.replace(/;/g, ","), // Avoid breakages
            p.category,
            p.qty,
            p.minQty,
            p.cost.toFixed(2).replace(".", ","), // Portuguese locale Excel representation
            p.sell.toFixed(2).replace(".", ","),
            profit.toFixed(2).replace(".", ",")
        ].join(";");
        csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    const today = new Date();
    const filename = `StockPro_Inventario_${today.getFullYear()}_${String(today.getMonth()+1).padStart(2,'0')}_${String(today.getDate()).padStart(2,'0')}.csv`;
    link.setAttribute("download", filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
