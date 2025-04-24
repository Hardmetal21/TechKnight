 // Mobile menu toggle
 document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainMenu').classList.toggle('show');

    document.querySelectorAll('.js-submenu-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          const submenu = btn.nextElementSibling; // .js-submenu
          submenu.classList.toggle('js-open');
        });
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
            document.getElementById('mainMenu').classList.remove('show');
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Email configuration - to be implemented on server
    const targetEmail = "firefox.corporate@gmail.com"; // Your email address
    
    // Here you would typically send the form data to your server
    // The code below is a placeholder for the server-side implementation
    // For a real implementation, you would need to:
    // 1. Set up a server endpoint (PHP, Node.js, etc.)
    // 2. Send the form data to that endpoint
    // 3. Configure the server to forward the email to firefox.corporate@gmail.com
    
    console.log('Form submitted to:', targetEmail);
    console.log('Form data:', formValues);
    
    // Show success message (in a real site you'd handle this after successful AJAX)
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом. Ваше повідомлення буде надіслано на пошту ' + targetEmail);
    this.reset();
});

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

// Ініціалізація Google Maps
function initMap() {
    const location = { lat: 50.4501, lng: 30.5236 }; // Приклад координат для Києва
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 14,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}

// Обробка форми питання
document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Ваше питання надіслано!');
    document.getElementById('questionForm').reset();
});
