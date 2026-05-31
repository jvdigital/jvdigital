document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const navbar = document.querySelector('.main-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinksWrapper = document.getElementById('navLinksWrapper');
    const navItems = document.querySelectorAll('.nav-item');

    if (navToggle && navLinksWrapper) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinksWrapper.classList.toggle('open');
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinksWrapper.classList.remove('open');
            });
        });
    }

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 160)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Projects Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Contact Form Simulation ---
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const btnResetContact = document.getElementById('btnResetContact');
    
    // Success Summary elements
    const sentName = document.getElementById('sentName');
    const sentBusiness = document.getElementById('sentBusiness');

    if (contactForm && contactSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('contact_name').value;
            const business = document.getElementById('contact_business').value || 'Negócio Local';

            // Populate Success Dialog
            sentName.textContent = name;
            sentBusiness.textContent = business;

            // Submit Button Spinner Simulation
            const submitBtn = document.getElementById('btnSubmitContact');
            submitBtn.textContent = 'A enviar...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.classList.add('hidden');
                contactSuccess.classList.remove('hidden');

                // Restore button state
                submitBtn.textContent = 'Pedir Demonstração Gratuita';
                submitBtn.disabled = false;
            }, 1200);
        });

        if (btnResetContact) {
            btnResetContact.addEventListener('click', () => {
                contactForm.reset();
                contactSuccess.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
});
