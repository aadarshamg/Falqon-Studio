// Dark/Light Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Check local storage for theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});

// FAQ accordion
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

// Scroll reveal for tiles
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
}, { threshold: 0.07 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});


// Staggered card animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const cards = e.target.querySelectorAll('.feat-card-lime, .price-card, .testi-card, .blog-card, .brand-pill, .bento-peach, .bento-dark-green, .bento-dark, .bento-peach-r');
            cards.forEach((c, i) => {
                c.style.opacity = '0';
                c.style.transform = 'translateY(16px)';
                c.style.transition = `opacity .45s ease ${i * 0.08}s, transform .45s ease ${i * 0.08}s`;
                setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, 60 + i * 80);
            });
            cardObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.04 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tile').forEach(el => cardObserver.observe(el));
});
