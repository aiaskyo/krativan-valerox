document.addEventListener('DOMContentLoaded', () => {
    
    // --- APP SCROLL LIFECYCLE MANAGEMENT ---
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');

    if (window) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                if (scrollProgress) scrollProgress.style.width = `${progress}%`;
            }

            if (window.scrollY > 120) {
                if (navbar) navbar.classList.add('scrolled');
                if (backToTopBtn) backToTopBtn.classList.add('visible');
            } else {
                if (navbar) navbar.classList.remove('scrolled');
                if (backToTopBtn) backToTopBtn.classList.remove('visible');
            }
            trackNavigationState();
        });
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- RESPONSIVE DRAWER MANAGEMENT ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link-item');

    if (mobileMenuBtn && navLinks) {
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
    }

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

    // --- FIXED: NATIVE INTERSECTION REVEAL CONTROLLERS ---
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

    // =========================================================================
    // --- INTEGRATED MODAL INTAKE FORM & RAZORPAY BILLING PIPELINE ENGINE ---
    // =========================================================================
    const selectedPlans = {};
    const summaryBar = document.getElementById('billing-summary-bar');
    const plansListText = document.getElementById('selected-plans-list');
    const totalBillText = document.getElementById('total-bill-amount');
    
    const openModalBtn = document.getElementById('open-form-modal-btn');
    const intakeModal = document.getElementById('intake-form-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalPlansText = document.getElementById('modal-auto-plans');
    const intakeForm = document.getElementById('intake-checkout-form');

    let globalFinalBillAmount = 0;
    let globalFinalItemsDesc = "";

    const updateBillingCalculation = () => {
        let finalBillTotal = 0;
        let selectedNames = [];

        Object.keys(selectedPlans).forEach(planId => {
            const plan = selectedPlans[planId];
            finalBillTotal += (plan.basePrice * plan.months);
            selectedNames.push(`${plan.name} (${plan.months} Mo)`);
        });

        globalFinalBillAmount = finalBillTotal;
        globalFinalItemsDesc = selectedNames.join(' + ');

        if (finalBillTotal > 0) {
            if (summaryBar) summaryBar.style.display = 'block';
            if (plansListText) plansListText.textContent = selectedNames.join(', ');
            if (totalBillText) totalBillText.textContent = `₹${finalBillTotal.toLocaleString('en-IN')}`;
            if (modalPlansText) modalPlansText.textContent = selectedNames.join(' | ');
        } else {
            if (summaryBar) summaryBar.style.display = 'none';
        }
    };

    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        const planId = `plan_id_${index}`;
        const planName = card.getAttribute('data-plan-name');
        const basePrice = parseInt(card.getAttribute('data-base-price'), 10);
        const selectButton = card.querySelector('.toggle-select-btn');
        const monthsDropdown = card.querySelector('.plan-months-select');

        if (!selectButton || !planName) return;

        monthsDropdown.addEventListener('change', () => {
            if (selectedPlans[planId]) {
                selectedPlans[planId].months = parseInt(monthsDropdown.value, 10);
                updateBillingCalculation();
            }
        });

        selectButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (selectedPlans[planId]) {
                delete selectedPlans[planId];
                selectButton.textContent = "Add to Collective Matrix";
                selectButton.classList.remove('btn-gold');
                card.style.borderColor = 'var(--border-glass)';
            } else {
                selectedPlans[planId] = {
                    name: planName,
                    basePrice: basePrice,
                    months: parseInt(monthsDropdown.value, 10)
                };
                selectButton.textContent = "✓ Included in Matrix Pack";
                selectButton.classList.add('btn-gold');
                card.style.borderColor = 'var(--primary-gold)';
            }
            updateBillingCalculation();
        });
    });

    if (openModalBtn && intakeModal) {
        openModalBtn.addEventListener('click', () => {
            if (globalFinalBillAmount <= 0) return alert("Select at least one strategy plan framework asset.");
            intakeModal.classList.add('active');
        });
    }

    if (closeModalBtn && intakeModal) {
        closeModalBtn.addEventListener('click', () => {
            intakeModal.classList.remove('active');
        });
    }

    if (intakeForm) {
        intakeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const clientName = document.getElementById('modal-name').value;
            const clientPhone = document.getElementById('modal-phone').value;
            const clientEmail = document.getElementById('modal-email').value;
            const clientBusiness = document.getElementById('modal-business').value;

            intakeModal.classList.remove('active');

            const razorpayGatewayOptions = {
                "key": "rzp_test_T8BI8EcMMbqM9I", 
                "amount": globalFinalBillAmount * 100, 
                "currency": "INR",
                "name": "KRATIVAN VALEROX",
                "description": globalFinalItemsDesc,
                "image": "https://krativanvalerox.com/assets/og-luxury.jpg",
                "handler": function (response) {
                    document.getElementById('hidden-client-name').value = clientName;
                    document.getElementById('hidden-client-phone').value = clientPhone;
                    document.getElementById('hidden-client-email').value = clientEmail;
                    document.getElementById('hidden-client-business').value = clientBusiness;
                    document.getElementById('hidden-plan-name').value = globalFinalItemsDesc;
                    document.getElementById('hidden-plan-cost').value = `₹${globalFinalBillAmount}`;
                    document.getElementById('hidden-payment-id').value = response.razorpay_payment_id;

                    alert(`Payment Authorized Successfully! Transaction Reference ID: ${response.razorpay_payment_id}`);
                    const hiddenForm = document.getElementById('dashboard-hidden-form');
                    if (hiddenForm) hiddenForm.submit();
                },
                "prefill": {
                    "name": clientName,
                    "email": clientEmail,
                    "contact": clientPhone
                },
                "theme": {
                    "color": "#0B8F63"
                }
            };

            const paymentWindowInstance = new Razorpay(razorpayGatewayOptions);
            paymentWindowInstance.open();
        });
    }
});
