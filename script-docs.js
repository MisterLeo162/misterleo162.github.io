document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion du Dark Mode (synchronisé avec l'autre page via localStorage)
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

    // 2. Animations au scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(element => appearOnScroll.observe(element));
});