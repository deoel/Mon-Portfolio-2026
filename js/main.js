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
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
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

console.log('Portfolio initialized successfully!');

