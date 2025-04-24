// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    setupDiamondParticles();
    initScrollAnimations();
    setupDiamondModel();
    setupScrollHeader();
    setupGalleryInteractions();
    setupFormSubmission();
    animateHeroSection();
    checkFormSubmission();
});

// Diamond particles background
function setupDiamondParticles() {
    const canvas = document.getElementById('diamond-particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 20); // Responsive particle count
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.4 + 0.1,
                color: Math.random() > 0.8 ? '#d4af37' : '#ffffff'
            });
        }
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges or wrap around
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Init
    resizeCanvas();
    initParticles();
    drawParticles();
}

// Scroll animations
function initScrollAnimations() {
    // Observer for revealing elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements with .reveal-text class
    document.querySelectorAll('.reveal-text').forEach(el => {
        observer.observe(el);
    });
    
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBar = document.querySelector('.progress-bar');
    
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Update progress bar
                let visibleItems = document.querySelectorAll('.timeline-item.in-view').length;
                let progress = (visibleItems / timelineItems.length) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// 3D Diamond Model
function setupDiamondModel() {
    if (!document.getElementById('diamond-model-container')) return;
    
    // Setup Three.js scene
    const container = document.getElementById('diamond-model-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Diamond geometry
    const createDiamond = () => {
        const diamondGeometry = new THREE.Group();
        
        // Create crown
        const crownGeometry = new THREE.ConeGeometry(1, 0.8, 8);
        const crownMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            metalness: 0.2,
            roughness: 0.1,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        });
        const crown = new THREE.Mesh(crownGeometry, crownMaterial);
        crown.position.y = 0.4;
        diamondGeometry.add(crown);
        
        // Create pavilion (inverted cone for bottom)
        const pavilionGeometry = new THREE.ConeGeometry(1, 1.5, 8);
        pavilionGeometry.rotateX(Math.PI);
        const pavilion = new THREE.Mesh(pavilionGeometry, crownMaterial);
        pavilion.position.y = -0.35;
        diamondGeometry.add(pavilion);
        
        return diamondGeometry;
    };
    
    const diamond = createDiamond();
    scene.add(diamond);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xd4af37, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate diamond
        diamond.rotation.y += 0.01;
        diamond.rotation.z += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Header scroll effect
function setupScrollHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Gallery interactions
function setupGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const ringStyle = document.getElementById('ring-style');
    const ringDescription = document.getElementById('ring-description');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    
    // Ring descriptions
    const ringDescriptions = {
        "Classic Solitaire": "The timeless solitaire design focuses attention on a single, stunning center diamond. This elegant style features a clean band that elevates your chosen diamond to take center stage, creating a look of pure, refined beauty.",
        "Halo Design": "Maximizing brilliance and perceived size, the halo setting surrounds your center diamond with a circle of smaller pavé diamonds. This enchanting style creates a dazzling effect that catches light from every angle.",
        "Vintage Inspired": "Drawing from the romance of bygone eras, our vintage-inspired designs feature intricate detailing, milgrain edging, and ornate metalwork. These rings tell a story of enduring love with timeless craftsmanship.",
        "Modern Minimalist": "Clean lines and architectural influences define our modern minimalist collection. These contemporary designs balance simplicity with unexpected details for a sophisticated statement that feels both current and timeless."
    };
    
    // Handle gallery item click to update details
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const style = item.getAttribute('data-ring-style');
            
            // Update info section
            if (ringStyle && ringDescription) {
                ringStyle.textContent = style;
                ringDescription.textContent = ringDescriptions[style];
            }
            
            // Show in modal
            if (modal && modalImage && modalTitle && modalDescription) {
                modalImage.src = item.querySelector('img').src;
                modalTitle.textContent = style;
                modalDescription.textContent = ringDescriptions[style];
                
                modal.classList.add('show');
            }
        });
    });
    
    // Close modal
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

// Form submission
function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    const formSuccess = document.querySelector('.form-success');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            // Don't prevent default - let the form submit to PHP
            // e.preventDefault();
            
            // Form validation can go here
            const firstName = form.querySelector('#first-name').value;
            const lastName = form.querySelector('#last-name').value;
            const phone = form.querySelector('#phone').value;
            const vision = form.querySelector('#vision').value;
            
            // Basic validation
            if (!firstName || !lastName || !phone || !vision) {
                e.preventDefault(); // Prevent form submission if validation fails
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Let the form submit to send_email.php
            return true;
        });
    }
}

// Check for form submission status from URL parameters
function checkFormSubmission() {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const submission = urlParams.get('submission');
    
    const form = document.getElementById('contact-form');
    const formSuccess = document.querySelector('.form-success');
    
    if (!form || !formSuccess) return;
    
    if (submission === 'success') {
        // Show success message
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to the form section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    } else if (submission === 'error') {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('form-error');
        errorMessage.innerHTML = '<p>There was a problem sending your message. Please try again or contact us directly.</p>';
        form.prepend(errorMessage);
        
        // Add styling for error message
        const style = document.createElement('style');
        style.innerHTML = `
            .form-error {
                background-color: rgba(211, 86, 86, 0.2);
                border-left: 3px solid var(--error-color);
                padding: 10px;
                margin-bottom: 20px;
                color: var(--error-color);
            }
        `;
        document.head.appendChild(style);
    }
}

// Hero section animations
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero .reveal-text');
    
    // Stagger animation for hero content
    setTimeout(() => {
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, 300 * index);
        });
    }, 500);
}