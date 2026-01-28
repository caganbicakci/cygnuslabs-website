// Wait for components to load before initializing
let initialized = false;

function initializeApp() {
    if (initialized) return;
    initialized = true;

    // Smooth scroll implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple visibility observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, observerOptions);

    // Select direct children of main sections for cleaner animation
    setTimeout(() => {
        document.querySelectorAll('section > div, footer > div').forEach(el => {
            el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
            observer.observe(el);
        });
    }, 50);
}

// Initialize when components are loaded
document.addEventListener('componentsLoaded', initializeApp);

// Fallback: check if components are already loaded (for page refresh scenarios)
if (document.readyState === 'complete') {
    const checkComponents = setInterval(() => {
        const header = document.getElementById('header');
        const hero = document.getElementById('hero');
        const footer = document.getElementById('footer');
        
        if (header && header.innerHTML.trim() && 
            hero && hero.innerHTML.trim() && 
            footer && footer.innerHTML.trim()) {
            clearInterval(checkComponents);
            initializeApp();
        }
    }, 100);
    
    // Stop checking after 5 seconds
    setTimeout(() => clearInterval(checkComponents), 5000);
}
