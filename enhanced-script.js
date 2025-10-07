// Enhanced Interactive Features for ContentAI Landing Page

// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Enhanced IntersectionObserver with staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .post, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Enhanced live search with debouncing
const searchInput = document.getElementById('search');
const posts = document.querySelectorAll('.post');
let searchTimeout;

if (searchInput && posts.length > 0) {
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                posts.forEach(post => {
                    post.style.display = 'block';
                    post.classList.remove('highlight');
                });
                return;
            }
            
            let visibleCount = 0;
            posts.forEach(post => {
                const text = post.textContent.toLowerCase();
                const isVisible = text.includes(query);
                
                if (isVisible) {
                    post.style.display = 'block';
                    post.classList.add('highlight');
                    visibleCount++;
                    
                    // Highlight matching text
                    const regex = new RegExp(`(${query})`, 'gi');
                    post.innerHTML = text.replace(regex, '<mark>$1</mark>');
                } else {
                    post.style.display = 'none';
                    post.classList.remove('highlight');
                }
            });
            
            // Show no results message
            const noResults = document.querySelector('.no-results');
            if (visibleCount === 0) {
                if (!noResults) {
                    const msg = document.createElement('div');
                    msg.className = 'no-results';
                    msg.textContent = 'No posts found matching your search.';
                    msg.style.textAlign = 'center';
                    msg.style.padding = '2rem';
                    msg.style.color = '#888';
                    document.querySelector('#posts').appendChild(msg);
                }
            } else if (noResults) {
                noResults.remove();
            }
        }, 300);
    });
}

// Enhanced pricing card interactions
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove highlight from all cards
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.classList.remove('highlight');
        });
        
        // Add highlight to clicked card
        this.classList.add('highlight');
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Add hover sound effect (visual feedback)
    card.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
});

// Enhanced email form with validation
const emailForm = document.querySelector('#signup input[type="email"]');
const submitButton = document.querySelector('#signup button');

if (emailForm && submitButton) {
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    submitButton.addEventListener('click', function() {
        const email = emailForm.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const originalText = this.textContent;
        this.textContent = 'Signing up...';
        this.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Welcome aboard! Check your email for next steps.', 'success');
            emailForm.value = '';
            this.textContent = originalText;
            this.disabled = false;
            
            // Add success animation to form
            document.querySelector('#signup').classList.add('success');
            setTimeout(() => {
                document.querySelector('#signup').classList.remove('success');
            }, 600);
        }, 1500);
    });
    
    emailForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitButton.click();
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#hero');
    const heroContent = document.querySelector('.hero-headline');
    
    if (hero && heroContent) {
        const speed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add floating animation to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.classList.add('floating');
});

// Counter animation for stats (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.innerHTML = '☰';
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                color: #00ffcc;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            menuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(15,15,21,0.98)';
                navLinks.style.padding = '1rem';
                navLinks.style.backdropFilter = 'blur(10px)';
            });
            
            nav.appendChild(menuBtn);
        }
    }
}

// Initialize mobile menu
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Signing up')) return;
        
        const originalText = this.textContent;
        this.innerHTML = '<span class="loading"></span> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});