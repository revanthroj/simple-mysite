// ====================================
// SMOOTH SCROLL & NAVBAR ANIMATION
// ====================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// ====================================
// SCROLL ANIMATIONS (Intersection Observer)
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.project-card, .stat-card, .info-card, .skill-tag').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ====================================
// CONTACT FORM HANDLING
// ====================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show success message
        showNotification('✨ Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form with animation
        contactForm.style.opacity = '0.5';
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.opacity = '1';
        }, 300);
    });
}

// Enhanced Notification function with animation
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 15px 40px ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
        animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        letter-spacing: 0.3px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ====================================
// ADD KEYFRAMES TO DOCUMENT
// ====================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes shine {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
`;
document.head.appendChild(style);

// ====================================
// PARALLAX EFFECT
// ====================================

const heroSection = document.querySelector('.hero');
let parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;

        if (heroSection) {
            heroSection.style.backgroundPosition = `${x}% ${y}%`;
        }

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 5;
            el.style.transform = `translateY(${y * speed / 10}px)`;
        });
    }
});

// ====================================
// ACTIVE NAV LINK INDICATOR
// ====================================

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====================================
// COUNT UP ANIMATION FOR STATS
// ====================================

const countUpOptions = {
    threshold: 0.7
};

const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAnimated) {
            const element = entry.target.querySelector('h3');
            const targetValue = parseInt(element.textContent);
            animateCount(element, targetValue);
            entry.target.hasAnimated = true;
        }
    });
}, countUpOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    countUpObserver.observe(card);
});

function animateCount(element, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 2000;
    const startTime = Date.now();

    function updateCount() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        current = Math.floor(progress * target);
        element.textContent = current + '+';

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCount();
}

// ====================================
// SMOOTH SCROLL BEHAVIOR
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// PAGE VISIBILITY API
// ====================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋';
    } else {
        document.title = 'Revanth - Portfolio';
    }
});

// ====================================
// ENHANCED HOVER EFFECTS
// ====================================

// Add tilt effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;

        card.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ====================================
// SKILL TAG ANIMATION ON SCROLL
// ====================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(tag);
});

// ====================================
// BUTTON RIPPLE EFFECT
// ====================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(1);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ====================================
// TYPING EFFECT FOR SUBTITLE
// ====================================

function typeWriter(element, text, speed = 50) {
    element.innerHTML = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// setTimeout(() => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     if (subtitle) {
//         typeWriter(subtitle, 'Full Stack Developer | Creative Designer | Tech Enthusiast');
//     }
// }, 1000);

// ====================================
// SCROLL PROGRESS BAR
// ====================================

const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #ec4899, #8b5cf6);
    z-index: 999;
    width: 0;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// ====================================
// CONSOLE MESSAGE
// ====================================

console.log('%c 🚀 Welcome to my animated portfolio! ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 16px; padding: 12px; border-radius: 5px;');
console.log('%c ✨ Everything here is built with love and code ', 'color: #6366f1; font-size: 14px; font-style: italic;');
console.log('%c 📍 Check out the source on GitHub: https://github.com/revanthroj/simple-mysite ', 'color: #ec4899; font-size: 13px;');

// ====================================
// FORM INPUT FOCUS ANIMATION
// ====================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.2)';
        this.style.borderColor = '#6366f1';
    });

    input.addEventListener('blur', function () {
        this.style.boxShadow = 'none';
        this.style.borderColor = '#e2e8f0';
    });
});

// ====================================
// PAGE LOAD ANIMATION
// ====================================

window.addEventListener('load', () => {
    document.body.style.animation = 'pageLoad 0.8s ease';
});

@keyframes pageLoad {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
