// ==========================================
// INSPIREWALL - INTERACTIVE ANIMATIONS
// Premium smooth scroll animations & form handling
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffect();
    initScrollAnimations();
    // init the local email form only if the MailerLite embed is not present
    if (!document.querySelector('#mlb2-34039006') && !document.querySelector('.ml-block-form')) {
        initEmailForm();
    }
    initLightbox();
    initSpotlight();
    initShowcaseRotator();
    initCardFocus();
    initAutoFocusCycle();
    initHeroScroll();
});

// Hero Scroll button behavior - click to scroll to the showcase section
function initHeroScroll() {
    const btn = document.getElementById('heroScroll');
    if (!btn) return;
    const target = document.getElementById('showcase');
    if (!target) return;

    // Add a pulse class to the button for visual emphasis (can be removed on interaction)
    btn.classList.add('pulse');

    // Scroll to showcase on click, and give focus to the first wallpaper for accessibility
    btn.addEventListener('click', () => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // After scrolling, set focus to the first wallpaper card if available
        setTimeout(() => {
            const firstCard = target.querySelector('.wallpaper-card');
            if (firstCard) {
                firstCard.focus();
                // Remove pulse when user interacts
                btn.classList.remove('pulse');
            }
        }, 500); // slight delay ensures element is in view
    });

    // Keyboard handler for accessibility
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
}

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
            // show specific error if available, otherwise generic message
            showError(error && error.message ? error.message : 'Something went wrong. Please try again.');
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
    // This function attempts to POST the email to a server-side endpoint
    // hosted on the same origin at /api/subscribe. The server (Express, serverless function, etc.)
    // should validate and store / forward the email to an email service provider.
    
    // Preferred endpoint: POST /api/subscribe with JSON body { email }
    const endpoint = '/api/subscribe';
    const fallbackLocalDev = 'http://localhost:3001/api/subscribe';

    try {
        let res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        // If same-origin endpoint is not available (404/other), try a local dev server
        if (!res.ok && (res.status === 404 || res.status === 0)) {
            try {
                res = await fetch(fallbackLocalDev, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
            } catch (e) {/* ignore then fallback later */}
        }

        if (!res.ok) {
            // Parse error body if available
            let errorText = 'Failed to submit email';
            try { const errJson = await res.json(); if (errJson && errJson.error) errorText = errJson.error; } catch (e) {}
            // Fallback: still store locally
            storeEmailLocally(email);
            throw new Error(errorText);
        }

        const json = await res.json();
        // If the server returns success: true, return the object
        if (json && json.success) {
            // Keep a local backup too
            try { storeEmailLocally(email); } catch (e) { /* ignore */ }
            return json;
        } else {
            // fallback
            storeEmailLocally(email);
            throw new Error(json && json.error ? json.error : 'Unknown server response');
        }
    } catch (err) {
        // If network failure or server doesn't exist, fallback to storing locally
        console.warn('submitEmailToWishlist error; storing locally as fallback', err);
        try { storeEmailLocally(email); } catch (e) { /* ignore */ }
        // Re-throw so callers know there was an error
        throw err;
    }
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

// Simple Lightbox: click to enlarge wallpaper
function initLightbox() {
    const images = document.querySelectorAll('.wallpaper-image img');
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightboxImage');
    const lbClose = document.getElementById('lightboxClose');

    if (!images.length || !lightbox || !lbImage) return;

    const open = (src, alt) => {
        clearCardFocus();
        lbImage.src = src;
        lbImage.alt = alt || '';
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Clear src after transition so video/media will stop, etc.
        setTimeout(() => { lbImage.src = ''; lbImage.alt = ''; }, 300);
    };

    // Use double-click to open the lightbox so single click can be used for expand-in-place
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('dblclick', () => open(img.src, img.alt));
    });

    // Close listeners
    lbClose && lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

// Expand in-place: clicking a wallpaper card enlarges it in the grid

