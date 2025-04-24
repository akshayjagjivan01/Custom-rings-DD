// Enhanced scroll animations
function setupEnhancedAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in sections
    gsap.utils.toArray('.section-content').forEach(section => {
        gsap.from(section, { 
            opacity: 0, 
            y: 60, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // About section animations
    if (document.querySelector('.about')) {
        gsap.from('.about .text-column p', {
            opacity: 0,
            y: 30,
            stagger: 0.3,
            duration: 1,
            scrollTrigger: {
                trigger: '.about .text-column',
                start: "top 75%",
            }
        });
        
        gsap.from('.floating-image-container', {
            opacity: 0,
            x: 100,
            rotation: 5,
            duration: 1.5,
            scrollTrigger: {
                trigger: '.floating-image-container',
                start: "top 75%",
            }
        });
    }
    
    // Gallery stagger animation
    if (document.querySelector('.gallery-container')) {
        gsap.from('.gallery-item', {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.gallery-container',
                start: "top 75%",
            }
        });
    }
    
    // Form animation
    if (document.querySelector('.form-container')) {
        gsap.from('.form-container', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '.form-container',
                start: "top 80%",
            }
        });
        
        gsap.from('.input-group', {
            opacity: 0,
            x: -30,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.form-container',
                start: "top 75%",
            }
        });
    }
    
    // Parallax effects for background images
    gsap.utils.toArray('[class*="section"]').forEach(section => {
        if (window.getComputedStyle(section).backgroundImage !== 'none') {
            gsap.to(section, {
                backgroundPosition: `50% ${innerHeight / 2}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });
    
    // Animate luxury dividers
    gsap.utils.toArray('.luxury-divider').forEach(divider => {
        const line = divider.querySelector('.line');
        const dots = divider.querySelectorAll('.diamond-dot');
        
        gsap.from(line, {
            width: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: divider,
                start: "top 85%",
            }
        });
        
        gsap.from(dots, {
            opacity: 0,
            scale: 0,
            rotation: 45,
            duration: 1,
            stagger: 0.5,
            delay: 0.5,
            scrollTrigger: {
                trigger: divider,
                start: "top 85%",
            }
        });
    });
    
    // Animate section titles with text reveal effect
    gsap.utils.toArray('.section-title').forEach(title => {
        // Skip hero section titles which already have animations
        if (title.closest('.hero')) return;
        
        // Create a reveal animation
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
    });
    
    // Animate the logo diamond on scroll
    const diamondShape = document.querySelector('.diamond-shape');
    if (diamondShape) {
        gsap.to(diamondShape, {
            rotation: 360,
            duration: 3,
            ease: "none",
            repeat: -1,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                toggleActions: "play pause resume pause"
            }
        });
    }
    
    // 3D tilt effect on gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degree rotation
            const rotateX = (0.5 - yPercent) * 10; // -5 to 5 degree rotation
            
            gsap.to(this, {
                rotationY: rotateY,
                rotationX: rotateX,
                scale: 1.05,
                ease: "power2.out",
                duration: 0.5
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.5
            });
        });
    });
    
    // Creating a more elaborate animation for the process section
    if (document.querySelector('.process-timeline')) {
        // Animate each step with a staggered entrance
        gsap.from('.timeline-item', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.process-timeline',
                start: "top 75%",
            }
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Give a small delay to ensure other scripts have initialized
    setTimeout(() => {
        setupEnhancedAnimations();
    }, 200);
});