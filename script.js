// Enhanced 3D Portfolio JavaScript

// Mobile Navigation Toggle with 3D effects
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add 3D rotation effect to hamburger
    if (hamburger.classList.contains('active')) {
        hamburger.style.transform = 'translateZ(20px) rotateY(180deg)';
    } else {
        hamburger.style.transform = 'translateZ(0px) rotateY(0deg)';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.style.transform = 'translateZ(0px) rotateY(0deg)';
}));

// Enhanced smooth scrolling with 3D parallax effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate offset to account for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            // Smooth scroll with custom easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Add subtle page transition effect
            document.body.style.transition = 'transform 0.3s ease-out';
            document.body.style.transform = 'perspective(1000px) rotateX(0.2deg)';
            
            setTimeout(() => {
                document.body.style.transform = '';
                document.body.style.transition = '';
            }, 300);
        }
    });
});

// Enhanced active navigation highlighting with 3D effects
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.style.transform = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.transform = 'translateZ(10px) scale(1.1)';
        }
    });
});

// Enhanced 3D intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer3D = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateZ(10px)';
            
            // Add staggered 3D animation for child elements
            const children = entry.target.querySelectorAll('.skill-item, .project-card, .highlight-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.transform = 'translateY(0) translateZ(15px)';
                    child.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Enhanced mouse movement 3D effects - Optimized for smoothness
let mouseX = 0;
let mouseY = 0;
let rafId = null;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    
    // Throttle mouse movement updates for better performance
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
        // Apply subtle 3D tilt to cards based on mouse position
        const cards = document.querySelectorAll('.card-3d, .skill-item, .project-card, .highlight-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const cardY = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            // Reduced rotation values for smoother experience
            const rotateX = cardY * 5;
            const rotateY = cardX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        // Subtle parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(${mouseX * 5}px, ${mouseY * 5}px, 0)`;
        }
        
        rafId = null;
    });
});

// Reset card transforms when mouse leaves - smoother transition
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.card-3d, .skill-item, .project-card, .highlight-item');
    cards.forEach(card => {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(10px)';
        
        // Remove transition after animation completes
        setTimeout(() => {
            card.style.transition = '';
        }, 500);
    });
});

// Enhanced typing effect with 3D text animation
function typeWriter3D(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.transform = 'translateZ(20px)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            // Add subtle 3D effect to each character
            element.style.textShadow = `0 ${2 + Math.sin(i * 0.5) * 2}px ${8 + Math.cos(i * 0.3) * 4}px rgba(0, 0, 0, 0.3)`;
            i++;
            setTimeout(type, speed);
        } else {
            // Final 3D effect
            element.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        }
    }
    
    type();
}

// Initialize enhanced typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter3D(subtitle, originalText, 80);
    }
});

// Enhanced navbar background with 3D depth
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        navbar.style.transform = 'translateZ(100px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateZ(100px)';
    }
});

// Enhanced scroll to top with 3D animation
const scrollToTop = () => {
    // Add spinning 3D effect during scroll
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        scrollButton.style.transform = 'translateZ(20px) scale(1.2) rotateY(360deg)';
        setTimeout(() => {
            scrollButton.style.transform = 'translateZ(0px) scale(1) rotateY(0deg)';
        }, 600);
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Enhanced scroll to top button with 3D effects
const createScrollToTopButton3D = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'scroll-to-top';
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide button with 3D animation
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'translateZ(0px) scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'translateZ(-20px) scale(0.8)';
        }
    });
    
    // Enhanced hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateZ(20px) scale(1.1) rotateY(10deg)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateZ(0px) scale(1) rotateY(0deg)';
    });
};

// Initialize enhanced scroll to top button
createScrollToTopButton3D();

// Enhanced 3D form and interaction handlers
const handleFormSubmission = (formId) => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add 3D success animation
            form.style.transform = 'perspective(1000px) rotateY(5deg) scale(1.05)';
            setTimeout(() => {
                form.style.transform = '';
                alert('Thank you for your message! I\'ll get back to you soon.');
            }, 300);
        });
    }
};

