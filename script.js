// Smooth scrolling for navigation links
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

// Create floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    const particleCount = window.innerWidth > 768 ? 50 : 25; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Download resume function
function downloadResume() {
    // Replace this with your actual resume file path
    const resumeUrl = 'assets/KartikSingh_CV.pdf';
    
    // Check if file exists, otherwise show alert
    fetch(resumeUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // Create download link
                const link = document.createElement('a');
                link.href = resumeUrl;
                link.download = 'KartikSingh_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                throw new Error('File not found');
            }
        })
        .catch(() => {
            // Fallback: Create a text version of the resume
            const resumeText = `KARTIK SINGH - SOFTWARE ENGINEER
Chandigarh | 904-330-1293 | kashukartik21@gmail.com

EDUCATION:
B.Tech CSE, Vel Tech Rangarajan Dr.Sagunthala RnD Institute (CGPA: 8.0)

KEY PROJECTS:
• Pulmonary Fibrosis Prediction - 90% accuracy using CNNs
• JobSage - Smart Recruiting Platform with Gemini AI
• TechForum - Tech Problem Solutions Platform
• Simple Music Player - JavaScript Audio Application

SKILLS:
Programming: C, C++, Python, Java
Web: HTML, CSS, JavaScript, ReactJs, Flask
Database: MySQL, Firebase, SQLite
Tools: VS Code, PyCharm, Git/GitHub, Google Colab

Visit: https://linkedin.com/in/kartik-singh | https://github.com/kartik-singh`;
            
            const blob = new Blob([resumeText], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Kartik_Singh_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            console.log('Resume downloaded as text file. Add PDF to assets folder for proper download.');
        });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animations
function initializeAnimations() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Add active state to navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Scroll event listener for active nav links
window.addEventListener('scroll', updateActiveNavLink);

// Typing animation for hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Project card click handlers
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98) translateY(-10px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
}

// Contact form functionality (if you add a contact form later)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Contact form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
}

// Lazy loading for images (if you add project images)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
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
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAnimations();
    initializeProjectCards();
    initializeContactForm();
    initializeLazyLoading();
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Throttle scroll events for better performance
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 100);
    
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', throttledScrollHandler);
});

// Initialize particles when page loads
window.addEventListener('load', function() {
    createParticles();
    
    // Optional: Add typing effect to hero title
    // const heroTitle = document.querySelector('.hero h1');
    // if (heroTitle) {
    //     typeWriter(heroTitle, "Hi, I'm Kartik Singh 👋", 100);
    // }
});

// Handle window resize for particles
window.addEventListener('resize', function() {
    // Clear existing particles and recreate them
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.innerHTML = '';
        createParticles();
    }
});

// Add some Easter eggs for fun
let konami = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konami.push(e.keyCode);
    
    if (konami.length > konamiCode.length) {
        konami.shift();
    }
    
    if (konami.join('') === konamiCode.join('')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        console.log('🎉 Konami Code activated! You found the easter egg!');
        konami = [];
    }
});

// Export functions for potential use in other scripts
window.portfolioFunctions = {
    downloadResume,
    createParticles,
    updateActiveNavLink,
    typeWriter
};