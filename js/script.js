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
    hamburger.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
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
document.querySelectorAll('.project-card, .stat-card, .info-card').forEach(el => {
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

        // Here you would typically send the form data to a server
        console.log('Form Data:', data);

        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.5s ease;
        z-index: 9999;
        max-width: 400px;
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
`;
document.head.appendChild(style);

// ====================================
// PARALLAX EFFECT
// ====================================

const heroSection = document.querySelector('.hero');

window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;

        heroSection.style.backgroundPosition = `${x}% ${y}%`;
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
            link.style.color = '#6366f1';
        } else {
            link.style.color = 'white';
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
    const increment = target / 30;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// ====================================
// LOADING ANIMATION
// ====================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ====================================
// SMOOTH SCROLL BEHAVIOR
// ====================================

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

console.log('%c Welcome to my portfolio! ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 16px; padding: 10px;');
console.log('%c Check out the source code on GitHub ', 'color: #6366f1; font-size: 14px;');
