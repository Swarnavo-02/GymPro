// Enhanced Animations for Gym Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced animations
    initParticleEffect();
    initHoverAnimations();
    initTypingEffect();
    initFloatingElements();
    initMouseTrail();
    initScrollReveal();
    initInteractiveElements();
});

// Particle Effect for Hero Section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }

    // Add particle animation CSS
    const particleCSS = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px) scale(0);
                opacity: 0;
            }
            25% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                transform: translateY(-150px) translateX(${Math.random() * 200 - 100}px) scale(1);
                opacity: 0.8;
            }
            75% {
                opacity: 0.4;
            }
        }
    `;
    
    addCSS(particleCSS);
}

// Enhanced Hover Animations
function initHoverAnimations() {
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.service-card, .pricing-card, .trainer-card, .counter');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.3s ease';
        });
    });

    // Glow effect for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 10px rgba(255, 107, 53, 0.8)';
            link.style.transition = 'text-shadow 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = '';
        });
    });
}

// Typing Effect for Hero Text
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid #ff6b35';
    heroTitle.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = '';
            }, 2000);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1500);
    
    // Add blinking cursor animation
    addCSS(`
        @keyframes blink {
            0%, 50% { border-color: #ff6b35; }
            51%, 100% { border-color: transparent; }
        }
    `);
}

// Floating Elements Animation
function initFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const emojis = ['🏋️', '💪', '🔥', '⚡', '🎯', '🏃', '🥇'];
    
    emojis.forEach((emoji, index) => {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-emoji';
        floatingElement.textContent = emoji;
        floatingElement.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.5 + 1.5}rem;
            opacity: 0.4;
            animation: floatEmoji ${8 + index * 2}s ease-in-out infinite;
            animation-delay: ${index * 1.5}s;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 60 + 20}%;
            z-index: 1;
            pointer-events: none;
            filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.3));
        `;
        hero.appendChild(floatingElement);
    });
    
    addCSS(`
        @keyframes floatEmoji {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            25% {
                transform: translateY(-30px) rotate(5deg);
            }
            50% {
                transform: translateY(-60px) rotate(-5deg);
            }
            75% {
                transform: translateY(-30px) rotate(3deg);
            }
        }
    `);
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 15;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.4}px;
            height: ${8 - i * 0.4}px;
            background: rgba(255, 107, 53, ${(trailLength - i) / trailLength * 0.8});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: scale(0);
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
                dot.style.transform = 'scale(1)';
            }, index * 20);
        });
    });
    
    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trail.forEach(dot => {
            dot.style.transform = 'scale(0)';
        });
    });
}

// Enhanced Scroll Reveal Animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Add special effects for different elements
                    if (entry.target.classList.contains('counter')) {
                        entry.target.style.animation = 'bounceIn 0.8s ease forwards';
                    } else if (entry.target.classList.contains('service-card')) {
                        entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                    } else if (entry.target.classList.contains('pricing-card')) {
                        entry.target.style.animation = 'zoomIn 0.8s ease forwards';
                    }
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.counter, .service-card, .trainer-card, .pricing-card, .about-text, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
    
    // Add animation keyframes
    addCSS(`
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.8s ease;
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3) translateY(50px); }
            50% { opacity: 1; transform: scale(1.05) translateY(-10px); }
            70% { transform: scale(0.9) translateY(0); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes slideInUp {
            0% { opacity: 0; transform: translateY(100px) rotateX(90deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        
        @keyframes zoomIn {
            0% { opacity: 0; transform: scale(0.5) rotate(180deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
    `);
}

// Interactive Elements
function initInteractiveElements() {
    // Ripple effect for buttons
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .page-header');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
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

// Utility function to add CSS
function addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});