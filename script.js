// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Make functions globally available
    window.downloadCV = downloadCV;
    window.scrollToPortfolio = scrollToPortfolio;
    window.scrollToSection = scrollToSection;
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    const typingText = document.querySelector('.typing-text');
    const typingTextHero = document.querySelector('.typing-text-hero');
    
    // Performance optimization: Use requestAnimationFrame for smooth animations
    let animationFrameId;
    
    // ===== CUSTOM MOUSE POINTER =====
    const customMousePointer = document.getElementById('customMousePointer');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Smooth cursor following with easing
    function updateMousePointer() {
        cursorX += (mouseX - cursorX) * 0.15; // Smooth following
        cursorY += (mouseY - cursorY) * 0.15;
        
        if (customMousePointer) {
            customMousePointer.style.left = cursorX + 'px';
            customMousePointer.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(updateMousePointer);
    }
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show pointer when mouse moves
        if (customMousePointer) {
            customMousePointer.style.opacity = '1';
        }
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, .btn, .nav-link, .portfolio-card, .filter-btn, .portfolio-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (customMousePointer) {
                customMousePointer.classList.add('hover');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (customMousePointer) {
                customMousePointer.classList.remove('hover');
            }
        });
        
        element.addEventListener('mousedown', () => {
            if (customMousePointer) {
                customMousePointer.classList.add('click');
            }
        });
        
        element.addEventListener('mouseup', () => {
            if (customMousePointer) {
                customMousePointer.classList.remove('click');
            }
        });
    });
    
    // Start mouse pointer animation
    updateMousePointer();
    
    // Preloader typing animation - Optimized for performance
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                // Use requestAnimationFrame for smoother performance
                animationFrameId = requestAnimationFrame(() => {
                    setTimeout(type, speed);
                });
            }
        }
        type();
    }
    
    // Preloader text content - Optimized for speed
    const preloaderTexts = [
        'Loading...',
        'Ready!'
    ];
    
    let currentTextIndex = 0;
    
    function cyclePreloaderText() {
        typeWriter(typingText, preloaderTexts[currentTextIndex], 60); // Faster typing
        currentTextIndex = (currentTextIndex + 1) % preloaderTexts.length;
    }
    
    // Start preloader text cycling - Faster cycle
    cyclePreloaderText();
    setInterval(cyclePreloaderText, 1500); // Reduced from 2000ms
    
    // Hide preloader after 1.5 seconds - Much faster
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Clean up animation frame for performance
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        }, 300); // Reduced from 500ms
    }, 1500); // Reduced from 3000ms
    
    // ===== HERO TYPING EFFECT =====
    const heroTexts = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Creative Problem Solver',
        'Tech Enthusiast'
    ];
    
    let heroTextIndex = 0;
    
    function typeHeroText() {
        typeWriter(typingTextHero, heroTexts[heroTextIndex], 100);
        heroTextIndex = (heroTextIndex + 1) % heroTexts.length;
    }
    
    // Start hero typing effect after preloader - Faster start
    setTimeout(() => {
        typeHeroText();
        setInterval(typeHeroText, 3000);
    }, 1800); // Reduced from 3500ms to match new preloader timing
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log(`Switching theme from ${currentTheme} to ${newTheme}`);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add theme transition class
        body.classList.add('theme-transitioning');
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
        
        // Debug: Log current theme state
        console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
        console.log('Body theme:', body.getAttribute('data-theme'));
    });
    
    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
    
    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== SCROLL PROGRESS BAR =====
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgressBar.style.width = scrollPercent + '%';
    });
    
    // ===== PORTFOLIO FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ===== SKILL PROGRESS BARS =====
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // ===== ACHIEVEMENT COUNTERS =====
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    
    function animateCounters() {
        achievementNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // ===== SCROLL TRIGGERED ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate skill bars when about section is visible
                if (element.id === 'about') {
                    setTimeout(animateSkillBars, 500);
                    setTimeout(animateCounters, 1000);
                }
                
                // Add animation classes
                element.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    // Handle floating labels
    const formInputs = contactForm.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Check if input has content on page load
        if (input.value.trim() !== '') {
            input.classList.add('has-content');
        }
        
        // Handle input events
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
        
        // Handle focus events
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Submit to Formspree
        console.log('Submitting form to:', this.action);
        console.log('Form data:', Object.fromEntries(formData));
        
        // Try fetch first, fallback to traditional form submission
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (response.ok) {
                // Show success message
                showNotification('Message sent successfully! Check your email for confirmation.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                submitButton.disabled = false;
            } else {
                throw new Error(`Form submission failed with status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            
            // Fallback: Try traditional form submission
            console.log('Trying traditional form submission...');
            
            // Create a temporary form and submit it
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = this.action;
            tempForm.style.display = 'none';
            
            // Add form data
            for (let [key, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }
            
            // Add to DOM and submit
            document.body.appendChild(tempForm);
            tempForm.submit();
            
            // Show success message (assuming it worked)
            showNotification('Message sent! Redirecting to confirmation page...', 'success');
            
            // Reset button
            submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
            submitButton.disabled = false;
            
            // Remove temporary form
            setTimeout(() => {
                document.body.removeChild(tempForm);
            }, 1000);
        });
    });
    
    // ===== NOTIFICATION SYSTEM =====
    // Make showNotification globally available
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon, background;
        switch(type) {
            case 'success':
                icon = 'check-circle';
                background = '#10b981';
                break;
            case 'error':
                icon = 'exclamation-circle';
                background = '#ef4444';
                break;
            default:
                icon = 'info-circle';
                background = '#6366f1';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${background};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== LAZY LOADING IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== SMOOTH SCROLLING FOR ALL INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // ===== PARALLAX EFFECTS =====
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particles, .gradient-waves');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // ===== CURSOR EFFECTS =====
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll handlers
    const optimizedScrollHandler = debounce(() => {
        updateActiveNavLink();
        updateParallax();
    }, 16);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Keyboard navigation for portfolio filters
    filterButtons.forEach((button, index) => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-pressed', button.classList.contains('active'));
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    // ===== INITIALIZATION =====
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Add loading class to body
    body.classList.add('loaded');
    
    // Console welcome message
    console.log(`
    🚀 Portfolio Website Loaded Successfully!
    
    Features:
    ✅ Preloader with typing animation
    ✅ Dark/Light theme toggle
    ✅ Smooth scrolling navigation
    ✅ Portfolio filtering system
    ✅ Skill progress bars
    ✅ Achievement counters
    ✅ Scroll-triggered animations
    ✅ Contact form handling
    ✅ Responsive design
    ✅ Accessibility features
    
    Made with ❤️ using HTML5, CSS3, Bootstrap 5, and JavaScript
    `);
    
});

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Scroll to section by ID
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollTo(section);
    }
}

// Handle CV download
function handleCVDownload() {
    // Show success notification
    if (typeof showNotification === 'function') {
        showNotification('CV downloaded successfully!', 'success');
    }
    
    // Track download event
    if (typeof trackEvent === 'function') {
        trackEvent('CV', 'download', 'About Section');
    }
}

// CV download function
function downloadCV() {
    try {
        // Open CV page in new tab
        window.open('cv.html', '_blank');
        
        // Show success notification
        if (typeof showNotification === 'function') {
            showNotification('CV page opened successfully!', 'success');
        }
        
        // Track download event
        if (typeof trackEvent === 'function') {
            trackEvent('CV', 'view', 'About Section');
        }
    } catch (error) {
        console.error('Error opening CV:', error);
        alert('Error opening CV. Please try again.');
    }
}

// Simplified portfolio scroll function
function scrollToPortfolio() {
    try {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            smoothScrollTo(portfolioSection);
        } else {
            console.error('Portfolio section not found!');
        }
    } catch (error) {
        console.error('Error scrolling to portfolio:', error);
    }
}



// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed - this is normal for local development');
            });
    });
}

// ===== ANALYTICS (OPTIONAL) =====
// Add your analytics code here if needed
window.trackEvent = function(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// ===== PROJECT DEMO FUNCTIONS =====
// Make function globally available
window.openProjectDemo = function(projectId, title, description, tags, githubUrl, demoUrl) {

    
    try {
        // Get modal elements
        const modal = document.getElementById('projectDemoModal');
        const modalTitle = document.querySelector('#projectDemoModal .modal-title');
        const projectTitle = document.querySelector('.demo-project-title');
        const projectDesc = document.querySelector('.demo-project-description');
        const projectTags = document.querySelector('.demo-project-tags');
        const viewCodeBtn = document.getElementById('viewCodeBtn');
        const fullScreenBtn = document.getElementById('fullScreenBtn');
        const demoIframe = document.getElementById('demoIframe');
        const demoLoading = document.querySelector('.demo-loading');
        

        
        if (!modal) {
            console.error('Modal not found!');
            alert('Demo modal not found. Please refresh the page.');
            return;
        }
    
    // Set project information
    modalTitle.textContent = title;
    projectTitle.textContent = title;
    projectDesc.textContent = description;
    
    // Set GitHub link
    viewCodeBtn.href = githubUrl;
    
    // Generate tags
    projectTags.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Set up demo iframe
    if (demoUrl && demoUrl !== '#') {
        demoLoading.style.display = 'block';
        demoIframe.style.display = 'none';
        
        // Load demo URL in iframe
        demoIframe.src = demoUrl;
        demoIframe.onload = function() {
            demoLoading.style.display = 'none';
            demoIframe.style.display = 'block';
        };
        
        // Handle iframe load errors
        demoIframe.onerror = function() {
            demoLoading.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle text-warning" style="font-size: 2rem;"></i>
                    <p class="mt-2">Demo not available</p>
                    <p class="text-muted">This project demo is currently unavailable.</p>
                </div>
            `;
        };
        
        // Enable full screen button
        fullScreenBtn.style.display = 'inline-block';
        fullScreenBtn.onclick = function() {
            window.open(demoUrl, '_blank');
        };
    } else {
        // No demo URL available
        demoLoading.innerHTML = `
            <div class="text-center">
                <i class="fas fa-info-circle text-info" style="font-size: 2rem;"></i>
                <p class="mt-2">Demo Preview</p>
                <p class="text-muted">This project doesn't have a live demo yet.</p>
            </div>
        `;
        fullScreenBtn.style.display = 'none';
    }
    
    // Populate features and tech stack based on project
    populateProjectDetails(projectId);
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    
    
    } catch (error) {
        console.error('Error in openProjectDemo:', error);
        alert('Error opening demo: ' + error.message);
    }
}

