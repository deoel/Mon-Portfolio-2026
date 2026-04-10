// ========================================
// HAMBURGER MENU
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu?.querySelectorAll('a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
}

// Close menu when clicking on a link
navLinks?.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// ========================================
// SCROLL TO TOP
// ========================================
const scrollToTopBtn = document.getElementById('scroll-to-top');
const progressBar = document.getElementById('progress-bar');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Update progress bar
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// INTERSECTION OBSERVER - ANIMATIONS AU SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-animation');
    observer.observe(section);
});

// Observer les cartes
document.querySelectorAll('.projet-card, .passion-card, .ent-item').forEach(card => {
    card.classList.add('fade-animation');
    observer.observe(card);
});

// ========================================
// SET ACTIVE NAV LINK ON SCROLL
// ========================================
const setActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = navMenu?.querySelectorAll('a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks?.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', setActiveNavLink);

// ========================================
// SMOOTH FOCUS OUTLINE ON KEYBOARD NAV
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// FORM VALIDATION (Contact)
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                input.style.borderColor = '#EEE';
            }
        });

        if (isValid) {
            alert('Merci de votre message! Nous vous recontacterons bientôt.');
            contactForm.reset();
        }
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// DARK MODE TOGGLE
// ========================================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    enableDarkMode();
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle?.classList.add('active');
    localStorage.setItem('theme', 'dark');
    darkModeToggle?.setAttribute('title', 'Light mode');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle?.classList.remove('active');
    localStorage.setItem('theme', 'light');
    darkModeToggle?.setAttribute('title', 'Dark mode');
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}

// ========================================
// ANIMATED COUNTERS
// ========================================
function animateCounter(element, target, duration = 1500) {
    let current = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const counters = document.querySelectorAll('.counter');
let countersStarted = false;

if (counters.length > 0) {
    const countersObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            countersObserver.unobserve(entries[0].target);
        }
    });

    counters[0]?.parentElement?.forEach(element => {
        countersObserver.observe(element);
    });
}

// ========================================
// ADD LOADING STATE TO BUTTONS
// ========================================
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id !== 'scroll-to-top' && button.id !== 'hamburger' && button.id !== 'dark-mode-toggle') {
            const originalText = button.textContent;
            button.disabled = true;
            button.style.opacity = '0.7';

            setTimeout(() => {
                button.disabled = false;
                button.style.opacity = '1';
                button.textContent = originalText;
            }, 2000);
        }
    });
});

// ========================================
// LAZY OBSERVATION FOR ANIMATIONS
// ========================================
const fadeInElements = document.querySelectorAll('[data-fade-in]');
if (fadeInElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// ========================================
// PARALLAX EFFECT (LIGHT)
// ========================================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollY = window.scrollY;
        const offset = scrollY * 0.5;
        element.style.transform = `translateY(${offset}px)`;
    });
});

console.log('Portfolio initialized successfully!');

