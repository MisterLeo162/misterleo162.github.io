// Gérer l'ouverture/fermeture du menu sur mobile (Bouton Pit Stop)
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active'); // Pour une animation future du bouton hamburger
});

// Fermer le menu après avoir cliqué sur un lien (sur mobile)
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) { // Adapter à la media query du CSS
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });
});

/*
    *** Idées JS pour un portfolio SISR Thème Sport Auto : ***

    1.  Effets de défilement (Scroll Reveal) :
        Utilisez une librairie comme AOS (Animate On Scroll) pour faire apparaître les sections
        avec des animations de type "slide-in" ou "fade-up", comme des éléments d'interface qui s'activent.

    2.  Compteur de Statistiques (Simulé) :
        Dans la section compétences, vous pourriez avoir des "compteurs" animés
        qui montent pour chaque compétence, comme un compte-tours qui monte en régime.
        (Ex: 95% Maîtrise Windows Server)

    3.  Galerie de Projets / Carrousel :
        Si vous avez des captures d'écran de vos projets, un petit carrousel
        pour les présenter comme un "diaporama de performances".

    4.  Thème sombre/clair (switch mode "Jour/Nuit de course") :
        Un bouton pour basculer entre un thème sombre (par défaut) et un thème plus clair
        pour rappeler les courses de jour et de nuit.
*/

// --- Code pour la Persistance du Menu (Effet .current) ---

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a');

// Fonction pour déterminer quelle section est visible à l'écran
// Fonction pour déterminer quelle section est visible à l'écran
function setActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset;
    const offset = 100; // Marge de sécurité (à ajuster si votre header est plus grand)

    // 1. DÉTECTION SPÉCIFIQUE DU HAUT DE PAGE
    if (scrollY < offset) { 
        // Si le défilement est très proche du haut (moins que l'offset), on force l'activation de 'accueil'.
        current = 'accueil'; 
    }
    // 2. DÉTECTION SPÉCIFIQUE DU BAS DE PAGE (reprise de la correction précédente)
    else if ((window.innerHeight + scrollY) >= document.body.offsetHeight) {
        // Si l'utilisateur est tout en bas de la page, on force l'activation de 'contact'.
        current = 'contact'; 
    } 
    // 3. PARCOURS INVERSÉ NORMAL (Milieu de page)
    else {
        // Parcourt les sections du bas vers le haut
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            
            // Si la position de défilement a dépassé le haut de cette section (en tenant compte du décalage)
            if (scrollY >= section.offsetTop - offset) {
                current = section.getAttribute('id');
                break; // Arrête dès que la section est trouvée
            }
        }
    }

    // Retire la classe 'current' de tous les liens, puis l'ajoute au lien actif
    navLinks.forEach(link => {
        link.classList.remove('current');
        
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('current');
        }
    });
}

// Les écouteurs d'événements restent les mêmes :
// window.addEventListener('scroll', setActiveLink);
// window.addEventListener('load', setActiveLink);

// 1. Écoute l'événement de défilement (scroll) de la fenêtre
window.addEventListener('scroll', setActiveLink);

// 2. Appelle la fonction une première fois au chargement pour le cas où la page ne défile pas
window.addEventListener('load', setActiveLink);

// --- ANCIEN Code de Défilement (Smooth Scroll avec Cubic Bezier) ---

/*
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêche le saut brutal par défaut

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 80; // -80px pour laisser de la place au header sticky
            const distance = targetPosition - startPosition;
            const duration = 1000; // Durée de l'animation en millisecondes (1 seconde)
            let start = null;

            // Fonction de temporisation Cubic-Bezier pour Accélération, Vitesse constante, Ralenti
            // Courbe : Démarrage lent, accélération rapide, décélération lente à la fin.
            // Les valeurs (0, 0), (0.2, 1), (0.8, 1), (1, 1) donnent cet effet.
            // On peut la simplifier en :
            const timingFunction = t => t * t * t; // Facile à implémenter, offre un bon "ease-out"
            
            // Pour un vrai "Accélération, Vitesse constante, Ralenti", nous utiliserons une fonction plus complexe :
            // Nous allons simuler un ease-in-out plus prononcé.
            const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);


            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                
                // Calcul du progrès (0 à 1)
                let percentage = progress / duration;
                if (percentage > 1) percentage = 1;

                // Application de la fonction de temporisation (Cubic-Bezier simulée)
                const easedProgress = easeInOutCubic(percentage);

                // Défilement réel
                window.scrollTo(0, startPosition + distance * easedProgress);

                // Répétition tant que l'animation n'est pas terminée
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
        }
    });
});
*/

// On cible TOUS les liens qui commencent par # (liens internes)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        // --- Condition Spéciale pour le Menu Déroulant ---
        // Si c'est le bouton "Projets" qui ouvre le menu, on ne fait pas de défilement
        if (this.classList.contains('dropdown-toggle')) {
            return; 
        }

        e.preventDefault(); // On stoppe le saut brusque

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 80; // Ajustement pour le header
            const distance = targetPosition - startPosition;
            const duration = 1000; // 1 seconde
            let start = null;

            // Votre fonction d'accélération/ralenti (Cubic Bezier)
            const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                let percentage = progress / duration;
                if (percentage > 1) percentage = 1;

                const easedProgress = easeInOutCubic(percentage);
                window.scrollTo(0, startPosition + distance * easedProgress);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
        }
    });
});