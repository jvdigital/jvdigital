document.addEventListener('DOMContentLoaded', () => {

    const vetBookingForm = document.getElementById('vetBookingForm');
    const vetBookingSuccess = document.getElementById('vetBookingSuccess');

    if (vetBookingForm) {
        vetBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const petType = document.getElementById('pet_type').value;
            const vetName = document.getElementById('vet_selected').value;
            const ownerName = document.getElementById('owner_name').value;
            const ownerPhone = document.getElementById('owner_phone').value;
            const rawDate = document.getElementById('visit_date').value;
            const time = document.getElementById('visit_time').value;

            // Format date to DD/MM/AAAA
            const dateParts = rawDate.split('-');
            const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

            // Populate success text placeholders
            document.getElementById('outOwner').textContent = ownerName;
            document.getElementById('outPet').textContent = petType;
            document.getElementById('outVet').textContent = vetName;
            document.getElementById('outDate').textContent = date;
            document.getElementById('outTime').textContent = time;
            document.getElementById('outPhone').textContent = ownerPhone;

            // Hide form, show success container
            vetBookingForm.classList.add('hidden');
            vetBookingSuccess.classList.remove('hidden');
        });
    }

    window.resetVetForm = function() {
        if (vetBookingForm) {
            vetBookingForm.reset();
            vetBookingForm.classList.remove('hidden');
            vetBookingSuccess.classList.add('hidden');
        }
    };
});