// Enhanced loading animation with 3D effects
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animation to main elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) translateZ(-20px)';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0) translateZ(0)';
        }, index * 200);
    });
});

// Enhanced parallax effects with 3D depth - Optimized for smoothness
let scrollRafId = null;

window.addEventListener('scroll', () => {
    if (scrollRafId) return;
    
    scrollRafId = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2; // Reduced for smoother effect
        
        // Subtle parallax for hero background elements
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Optimized 3D transform for cards based on scroll position
        const cards = document.querySelectorAll('.skill-item, .project-card, .highlight-item');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const scrollPercentage = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            const translateZ = scrollPercentage * 15; // Reduced for smoother effect
            const rotateX = (0.5 - scrollPercentage) * 5; // Reduced rotation
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
        });
        
        scrollRafId = null;
    });
});

// Enhanced counter animation with 3D effects
const animateCounter3D = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        // Add 3D scaling effect during count
        const scale = 1 + Math.sin(start / target * Math.PI) * 0.1;
        element.style.transform = `perspective(1000px) scale(${scale}) translateZ(${start / target * 10}px)`;
        
        if (start >= target) {
            element.textContent = target;
            element.style.transform = 'perspective(1000px) scale(1) translateZ(10px)';
            clearInterval(timer);
        }
    }, 16);
};

// Initialize enhanced counters
const initCounters3D = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter3D(entry.target, target);
                }
            });
        });
        counterObserver.observe(counter);
    });
};

// Enhanced device tilt effects for mobile
const initDeviceTilt = () => {
    if (window.DeviceOrientationEvent && /Mobi|Android/i.test(navigator.userAgent)) {
        window.addEventListener('deviceorientation', (e) => {
            const gamma = e.gamma; // left-right tilt (-90 to 90)
            const beta = e.beta;   // front-back tilt (-180 to 180)
            
            const cards = document.querySelectorAll('.card-3d, .skill-item, .project-card');
            cards.forEach(card => {
                const rotateX = beta * 0.1;
                const rotateY = gamma * 0.1;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
        });
    }
};

// Enhanced custom cursor with 3D trail effect - DISABLED
const initCustomCursor3D = () => {
    // Custom cursor disabled - using default system cursor
    return;
};

// Initialize all enhanced 3D features
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for 3D animations
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .contact-item, .highlight-item, .education-card');
    animatedElements.forEach(el => {
        observer3D.observe(el);
    });
    
    initCounters3D();
    initDeviceTilt();
    initCustomCursor3D();
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
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
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple3D 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple3D {
        to {
            transform: scale(2) translateZ(10px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced keyboard navigation with 3D feedback
document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;
    
    // Enhanced escape behavior
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.style.transform = 'translateZ(0px) rotateY(0deg)';
        
        // Add 3D escape animation
        document.body.style.transform = 'perspective(1000px) rotateY(1deg)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 200);
    }
    
    // Enhanced home key behavior
    if (e.key === 'Home') {
        e.preventDefault();
        // Add 3D zoom effect during scroll to top
        document.body.style.transform = 'perspective(1000px) scale(0.95)';
        scrollToTop();
        setTimeout(() => {
            document.body.style.transform = '';
        }, 800);
    }
    
    // Add 3D focus effects
    if (e.key === 'Tab') {
        setTimeout(() => {
            if (activeElement && (activeElement.tagName === 'A' || activeElement.tagName === 'BUTTON')) {
                activeElement.style.transform = 'perspective(1000px) translateZ(15px) scale(1.05)';
                setTimeout(() => {
                    activeElement.style.transform = '';
                }, 200);
            }
        }, 0);
    }
});

// Enhanced print optimization with 3D reset
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
    // Reset all 3D transforms for printing
    document.querySelectorAll('*').forEach(el => {
        el.style.transform = 'none';
        el.style.perspective = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
    // Restore 3D effects after printing
    setTimeout(() => {
        location.reload();
    }, 100);
});

console.log('🚀 Enhanced 3D Portfolio Website Loaded Successfully!');
console.log('✨ Features: 3D transforms, parallax effects, mouse interactions, and depth!');
console.log('💼 Ready to showcase Ashish Gupta\'s cyber security expertise in 3D!');
