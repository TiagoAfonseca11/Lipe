// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

 // Animate elements when they come into view
 /*
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-content, .prop-card, .testimonial-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };*/

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Simple client logo slider animation
    const logoSlider = document.querySelector('.logos-slider');
    let scrollAmount = 0;
    const scrollSpeed = 1;

    function scrollLogos() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= logoSlider.scrollWidth / 2) {
            scrollAmount = 0;
        }
        logoSlider.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(scrollLogos);
    }

    // Only run on larger screens
    if (window.innerWidth > 768) {
        requestAnimationFrame(scrollLogos);
    }

    // Video fallback for mobile
    const heroVideo = document.querySelector('.hero-video video');
    if (window.innerWidth < 768) {
        heroVideo.poster = 'media/hero-fallback.jpg';
    }
    
    // Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Create success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-message success';
                successMsg.textContent = 'Thank you! Your message has been sent. We will contact you soon.';
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            // Create error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-message error';
            errorMsg.textContent = 'There was a problem sending your message. Please try again later.';
            contactForm.appendChild(errorMsg);
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove messages after 5 seconds
            setTimeout(() => {
                const messages = document.querySelectorAll('.form-message');
                messages.forEach(msg => msg.remove());
            }, 5000);
        });
    });
}
});
