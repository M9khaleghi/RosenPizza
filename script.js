// Smooth scrolling för navigation
document.addEventListener('DOMContentLoaded', function() {
    // Hämta alla navigation länkar
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Lägg till smooth scrolling för varje länk
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Kompensera för fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Stäng mobilmeny om den är öppen
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Mobilmeny funktionalitet
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Stäng mobilmeny när man klickar på en länk
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Menykategori växling
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Ta bort active klass från alla kategorier och sektioner
            menuCategories.forEach(cat => cat.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Lägg till active klass på vald kategori
            this.classList.add('active');
            
            // Visa vald menysektion
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Navbar scroll effekt
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Kontaktformulär hantering
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hämta formulärdata
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Enkel validering
            if (!name || !email || !message) {
                alert('Vänligen fyll i alla fält');
                return;
            }
            
            // Simulera skickande av meddelande
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Skickar...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Tack för ditt meddelande! Vi återkommer snart.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Scroll animation för element
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observera element för animation
    const animateElements = document.querySelectorAll('.about-content, .menu-items, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hamburger animation
    hamburger.addEventListener('click', function() {
        const bars = this.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (this.classList.contains('active')) {
                if (index === 0) {
                    bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    bar.style.opacity = '0';
                } else if (index === 2) {
                    bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
});

// Lägg till CSS för hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style); 