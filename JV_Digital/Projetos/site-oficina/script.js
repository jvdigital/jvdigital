document.addEventListener('DOMContentLoaded', () => {
    
    // --- Live Price Calculator Logic ---
    const engineRadios = document.querySelectorAll('input[name="engine"]');
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    
    const calcPrice = document.getElementById('calcPrice');
    const calcPriceVat = document.getElementById('calcPriceVat');
    const previewEngine = document.getElementById('previewEngine');
    const previewService = document.getElementById('previewService');

    // Add selected class to card styling
    function setupRadioClickStyles(radios, containerSelector) {
        radios.forEach(radio => {
            const card = radio.closest(containerSelector);
            if (card) {
                card.addEventListener('click', () => {
                    radios.forEach(r => {
                        const c = r.closest(containerSelector);
                        if (c) c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    radio.checked = true;
                    updatePrice();
                });
            }
        });
    }

    setupRadioClickStyles(engineRadios, '.radio-card');
    setupRadioClickStyles(serviceRadios, '.radio-card-row');

    function updatePrice() {
        let basePrice = 0;
        let engineSurcharge = 0;
        let serviceName = "Revisão Simples";
        let engineName = "Até 1400 cc";

        // Get selected service price
        const selectedService = document.querySelector('input[name="service"]:checked').value;
        if (selectedService === 'simple') {
            basePrice = 45;
            serviceName = "Revisão Simples (Óleo + Filtro Óleo)";
        } else if (selectedService === 'medium') {
            basePrice = 85;
            serviceName = "Revisão Intermédia (Óleo + 3 Filtros)";
        } else if (selectedService === 'full') {
            basePrice = 160;
            serviceName = "Revisão Completa (Geral + Pastilhas)";
        }

        // Get selected engine surcharge
        const selectedEngine = document.querySelector('input[name="engine"]:checked').value;
        if (selectedEngine === 'low') {
            engineSurcharge = 0;
            engineName = "Até 1400 cc (Motor Pequeno)";
        } else if (selectedEngine === 'mid') {
            engineSurcharge = 30;
            engineName = "1401 cc a 2000 cc (Motor Médio)";
        } else if (selectedEngine === 'high') {
            engineSurcharge = 65;
            engineName = "Superior a 2000 cc (Motor Grande)";
        }

        const totalNoVat = basePrice + engineSurcharge;
        const totalVat = totalNoVat * 1.23;

        // Render preview
        calcPrice.textContent = `${totalNoVat.toFixed(2)}€`;
        calcPriceVat.textContent = `${totalVat.toFixed(2)}€`;
        previewEngine.textContent = engineName;
        previewService.textContent = selectedService === 'simple' ? 'Revisão Simples' : (selectedService === 'medium' ? 'Revisão Intermédia' : 'Revisão Completa');
    }

    // --- Prepare Booking From Calc Link ---
    window.prepareBookingFromCalc = function() {
        const selectedServiceValue = document.querySelector('input[name="service"]:checked').value;
        const selectDropdown = document.getElementById('service_selected');
        
        if (selectedServiceValue === 'simple') {
            selectDropdown.value = "Revisão Simples";
        } else if (selectedServiceValue === 'medium') {
            selectDropdown.value = "Revisão Intermédia";
        } else if (selectedServiceValue === 'full') {
            selectDropdown.value = "Revisão Completa";
        }

        // Scroll to booking form
        document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
    };

    // --- Booking Form Submit Logic ---
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('client_name').value;
            const phone = document.getElementById('client_phone').value;
            const plate = document.getElementById('car_plate').value.toUpperCase();
            const service = document.getElementById('service_selected').value;
            const rawDate = document.getElementById('booking_date').value;
            const time = document.getElementById('booking_time').value;

            // Format date to DD/MM/AAAA
            const dateParts = rawDate.split('-');
            const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

            // Populate success text
            document.getElementById('resName').textContent = name;
            document.getElementById('resService').textContent = service;
            document.getElementById('resPlate').textContent = plate;
            document.getElementById('resDate').textContent = date;
            document.getElementById('resTime').textContent = time;

            // Hide form and show success
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
        });
    }

    window.resetBookingForm = function() {
        if (bookingForm) {
            bookingForm.reset();
            bookingForm.classList.remove('hidden');
            bookingSuccess.classList.add('hidden');
        }
    };

    // Initialize calculator defaults
    updatePrice();
});
