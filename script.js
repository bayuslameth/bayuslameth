// ===========================
// Navigation Functionality
// ===========================

const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===========================
// Scroll Effects
// ===========================

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.skill-card, .timeline-item, .project-card, .contact-item, .social-link'
);

animatedElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
});

// ===========================
// Smooth Scroll Enhancement
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .hero-content, .hero-image');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===========================
// Scroll Indicator Hide/Show
// ===========================

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ===========================
// Dynamic Year in Footer
// ===========================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Rizki Aditya. All rights reserved.`;
}

// ===========================
// Project Card Tilt Effect (Optional Enhancement)
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ===========================
// Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Performance Optimization
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(updateActiveNav, 10));
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// ===========================
// Keyboard Navigation
// ===========================

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===========================
// Console Easter Egg
// ===========================

console.log('%c👋 Hello There!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #64748b;');
console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'font-size: 12px; color: #1e293b;');

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        updateActiveNav();
        revealOnScroll();
    }, 100);
});

// ===========================
// Accessibility: Skip to Main Content
// ===========================

// Add skip link for screen readers (optional)
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #2563eb;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 9999;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// Contact Link Click Tracking (Optional)
// ===========================

const contactLinks = document.querySelectorAll('.social-link, .contact-value');
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here
        console.log('Contact link clicked:', e.target.textContent);
    });
});

// ===========================
// Scroll Progress Indicator (Optional)
// ===========================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // You can add a progress bar if needed
    // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', debounce(updateScrollProgress, 10));

// ===========================
// Initialize
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully! ✨');
});