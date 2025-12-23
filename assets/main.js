// Dashboard interactivo para cuaderno
function cargarCuadernoSemana() {
    const weekCards = document.querySelectorAll('.week-card');
    const weekContent = document.getElementById('week-content');
    if(!weekCards.length) return;
    weekCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            weekCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const week = this.dataset.week.padStart(2,'0');
            fetch(`sections/cuaderno/semanas/semana${week}.html`)
                .then(res => res.text())
                .then(html => {
                    weekContent.innerHTML = html;
                    weekContent.style.display = 'block';
                    weekContent.scrollIntoView({behavior:'smooth', block:'start'});
                });
        });
    });
}
// Navegación activa y feedback
document.addEventListener('DOMContentLoaded', () => {
    // Navegación activa
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Feedback visual
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 200);
        });
    });

    // Scroll suave para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Efecto hover y ripple en botones principales
    document.body.addEventListener('mousedown', function(e) {
        if(e.target.classList.contains('cta-btn') || e.target.classList.contains('week-card')) {
            const btn = e.target;
            btn.classList.add('pressed');
            setTimeout(() => btn.classList.remove('pressed'), 180);
        }
    });

    // Animación de aparición para main-content
    const mainContent = document.getElementById('main-content');
    if(mainContent) {
        const observer = new MutationObserver(() => {
            mainContent.classList.remove('fadein');
            void mainContent.offsetWidth;
            mainContent.classList.add('fadein');
        });
        observer.observe(mainContent, { childList: true });
    }
});
