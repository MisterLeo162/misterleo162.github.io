document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        document.querySelectorAll('#nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    // 2. Gestion du Dark Mode
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️ Clair';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.textContent = '☀️ Clair';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggleBtn.textContent = '🌙 Sombre';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. Animations d'apparition au scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
});