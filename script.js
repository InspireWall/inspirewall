// ==========================================
// INSPIREWALL - INTERACTIVE ANIMATIONS
// Premium smooth scroll animations & form handling
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffect();
    initScrollAnimations();
    initEmailForm();
});

// ==========================================
// PARALLAX EFFECT - Hero Section
// ==========================================
function initParallaxEffect() {
    const hero = document.getElementById('hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        // Parallax effect on hero content
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS - Reveal on Scroll
// ==========================================
function initScrollAnimations() {
    // Create intersection observer for reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on data attribute
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                
                // Unobserve after animation triggers (optional - for performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal animation
    const revealElements = document.querySelectorAll('.reveal-up, .wallpaper-card, .wishlist-content');
    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// EMAIL FORM - Wishlist Submission
// ==========================================
function initEmailForm() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
    
    if (!form || !emailInput || !successMessage) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Disable form during submission
        form.classList.add('submitting');
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;
        
        try {
            // Submit email to your backend/service
            await submitEmailToWishlist(email);
            
            // Show success message
            showSuccess();
            
            // Clear form
            emailInput.value = '';
            
        } catch (error) {
            console.error('Submission error:', error);
            showError('Something went wrong. Please try again.');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        } finally {
            form.classList.remove('submitting');
        }
    });
    
    // Input focus animation enhancement
    emailInput.addEventListener('focus', () => {
        emailInput.parentElement.classList.add('focused');
    });
    
    emailInput.addEventListener('blur', () => {
        emailInput.parentElement.classList.remove('focused');
    });
}

// ==========================================
// EMAIL VALIDATION
// ==========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// EMAIL SUBMISSION - Backend Integration
// ==========================================
async function submitEmailToWishlist(email) {
    // REPLACE THIS WITH YOUR ACTUAL BACKEND ENDPOINT
    // Options: 
    // 1. Mailchimp API
    // 2. ConvertKit
    // 3. Custom backend (Node.js, Python, etc.)
    // 4. Google Sheets via Google Apps Script
    // 5. Firebase
    
    // Example with a mock API delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful submission
            console.log('Email submitted:', email);
            
            // Store in localStorage as backup (optional)
            storeEmailLocally(email);
            
            resolve({ success: true });
            
            // For testing errors:
            // reject(new Error('API error'));
        }, 1000);
    });
    
    // EXAMPLE: Real fetch implementation
    /*
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit email');
    }
    
    return await response.json();
    */
}

// ==========================================
// LOCAL STORAGE BACKUP
// ==========================================
function storeEmailLocally(email) {
    try {
        const timestamp = new Date().toISOString();
        const stored = localStorage.getItem('inspirewall_emails') || '[]';
        const emails = JSON.parse(stored);
        
        emails.push({ email, timestamp });
        
        localStorage.setItem('inspirewall_emails', JSON.stringify(emails));
        console.log('Email stored locally');
    } catch (error) {
        console.error('Local storage error:', error);
    }
}

// ==========================================
// SUCCESS MESSAGE DISPLAY
// ==========================================
function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('emailForm');
    
    // Hide form
    form.style.opacity = '0';
    form.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        form.style.display = 'none';
        successMessage.classList.add('show');
    }, 400);
}

// ==========================================
// ERROR MESSAGE DISPLAY
// ==========================================
function showError(message) {
    const emailInput = document.getElementById('emailInput');
    
    // Create error message element if it doesn't exist
    let errorEl = document.querySelector('.error-message');
    
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        emailInput.parentElement.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    errorEl.style.color = '#ff4444';
    errorEl.style.fontSize = '0.875rem';
    errorEl.style.marginTop = '0.5rem';
    errorEl.style.animation = 'fadeIn 0.3s ease';
    
    // Shake animation for input
    emailInput.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        emailInput.style.animation = '';
    }, 500);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        if (errorEl) {
            errorEl.style.display = 'none';
        }
    }, 3000);
}

// ==========================================
// SMOOTH SCROLL ENHANCEMENT
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// PAGE LOAD OPTIMIZATION
// ==========================================
window.addEventListener('load', () => {
    // Remove loading class if present
    document.body.classList.remove('loading');
    
    // Lazy load images optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// ==========================================
// PERFORMANCE MONITORING (Optional)
// ==========================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ==========================================
// UTILITY: Shake Animation (CSS-in-JS)
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
