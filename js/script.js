// GymPro Website - Complete JavaScript with Optimized Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initContactForm();
    initSmoothScrolling();
    initNavbarScroll();
    
    // Initialize optimized animations with performance checks
    if (window.innerWidth > 768) { // Only run heavy animations on larger screens
        initLightParticleEffect();
        initOptimizedHoverAnimations();
    }
    initScrollReveal();
    initInteractiveElements();
    
    // Disable animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('open');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
            }
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(17, 17, 17, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(17, 17, 17, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.counter, .service-card, .trainer-card, .pricing-card, .about-text, .contact-form, .contact-info');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Animation speed

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Contact Form Validation and Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const message = formData.get('message').trim();

            // Validation
            if (!validateForm(name, email, phone, message, formMessage)) {
                return;
            }

            // Simulate form submission
            showFormMessage('Sending message...', 'info');
            
            setTimeout(() => {
                showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
                contactForm.reset();
            }, 1500);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                clearFieldError(input);
            });
        });
    }
}

// Lightweight Particle Effect (reduced from 30 to 8 particles)
function initLightParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create fewer particles for better performance
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 107, 53, 0.4);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 4 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
            will-change: transform, opacity;
        `;
        hero.appendChild(particle);
    }

    // Optimized particle animation
    addCSS(`
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            50% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0.6;
            }
        }
    `);
}

// Optimized Hover Animations with throttling
function initOptimizedHoverAnimations() {
    let isThrottled = false;
    
    // Simplified magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Simplified tilt effect for cards (throttled)
    const cards = document.querySelectorAll('.service-card, .pricing-card, .trainer-card, .counter');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!isThrottled) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
                isThrottled = true;
                setTimeout(() => isThrottled = false, 100);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Optimized Scroll Reveal with Intersection Observer
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.counter, .service-card, .trainer-card, .pricing-card, .about-text, .contact-form, .fade-in');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add optimized animation styles
    addCSS(`
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `);
}

// Simplified Interactive Elements
function initInteractiveElements() {
    // Simple ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    addCSS(`
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `);
}

// Form Validation Functions
function validateForm(name, email, phone, message, messageElement) {
    // Clear previous messages
    messageElement.textContent = '';
    messageElement.className = 'form-message';

    // Validation rules
    if (name === '') {
        showFormMessage('Please enter your name.', 'error');
        return false;
    }

    if (name.length < 2) {
        showFormMessage('Name must be at least 2 characters long.', 'error');
        return false;
    }

    if (email === '') {
        showFormMessage('Please enter your email address.', 'error');
        return false;
    }

    if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }

    if (phone === '') {
        showFormMessage('Please enter your phone number.', 'error');
        return false;
    }

    if (!validatePhone(phone)) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return false;
    }

    if (message === '') {
        showFormMessage('Please enter your message.', 'error');
        return false;
    }

    if (message.length < 10) {
        showFormMessage('Message must be at least 10 characters long.', 'error');
        return false;
    }

    return true;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    clearFieldError(field);

    switch (fieldName) {
        case 'name':
            if (value === '' || value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters long.');
            }
            break;
        case 'email':
            if (value === '' || !validateEmail(value)) {
                showFieldError(field, 'Please enter a valid email address.');
            }
            break;
        case 'phone':
            if (value === '' || !validatePhone(value)) {
                showFieldError(field, 'Please enter a valid phone number.');
            }
            break;
        case 'message':
            if (value === '' || value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long.');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#eee';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Style based on type
        switch (type) {
            case 'success':
                formMessage.style.color = '#27ae60';
                break;
            case 'error':
                formMessage.style.color = '#e74c3c';
                break;
            case 'info':
                formMessage.style.color = '#3498db';
                break;
        }
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// Utility function to add CSS
function addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, disable heavy animations
        if (fps < 30) {
            document.querySelectorAll('.particle').forEach(p => p.remove());
            console.log('Performance optimization: Heavy animations disabled');
        }
        
        frameCount = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(monitorPerformance);
}

// Add scroll-based parallax effect for hero sections (optimized)
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .page-header');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced for better performance
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16)); // 60fps
}

// Initialize optimized parallax on load
window.addEventListener('load', initParallax);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Start performance monitoring
requestAnimationFrame(monitorPerformance);

// Add CSS for spinner and additional animations
const additionalCSS = `
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;

// Add additional styles to head
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);