function populateProjectDetails(projectId) {
    const featuresList = document.getElementById('featuresList');
    const techStack = document.getElementById('techStack');
    
    // Project details database
    const projectDetails = {
        ecommerce: {
            features: [
                'User authentication and authorization',
                'Product catalog with search and filters',
                'Shopping cart and wishlist management',
                'Secure payment processing',
                'Order tracking and management',
                'Admin dashboard for product management',
                'Responsive design for all devices'
            ],
            tech: [
                'Frontend: React.js with Redux for state management',
                'Backend: Node.js with Express.js framework',
                'Database: MongoDB with Mongoose ODM',
                'Authentication: JWT tokens with bcrypt',
                'Payment: Stripe integration',
                'Deployment: AWS with Docker containers'
            ]
        },
        taskapp: {
            features: [
                'Task creation and management',
                'Priority levels and due dates',
                'Real-time synchronization',
                'Team collaboration features',
                'Progress tracking and analytics',
                'Push notifications',
                'Offline functionality'
            ],
            tech: [
                'Framework: React Native for cross-platform',
                'Backend: Firebase with Firestore',
                'State Management: Redux with Redux Toolkit',
                'Authentication: Firebase Auth',
                'Real-time: Firebase Cloud Firestore',
                'Deployment: App Store and Google Play'
            ]
        },
        brand: {
            features: [
                'Logo design and brand identity',
                'Color palette and typography system',
                'Marketing materials and templates',
                'Brand guidelines documentation',
                'Social media assets',
                'Print and digital collateral',
                'Brand strategy consultation'
            ],
            tech: [
                'Design Tools: Figma, Adobe Creative Suite',
                'Typography: Custom font selection',
                'Color Theory: Brand color psychology',
                'Vector Graphics: Scalable logo design',
                'Prototyping: Interactive mockups',
                'Collaboration: Client feedback system'
            ]
        },
        blog: {
            features: [
                'Content management system',
                'SEO optimization and meta tags',
                'User comments and moderation',
                'Category and tag organization',
                'Search functionality',
                'Responsive design',
                'Admin dashboard'
            ],
            tech: [
                'Frontend: Vue.js with Composition API',
                'Backend: Laravel PHP framework',
                'Database: MySQL with Eloquent ORM',
                'SEO: Meta tags and sitemap generation',
                'Authentication: Laravel Sanctum',
                'Deployment: DigitalOcean with Laravel Forge'
            ]
        },
        dashboard: {
            features: [
                'Real-time data visualization',
                'Interactive charts and graphs',
                'Customizable dashboard widgets',
                'Data filtering and sorting',
                'Export functionality (PDF, Excel)',
                'User role management',
                'Mobile responsive design'
            ],
            tech: [
                'Backend: Python with Flask framework',
                'Data Processing: Pandas and NumPy',
                'Visualization: D3.js and Chart.js',
                'Database: PostgreSQL with SQLAlchemy',
                'Real-time: WebSocket connections',
                'Deployment: Heroku with Redis caching'
            ]
        },
        fitness: {
            features: [
                'Workout tracking and planning',
                'Nutrition and calorie counting',
                'Health metrics monitoring',
                'Social features and challenges',
                'Progress analytics and charts',
                'Personalized recommendations',
                'Integration with wearables'
            ],
            tech: [
                'Framework: Flutter for cross-platform',
                'Language: Dart programming language',
                'Database: SQLite for local storage',
                'State Management: Provider pattern',
                'Charts: Flutter Charts library',
                'Deployment: App Store and Google Play'
            ]
        }
    };
    
    const project = projectDetails[projectId];
    if (project) {
        // Populate features
        featuresList.innerHTML = `
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        
        // Populate tech stack
        techStack.innerHTML = `
            <ul>
                ${project.tech.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
        `;
    }
}

// ===== FOOTER UTILITY FUNCTIONS =====
function showPrivacyPolicy() {
    if (typeof showNotification === 'function') {
        showNotification('Privacy Policy page will be available soon!', 'info');
    }
    // You can replace this with actual privacy policy page navigation
    console.log('Privacy Policy requested');
}

function showTermsOfService() {
    if (typeof showNotification === 'function') {
        showNotification('Terms of Service page will be available soon!', 'info');
    }
    // You can replace this with actual terms of service page navigation
    console.log('Terms of Service requested');
}

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.PortfolioUtils = {
    smoothScrollTo,
    scrollToSection,
    handleCVDownload,
    downloadCV,
    scrollToPortfolio,
    showNotification,
    trackEvent,
    showPrivacyPolicy,
    showTermsOfService,
    openProjectDemo,
    populateProjectDetails,
    updateMousePointer,
    updateTheme: function(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};
