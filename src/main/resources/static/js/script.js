// ============================
// CARRUSEL MEJORADO
// ============================
class CarouselManager {
    constructor() {
        this.slides = document.querySelectorAll('.carrusel_imagen');
        this.current = 0;
        this.intervalTime = 4000; // 4 segundos
        this.interval = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (this.slides.length > 0) {
            this.startAutoPlay();
            this.addEventListeners();
            console.log('Carrusel inicializado con', this.slides.length, 'slides');
        }
    }
    
    nextSlide() {
        if (this.isTransitioning || this.slides.length === 0) return;
        
        this.isTransitioning = true;
        
        // Remover clase active del slide actual
        this.slides[this.current].classList.remove('active');
        
        // Calcular siguiente slide
        this.current = (this.current + 1) % this.slides.length;
        
        // Añadir clase active al nuevo slide
        this.slides[this.current].classList.add('active');
        
        // Permitir nueva transición después de completar la actual
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
        
        console.log('Cambiando a slide:', this.current + 1);
    }
    
    previousSlide() {
        if (this.isTransitioning || this.slides.length === 0) return;
        
        this.isTransitioning = true;
        
        this.slides[this.current].classList.remove('active');
        this.current = (this.current - 1 + this.slides.length) % this.slides.length;
        this.slides[this.current].classList.add('active');
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.current || index >= this.slides.length) return;
        
        this.isTransitioning = true;
        
        this.slides[this.current].classList.remove('active');
        this.current = index;
        this.slides[this.current].classList.add('active');
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }
    
    startAutoPlay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.intervalTime);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    addEventListeners() {
        // Pausar carrusel al hacer hover
        const carrusel = document.querySelector('.carrusel');
        if (carrusel) {
            carrusel.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            carrusel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
        
        // Controles con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
}

// ============================
// BOTÓN IR ARRIBA MEJORADO
// ============================
class ScrollToTopButton {
    constructor() {
        this.button = document.querySelector('.ir-arriba');
        this.scrollThreshold = 300;
        this.init();
    }
    
    init() {
        if (this.button) {
            this.addEventListeners();
            this.checkScroll(); // Verificar posición inicial
        }
    }
    
    addEventListeners() {
        // Click para ir arriba
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Mostrar/ocultar según scroll
        window.addEventListener('scroll', () => {
            this.checkScroll();
        });
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    checkScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > this.scrollThreshold) {
            this.showButton();
        } else {
            this.hideButton();
        }
    }
    
    showButton() {
        this.button.style.display = 'flex';
        setTimeout(() => {
            this.button.style.opacity = '1';
            this.button.style.transform = 'translateY(0)';
        }, 10);
    }
    
    hideButton() {
        this.button.style.opacity = '0';
        this.button.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (this.button.style.opacity === '0') {
                this.button.style.display = 'none';
            }
        }, 300);
    }
}

// ============================
// ANIMACIONES AL HACER SCROLL
// ============================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }
    
    init() {
        this.addScrollListener();
        this.checkElements(); // Verificar elementos visibles al cargar
    }
    
    addScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    checkElements() {
        this.elements.forEach((element) => {
            if (this.isElementInViewport(element)) {
                element.classList.add('animate-fade-in-up');
            }
        });
    }
    
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// ============================
// LAZY LOADING PARA IMÁGENES
// ============================
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => {
                this.observer.observe(img);
            });
        } else {
            // Fallback para navegadores sin soporte
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
    }
}

// ============================
// NAVEGACIÓN ACTIVA
// ============================
class ActiveNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentPath = window.location.pathname;
        this.init();
    }
    
    init() {
        this.setActiveLink();
    }
    
    setActiveLink() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === this.currentPath || 
                (this.currentPath === '/' && href === '/') ||
                (this.currentPath.includes(href) && href !== '/')) {
                link.classList.add('active');
            }
        });
    }
}

// ============================
// EFECTOS HOVER MEJORADOS
// ============================
class HoverEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addProductHoverEffects();
        this.addButtonHoverEffects();
        this.addCardHoverEffects();
    }
    
    addProductHoverEffects() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            producto.addEventListener('mouseenter', () => {
                producto.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            producto.addEventListener('mouseleave', () => {
                producto.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }
    
    addCardHoverEffects() {
        const cards = document.querySelectorAll('.feature, .product-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando FourTech App...');
    
    // Inicializar todos los componentes
    const carousel = new CarouselManager();
    const scrollButton = new ScrollToTopButton();
    const scrollAnimations = new ScrollAnimations();
    const lazyLoader = new LazyImageLoader();
    const activeNav = new ActiveNavigation();
    const hoverEffects = new HoverEffects();
    
    // Añadir clases de animación a elementos existentes
    const animateElements = document.querySelectorAll('.producto, .feature, .numero');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    console.log('✅ FourTech App inicializada correctamente');
    
    // Mensaje de bienvenida en consola
    console.log('%c🏪 Bienvenido a FourTech', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cTienda especializada en tecnología', 'color: #64748b; font-size: 12px;');
});

// ============================
// UTILIDADES GLOBALES
// ============================
window.FourTech = {
    // Función para mostrar notificaciones
    showNotification: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Aquí se puede integrar con SweetAlert2 o otra librería de notificaciones
    },
    
    // Función para debug
    debug: function(message, data = null) {
        if (window.location.hostname === 'localhost') {
            console.log(`🔍 DEBUG: ${message}`, data);
        }
    },
    
    // Función para analytics (placeholder)
    trackEvent: function(eventName, data = {}) {
        console.log(`📊 Analytics: ${eventName}`, data);
        // Aquí se puede integrar con Google Analytics o similares
    }
};

