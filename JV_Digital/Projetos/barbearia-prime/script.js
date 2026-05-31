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

    // --- Booking Logic (Real-time Calculator & Submission) ---
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const totalPriceEl = document.getElementById('totalPrice');
    const btnSubmitBooking = document.getElementById('btnSubmitBooking');
    const btnResetBooking = document.getElementById('btnResetBooking');
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

    // Summary fields
    const sumName = document.getElementById('sumName');
    const sumServices = document.getElementById('sumServices');
    const sumBarber = document.getElementById('sumBarber');
    const sumDate = document.getElementById('sumDate');
    const sumTime = document.getElementById('sumTime');
    const sumPrice = document.getElementById('sumPrice');

    // Set minimum date to today
    const dateInput = document.getElementById('book_date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    // Calculate Price in Real Time
    function calculateTotal() {
        let total = 0;
        let selectedCount = 0;

        serviceCheckboxes.forEach(checkbox => {
            const card = checkbox.closest('.service-select-item');
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute('data-price'));
                selectedCount++;
                if (card) card.classList.add('checked');
            } else {
                if (card) card.classList.remove('checked');
            }
        });

        totalPriceEl.textContent = `${total.toFixed(2)}€`;
        
        // Enable submit button only if at least one service is selected
        if (selectedCount > 0) {
            btnSubmitBooking.removeAttribute('disabled');
        } else {
            btnSubmitBooking.setAttribute('disabled', 'true');
        }

        return { total, selectedCount };
    }

    // Add change listener to checkboxes
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Form Submission
    if (bookingForm && bookingSuccess) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('book_name').value;
            const phone = document.getElementById('book_phone').value;
            const barber = document.getElementById('book_barber').value;
            const date = document.getElementById('book_date').value;
            const time = document.getElementById('book_time').value;

            // Get selected services array
            const selectedServices = [];
            serviceCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedServices.push(checkbox.value);
                }
            });

            const { total } = calculateTotal();

            // Format date (AAAA-MM-DD to DD/MM/AAAA)
            const dateObj = new Date(date);
            const formattedDate = !isNaN(dateObj) 
                ? `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`
                : date;

            // Populate summary
            sumName.textContent = name;
            sumServices.textContent = selectedServices.join(', ');
            sumBarber.textContent = barber;
            sumDate.textContent = formattedDate;
            sumTime.textContent = time;
            sumPrice.textContent = `${total.toFixed(2)}€`;

            // Simular envio
            btnSubmitBooking.textContent = 'A processar...';
            btnSubmitBooking.disabled = true;

            setTimeout(() => {
                bookingForm.classList.add('hidden');
                bookingSuccess.classList.remove('hidden');

                // Reset Button Text
                btnSubmitBooking.textContent = 'Confirmar Agendamento';
                btnSubmitBooking.disabled = false;
            }, 1000);
        });

        if (btnResetBooking) {
            btnResetBooking.addEventListener('click', () => {
                bookingForm.reset();
                bookingSuccess.classList.add('hidden');
                bookingForm.classList.remove('hidden');
                calculateTotal();
            });
        }
    }
});
