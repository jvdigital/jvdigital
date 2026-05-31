document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Menu Filter Tabs ---
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-item-category');
                if (category === 'all' || itemCategory === category) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // --- Reservation Form Submission ---
    const reservaForm = document.getElementById('reservaForm');
    const reservaSuccess = document.getElementById('reservaSuccess');
    const btnResetReserva = document.getElementById('btnResetReserva');

    // Summary Fields
    const summaryName = document.getElementById('summaryName');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryGuests = document.getElementById('summaryGuests');

    if (reservaForm && reservaSuccess) {
        reservaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('res_name').value;
            const email = document.getElementById('res_email').value;
            const phone = document.getElementById('res_phone').value;
            const guests = document.getElementById('res_guests').value;
            const date = document.getElementById('res_date').value;
            const time = document.getElementById('res_time').value;

            // Formatação Simples de Data (AAAA-MM-DD para DD/MM/AAAA)
            const dateObj = new Date(date);
            const formattedDate = !isNaN(dateObj) 
                ? `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`
                : date;

            // Populate Summary
            summaryName.textContent = name;
            summaryDate.textContent = formattedDate;
            summaryTime.textContent = time;
            summaryGuests.textContent = guests;

            // Animação de Envio (Simulado)
            const submitBtn = reservaForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'A processar...';
            submitBtn.disabled = true;

            setTimeout(() => {
                reservaForm.classList.add('hidden');
                reservaSuccess.classList.remove('hidden');
                
                // Reset Button Text
                submitBtn.textContent = 'Confirmar Reserva';
                submitBtn.disabled = false;
            }, 1000);
        });

        if (btnResetReserva) {
            btnResetReserva.addEventListener('click', () => {
                reservaForm.reset();
                reservaSuccess.classList.add('hidden');
                reservaForm.classList.remove('hidden');
            });
        }
    }
});
