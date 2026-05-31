const products = [
    { id: 1, name: "Capacete Arai RX-7V Evo", category: "Capacetes", price: 749.00, desc: "Capacete de competição premium, máxima segurança e aerodinâmica.", icon: "🪖" },
    { id: 2, name: "Capacete AGV K6 S", category: "Capacetes", price: 429.00, desc: "Leveza extrema e conforto excelente para estrada e turismo.", icon: "🪖" },
    { id: 3, name: "Escape Akrapovič Slip-On Carbono", category: "Escapes", price: 890.00, desc: "Escape em carbono de alta qualidade. Ganho de potência e som único.", icon: "💨" },
    { id: 4, name: "Linha Escape Completa LeoVince GP", category: "Escapes", price: 450.00, desc: "Linha de escape completa em aço inoxidável com silenciador GP.", icon: "💨" },
    { id: 5, name: "Óleo Motul 7100 4T 10W40 4L", category: "Manutenção", price: 49.90, desc: "Lubrificante 100% sintético éster para motores de alto desempenho.", icon: "🧴" },
    { id: 6, name: "Filtro Óleo Premium HF204", category: "Manutenção", price: 9.50, desc: "Filtro de óleo de alta qualidade para substituição direta de fábrica.", icon: "⚙️" },
    { id: 7, name: "Pastilhas Travão Brembo Sinter", category: "Travagem", price: 35.00, desc: "Excelente potência de travagem e durabilidade em qualquer condição.", icon: "🛑" },
    { id: 8, name: "Discos de Travão Galfer Wave Frontais", category: "Travagem", price: 180.00, desc: "Discos flutuantes em flor com excelente dissipação de calor.", icon: "🛑" }
];

let cart = JSON.parse(localStorage.getItem('motospeed_cart')) || [];
let activeCategory = 'all';
let appliedCoupon = false;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Render Products ---
    renderCatalog();

    // Setup Search Event
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', renderCatalog);
    }

    // --- Init UI Render ---
    updateCartUI();
});

// --- Toggle Cart Side Panel ---
window.toggleCart = function() {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartPanel && cartOverlay) {
        cartPanel.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
};

// --- Catalog Filters ---
window.filterCategory = function(category) {
    activeCategory = category;
    
    // Update active tab class styling
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        const text = tab.textContent.trim().toLowerCase();
        const catLower = category.toLowerCase();
        
        if (catLower === 'all' && text === 'todos') {
            tab.classList.add('active');
        } else if (text === catLower) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    renderCatalog();
};

function renderCatalog() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const searchVal = document.getElementById('productSearch').value.toLowerCase();

    const filtered = products.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.desc.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: span 4; text-align: center; color: var(--muted); padding: 40px;">Nenhum produto encontrado.</div>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div>
                <div class="product-img">${p.icon}</div>
                <div class="product-info">
                    <div>
                        <span class="product-category">${p.category}</span>
                        <h3 class="product-name">${p.name}</h3>
                    </div>
                    <p class="product-desc">${p.desc}</p>
                </div>
            </div>
            <div class="product-footer">
                <span class="product-price">${p.price.toFixed(2)}€</span>
                <button class="btn btn-primary btn-small" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Adicionar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Cart Core Logic ---
window.addToCart = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...prod, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showToast();
};

window.updateQty = function(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    updateCartUI();
};

window.removeItem = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('motospeed_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const countSpan = document.getElementById('cartCount');
    const panelBody = document.getElementById('cartPanelBody');
    const subtotalSpan = document.getElementById('cartSubtotal');
    const totalSpan = document.getElementById('cartTotal');
    const discountSpan = document.getElementById('cartDiscount');
    const couponRow = document.getElementById('couponRow');
    const checkoutBtn = document.getElementById('btnGoCheckout');

    if (!panelBody) return;

    // Cart counts
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countSpan.textContent = totalQty;

    panelBody.innerHTML = '';

    if (cart.length === 0) {
        panelBody.innerHTML = '<div class="cart-empty"><i class="fa-solid fa-basket-shopping" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>O teu carrinho está vazio.</div>';
        subtotalSpan.textContent = '0,00€';
        totalSpan.textContent = '0,00€';
        checkoutBtn.disabled = true;
        couponRow.style.display = 'none';
        return;
    }

    checkoutBtn.disabled = false;

    // Render items
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-img">${item.icon}</div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">${(item.price * item.qty).toFixed(2)}€</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    <button class="remove-item-btn" onclick="removeItem(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        `;
        panelBody.appendChild(div);
    });

    // Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    subtotalSpan.textContent = `${subtotal.toFixed(2)}€`;

    let discount = 0;
    if (appliedCoupon) {
        discount = subtotal * 0.10;
        couponRow.style.display = 'flex';
        discountSpan.textContent = `-${discount.toFixed(2)}€`;
    } else {
        couponRow.style.display = 'none';
    }

    const total = subtotal - discount;
    totalSpan.textContent = `${total.toFixed(2)}€`;
}

// --- Discount Coupon ---
window.applyDiscountCoupon = function() {
    const input = document.getElementById('couponInput');
    const code = input.value.trim().toUpperCase();

    if (code === 'MOTOSPEED10') {
        appliedCoupon = true;
        input.value = '';
        updateCartUI();
        alert("Cupão MOTOSPEED10 de 10% de desconto aplicado com sucesso!");
    } else {
        alert("Cupão inválido. Introduz 'MOTOSPEED10' para teres 10% de desconto.");
    }
};

// --- Toast Feedback ---
function showToast() {
    const toast = document.getElementById('cartToast');
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2200);
    }
}

// --- Checkout Modal ---
window.openCheckoutModal = function() {
    toggleCart(); // Close sidebar
    const modal = document.getElementById('checkoutModal');
    const form = document.getElementById('checkoutForm');
    const success = document.getElementById('orderSuccess');

    form.classList.remove('hidden');
    success.classList.add('hidden');
    modal.classList.remove('hidden');
};

window.closeCheckoutModal = function() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('hidden');
};

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('ship_name').value;
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * (appliedCoupon ? 0.9 : 1.0);

        // Random order number
        const orderNum = `MS-${Math.floor(Math.random() * 90000) + 10000}`;

        document.getElementById('outShipName').textContent = name;
        document.getElementById('outOrderNum').textContent = `#${orderNum}`;
        document.getElementById('outOrderTotal').textContent = `${total.toFixed(2)}€`;

        // Reset cart state
        cart = [];
        appliedCoupon = false;
        saveCart();
        updateCartUI();

        // Toggle success state
        checkoutForm.classList.add('hidden');
        document.getElementById('orderSuccess').classList.remove('hidden');
    });
}

window.closeCheckoutSuccess = function() {
    closeCheckoutModal();
};