// Spotlight overlay (small enlarged preview triggered by single click)
function initSpotlight() {
    const images = document.querySelectorAll('.wallpaper-image img');
    const spotlight = document.getElementById('spotlight');
    const spImage = document.getElementById('spotlightImage');
    const spClose = document.getElementById('spotlightClose');

    if (!images.length || !spotlight || !spImage) return;

    let expandedCard = null;

    const open = (src, alt, card) => {
        clearCardFocus();
        spImage.src = src;
        spImage.alt = alt || '';
        spotlight.classList.add('show');
        spotlight.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (card) {
            card.classList.add('is-expanded');
            expandedCard = card;
        }
    };

    const close = () => {
        spotlight.classList.remove('show');
        spotlight.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (expandedCard) {
            expandedCard.classList.remove('is-expanded');
            expandedCard = null;
        }
        // Clear src after transition to stop media
        setTimeout(() => { spImage.src = ''; spImage.alt = ''; }, 250);
    };

    images.forEach(img => {
        const card = img.closest('.wallpaper-card');
        let clickTimer = null;

        img.addEventListener('click', (e) => {
            // Use a short timeout so we can detect dblclick (cancel single-click when double-click occurs)
            if (clickTimer) clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                open(img.src, img.alt, card);
                clickTimer = null;
            }, 220);
        });

        // If the image gets double-clicked, cancel the single-click timer and let the dblclick handler
        // (set in initLightbox) trigger the full-screen lightbox without opening the spotlight.
        img.addEventListener('dblclick', () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
            }
        });
    });

    // Close listeners
    spClose && spClose.addEventListener('click', close);
    spotlight.addEventListener('click', (e) => {
        if (e.target === spotlight) close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Utility: clear card focus/dim classes
function clearCardFocus() {
    const cards = document.querySelectorAll('.wallpaper-card');
    cards.forEach(c => c.classList.remove('is-focused', 'is-dimmed'));
}

// ==========================================
// SHOWCASE ROTATOR - Randomized 3-card selection
// ==========================================
async function initShowcaseRotator() {
    const cardEls = Array.from(document.querySelectorAll('.showcase-container .wallpaper-card'));
    if (!cardEls || !cardEls.length) return;

    const imgEls = cardEls.map(c => c.querySelector('img'));
    const descEls = cardEls.map(c => c.querySelector('.description-text'));

    // Fetch manifest (optional). If not found, use a fallback list.
    let manifest = [];
    try {
        // Prefer root manifest (wallpapers.json) but fallback to assets version
        let res = await fetch('wallpapers.json', { cache: 'no-cache' });
        if (!res.ok) res = await fetch('assets/wallpapers.json', { cache: 'no-cache' });
        if (res && res.ok) {
            manifest = await res.json();
        }
    } catch (err) {
        console.warn('No wallpapers.json found or failed to load. Using fallback assets.');
    }

    // Fallback default list (if manifest is empty)
    if (!manifest || !manifest.length) {
        manifest = [
            { src: 'assets/wallpaper-1.jpg', alt: 'InspireWall motivational wallpaper 1', desc: 'Find focus in quiet moments — daily motivation.' },
            { src: 'assets/wallpaper-2.jpg', alt: 'InspireWall motivational wallpaper 2', desc: 'Small wins add up — celebrate progress.' },
            { src: 'assets/wallpaper-3.jpg', alt: 'InspireWall motivational wallpaper 3', desc: 'Create the life you want, one step at a time.' },
            { src: 'assets/wallpaper-4.jpg', alt: 'InspireWall motivational wallpaper 4', desc: 'Start strong, stay steady — consistency multiplies results.' },
            { src: 'assets/wallpaper-5.jpg', alt: 'InspireWall motivational wallpaper 5', desc: 'Dream, plan, execute — repeat.' }
        ];
    }

    // Filter out invalid entries with empty src or non-string src
    manifest = manifest.filter(m => m && typeof m.src === 'string' && m.src.trim());

    if (!manifest.length) {
        console.warn('No valid wallpaper entries found in manifest; using fallback assets.');
        manifest = [
            { src: 'assets/wallpaper-1.jpg', alt: 'InspireWall motivational wallpaper 1', desc: 'Find focus in quiet moments — daily motivation.' },
            { src: 'assets/wallpaper-2.jpg', alt: 'InspireWall motivational wallpaper 2', desc: 'Small wins add up — celebrate progress.' },
            { src: 'assets/wallpaper-3.jpg', alt: 'InspireWall motivational wallpaper 3', desc: 'Create the life you want, one step at a time.' },
            { src: 'assets/wallpaper-4.jpg', alt: 'InspireWall motivational wallpaper 4', desc: 'Start strong, stay steady — consistency multiplies results.' },
            { src: 'assets/wallpaper-5.jpg', alt: 'InspireWall motivational wallpaper 5', desc: 'Dream, plan, execute — repeat.' }
        ];
    }

    const numberOfCards = cardEls.length;
    const rotateInterval = 10000; // 10 seconds
    const fadeDuration = 350; // matches CSS

    // Utility: choose k unique random indices from 0..n-1
    function chooseUniqueIndices(n, kDesired) {
        const k = Math.max(0, kDesired || 0);
        const res = [];
        const used = new Set();
        if (n <= 0) return res;
        if (n >= k) {
            while (res.length < k) {
                const idx = Math.floor(Math.random() * n);
                if (!used.has(idx)) {
                    used.add(idx);
                    res.push(idx);
                }
            }
        } else {
            // Not enough unique items; repeat random picks but avoid immediate duplicates when possible
            const shuffled = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
            while (res.length < k) {
                res.push(shuffled[res.length % n]);
            }
        }
        return res;
    }

    // Populate cards with chosen indices
    function updateCards(indices) {
        cardEls.forEach((card, i) => {
            const img = imgEls[i];
            const desc = descEls[i];
            const entry = manifest[indices[i]];

            if (!entry) return;

            // Preload image for smoother swap
            const pre = new Image();
            pre.src = entry.src;
            pre.onload = () => {
                img.src = entry.src;
                img.alt = entry.alt || entry.desc || '';
            };

            // Update description text
            desc.textContent = entry.desc || '';
        });
    }

    // Transition wrapper to fade out, change content, fade in
    function transitionTo(indices) {
        // Don't auto-rotate while a modal overlay is open (spotlight or full lightbox)
        const lightbox = document.getElementById('lightbox');
        const spotlightEl = document.getElementById('spotlight');
        if ((lightbox && lightbox.classList.contains('show')) || (spotlightEl && spotlightEl.classList.contains('show'))) {
            return;
        }
        cardEls.forEach(card => card.classList.add('transitioning'));
        setTimeout(() => {
            updateCards(indices);
            // immediately emit an event so listeners (such as focus cycle) can sync
            try {
                document.dispatchEvent(new CustomEvent('showcase:rotated', { detail: { indices, rotateInterval, numberOfCards } }));
            } catch (err) {
                // ignore browsers that don't support CustomEvent constructor
            }
            // ensure images are visible after swap
            setTimeout(() => cardEls.forEach(card => card.classList.remove('transitioning')), 50);
        }, fadeDuration);
    }

    // Start initial load
    let curIndices = chooseUniqueIndices(manifest.length, numberOfCards);
    transitionTo(curIndices);

    // Start rotation timer
    setInterval(() => {
        // pick new selection (they must be unique within the set); ensure it's not the same as current
        let attempts = 5;
        let newIndices;
        do {
            newIndices = chooseUniqueIndices(manifest.length, numberOfCards);
            attempts--;
        } while (arraysEqual(newIndices, curIndices) && attempts > 0);

        // If still equal after attempts, we'll rotate anyway; otherwise update curIndices
        curIndices = newIndices;
        transitionTo(curIndices);
    }, rotateInterval);

    function arraysEqual(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }
}

// ==========================================
// CARD FOCUS HANDLERS
// Add highlight to hovered/focused card and dim others
// ==========================================
function initCardFocus() {
    const container = document.querySelector('.showcase-container');
    const cards = Array.from(container.querySelectorAll('.wallpaper-card'));
    if (!container || !cards.length) return;

    function clearFocus() {
        cards.forEach(c => c.classList.remove('is-focused', 'is-dimmed'));
    }

    cards.forEach(card => {
        // Only apply highlight behaviour when not in a modal view
        card.addEventListener('mouseenter', () => {
            if (document.querySelector('#lightbox.show') || document.querySelector('#spotlight.show')) return;
            cards.forEach(c => {
                if (c === card) c.classList.add('is-focused'); else c.classList.add('is-dimmed');
            });
        });

        card.addEventListener('mouseleave', () => {
            clearFocus();
        });

        // Keyboard focus support
        card.addEventListener('focusin', () => {
            if (document.querySelector('#lightbox.show') || document.querySelector('#spotlight.show')) return;
            cards.forEach(c => {
                if (c === card) c.classList.add('is-focused'); else c.classList.add('is-dimmed');
            });
        });

        card.addEventListener('focusout', () => {
            clearFocus();
        });
    });
}

// ==========================================
// AUTO FOCUS CYCLE: automatically focus cards every 10 seconds
// starts with 1, then 2, then 3, then repeats
// pauses on user interaction (hover/focus) or when a modal is open
// ==========================================
function initAutoFocusCycle() {
    const container = document.querySelector('.showcase-container');
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.wallpaper-card'));
    if (!cards.length) return;

    let current = 0; // starts at card 0 (showcase wallpaper 1)
    const defaultRotateInterval = 10000; // fallback 10 seconds
    let intervalId = null; // per-step interval
    let rotationTimeout = null; // to ensure per-rotation cleanup
    let manualInteraction = false; // set true when user is hovering/focusing

    function applyFocus(index) {
        // If a modal overlay is open, skip focus changes
        if (document.querySelector('#lightbox.show') || document.querySelector('#spotlight.show')) return;
        if (manualInteraction) return; // respect user interactions

        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('is-focused');
                card.classList.remove('is-dimmed');
            } else {
                card.classList.remove('is-focused');
                card.classList.add('is-dimmed');
            }
        });
    }

    // (Re)start a per-rotation focus cycle where we move through cards inside the rotation interval
    function startPerRotationCycle(rotationPeriod = defaultRotateInterval) {
        // clear old intervals and timeouts
        if (intervalId) clearInterval(intervalId);
        if (rotationTimeout) clearTimeout(rotationTimeout);

        // Each step should occur inside the rotation period; divide evenly
        const stepDuration = Math.max(400, Math.round(rotationPeriod / Math.max(1, cards.length))); // don't be too short

        // Start with the current index (usually 0) and advance through cards during the rotationPeriod
        current = 0;
        applyFocus(current);

        intervalId = setInterval(() => {
            if (manualInteraction) return; // respect manual user input
            current = (current + 1) % cards.length;
            applyFocus(current);
        }, stepDuration);

        // Ensure cycle stops once the rotationPeriod elapses to avoid overlap with next rotation
        rotationTimeout = setTimeout(() => {
            if (intervalId) { clearInterval(intervalId); intervalId = null; }
        }, rotationPeriod + 50);
    }

    // Stop and clear focus (reset brightness) - used when a user manually interacts
    function stop() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    // Add event listeners to pause while the user manually interacts
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            manualInteraction = true;
            stop();
        });
        card.addEventListener('mouseleave', () => {
            manualInteraction = false;
            // resume cycle after a small delay to avoid immediate jumps
            setTimeout(() => { if (!manualInteraction) startPerRotationCycle(defaultRotateInterval); }, 600);
        });
        card.addEventListener('focusin', () => {
            manualInteraction = true;
            stop();
        });
        card.addEventListener('focusout', () => {
            manualInteraction = false;
            setTimeout(() => { if (!manualInteraction) startPerRotationCycle(defaultRotateInterval); }, 600);
        });
    });

    // Pause while overlays are open and resume when closed
    const lightbox = document.getElementById('lightbox');
    const spotlight = document.getElementById('spotlight');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // If clicking to close (target is the overlay), resume automatically
            if (e.target === lightbox) { startPerRotationCycle(defaultRotateInterval); }
        });
    }
    if (spotlight) {
        spotlight.addEventListener('click', (e) => {
            if (e.target === spotlight) { startPerRotationCycle(defaultRotateInterval); }
        });
    }

    // watch for escape key to resume
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') startPerRotationCycle(defaultRotateInterval);
    });

    // Start an initial per-rotation focus cycle so the first rotation has focus changes
    startPerRotationCycle(defaultRotateInterval);

    // Listen for actual showcase rotation events to resync the per-rotation cycle
    document.addEventListener('showcase:rotated', (e) => {
        const rotationPeriod = (e && e.detail && e.detail.rotateInterval) || defaultRotateInterval;
        // reset current to 0 and start per-rotation cycling timed to rotationPeriod
        startPerRotationCycle(rotationPeriod);
    });
}
