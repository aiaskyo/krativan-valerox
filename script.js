document.addEventListener('DOMContentLoaded', () => {
    
    // --- APP SCROLL LIFECYCLE MANAGEMENT ---
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Floating Control states visibility triggers
        if (window.scrollY > 120) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
        
        trackNavigationState();
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- RESPONSIVE DRAWER MANAGEMENT ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link-item');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('mobile-active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    navLinkItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });

    // --- ACCORDION CORE LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- NATIVE INTERSECTION REVEAL CONTROLLERS ---
    const revealElements = document.querySelectorAll('.scroll-reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.04, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- NUMERIC ACCELERATION MECHANISM ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersInitiated = false;

    const executeCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 1800;
            const stepTime = Math.max(Math.floor(duration / target), 20);
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.textContent = target === 24 ? "24/7" : target + "+";
                    clearInterval(timer);
                } else {
                    counter.textContent = current + "+";
                }
            }, stepTime);
        });
    };

    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersInitiated) {
            countersInitiated = true;
            executeCounters();
        }
    }, { threshold: 0.25 });
    
    if (statsSection) statsObserver.observe(statsSection);

    // --- NAV LINK TRACKING MECHANIC ---
    const sections = document.querySelectorAll('section, header');
    
    function trackNavigationState() {
        let currentPos = window.scrollY + 160;

        sections.forEach(section => {
            if (section.id) {
                const top = section.offsetTop;
                const height = section.offsetHeight;

                if (currentPos >= top && currentPos < top + height) {
                    navLinkItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }

    // --- DATA CAPTURE INTERCEPT ENGINE ---
    const leadForm = document.getElementById('lead-form');
    const formFeedback = document.getElementById('form-feedback');

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = leadForm.querySelector('.form-submit-btn');
        const defaultText = submitBtn.textContent;
        submitBtn.textContent = "Establishing Secure Connection Channel...";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = defaultText;
            submitBtn.disabled = false;
            
            formFeedback.style.color = "var(--primary-green)";
            formFeedback.textContent = "Data parameters secured. A senior KV growth expert will connect on call within 4 business hours.";
            
            leadForm.reset();
        }, 1200);
    });
});