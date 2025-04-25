document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
        });
    }

    // Mobile submenu toggle
    document.querySelectorAll('.js-submenu-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const submenu = btn.nextElementSibling; // .js-submenu
            submenu.classList.toggle('js-open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainMenu) {
                    mainMenu.classList.remove('show');
                }
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Email configuration - to be implemented on server
            const targetEmail = "firefox.corporate@gmail.com"; // Your email address
            
            // Placeholder for server-side implementation
            console.log('Form submitted to:', targetEmail);
            console.log('Form data:', formValues);
            
            // Show success message (real implementation would handle this via AJAX)
            alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом. Ваше повідомлення буде надіслано на пошту ' + targetEmail);
            this.reset();
        });
    }

    // Highlight active menu item based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    });

    // Initialize Google Maps
    const googleMapElement = document.getElementById("google-map");
    if (googleMapElement) {
        function initMap() {
            const location = { lat: 50.4501, lng: 30.5236 }; // Example coordinates for Kyiv
            const map = new google.maps.Map(googleMapElement, {
                zoom: 14,
                center: location,
            });
            new google.maps.Marker({
                position: location,
                map: map,
            });
        }
        initMap();
    }

    // Handle question form submission
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Ваше питання надіслано!');
            questionForm.reset();
        });
    }

    // Service tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and tabs
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            // Activate the clicked button and corresponding tab
            button.classList.add('active');
            const tabId = button.dataset.tab;
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
   
    document.getElementById('get-price-btn').addEventListener('click', function() {
        alert('Для точного розрахунку вартості послуг зверніться до наших фахівців або зв\'яжіться з нами через контактну форму на сайті.');
    });
});
