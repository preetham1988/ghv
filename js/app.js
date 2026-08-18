/**
 * Global Healthcare Ventures (GHV)
 * UI/UX Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 2. Sticky Navbar & Scroll Spy
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run once
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 4. Hero Slider Logic (Testimonials & Insights)
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
            quote: "“GHV transformed our clinical operations. We gained the full leverage of a corporate MSO while keeping complete autonomy over patient care.”",
            author: "Internal Medicine Partner, North Texas",
            badge: "Physician Partnership"
        },
        {
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
            quote: "“The Amara Health model exemplifies modern primary care: unhurried, patient-centered, and clinically independent.”",
            author: "Amara Primary Care & Concierge",
            badge: "Amara Health Flagship"
        },
        {
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
            quote: "“Providing our workforce with dedicated, high-access primary care reduced downstream claims and improved wellness.”",
            author: "Corporate Client, North Texas",
            badge: "Employer Solutions"
        },
        {
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1200",
            quote: "“Clinical rotations with Amara physicians provided invaluable clinical acumen and mentorship for residency applications.”",
            author: "Medical Graduate Trainee",
            badge: "Student Rotations"
        }
    ];

    let currentSlide = 0;
    const sImg = document.getElementById('sImg');
    const sQuote = document.getElementById('sQuote');
    const sAuthor = document.getElementById('sAuthor');
    const sBadge = document.getElementById('sBadge');
    const sDots = document.getElementById('sDots');

    function updateSlider(index) {
        if (!sImg) return;
        currentSlide = index;
        
        // Simple fade effect
        sImg.style.opacity = '0';
        sQuote.style.opacity = '0';
        
        setTimeout(() => {
            sImg.src = slides[index].image;
            sQuote.innerText = slides[index].quote;
            sAuthor.innerText = slides[index].author;
            sBadge.innerText = slides[index].badge;
            
            sImg.style.opacity = '1';
            sQuote.style.opacity = '1';
            
            // Update dots
            document.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 300);
    }

    if (sDots) {
        // Create dots dynamically
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => updateSlider(i));
            sDots.appendChild(dot);
        });

        // Auto rotate
        setInterval(() => {
            const nextIndex = (currentSlide + 1) % slides.length;
            updateSlider(nextIndex);
        }, 6000);
    }

    // 5. Form Handling (UI Simulation)
    const form = document.getElementById('contactForm');
    const formBtn = document.getElementById('formBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalText = formBtn.innerHTML;
            formBtn.disabled = true;
            formBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';
            
            setTimeout(() => {
                form.reset();
                formBtn.classList.replace('btn-primary', 'btn-secondary');
                formBtn.innerHTML = '<i class="fa-solid fa-check"></i> Inquiry Received';
                
                setTimeout(() => {
                    formBtn.disabled = false;
                    formBtn.classList.replace('btn-secondary', 'btn-primary');
                    formBtn.innerHTML = originalText;
                }, 4000);
            }, 1500);
        });
    }
});
