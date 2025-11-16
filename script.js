// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
  } else {
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
  }
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  testimonialCards[index].classList.add('active');
  dots[index].classList.add('active');
}

// Auto-advance testimonials
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}

// Set up testimonial navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto-advance every 5 seconds
setInterval(nextTestimonial, 5000);

// Contact Form
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Here you would typically send the data to a server
  // For this example, we'll just log it and show a success message
  console.log('Form submitted:', { name, email, message });
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
  
  // Style the success message
  successMessage.style.backgroundColor = 'rgba(255, 107, 53, 0.2)';
  successMessage.style.color = 'var(--primary-color)';
  successMessage.style.padding = '15px';
  successMessage.style.borderRadius = '10px';
  successMessage.style.marginTop = '20px';
  successMessage.style.textAlign = 'center';
  
  // Add the message to the form container
  contactForm.appendChild(successMessage);
  
  // Reset the form
  contactForm.reset();
  
  // Remove the message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.project-card, .skill-item, .about-text, .contact-info, .contact-form-container').forEach(el => {
  el.classList.add('fade-element');
  observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-element.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);