// Main JavaScript file for THE AI FIX landing page

// DOM Elements
const signupForm = document.getElementById('signup-form');
const benefitItems = document.querySelectorAll('.benefit-item');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

// Animate elements when they come into view
function animateOnScroll() {
  benefitItems.forEach((item, index) => {
    if (isInViewport(item)) {
      // Add a delay based on the item's index
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 100);
    }
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const trackOptions = document.getElementsByName('track');
  let selectedTrack;
  
  for (const option of trackOptions) {
    if (option.checked) {
      selectedTrack = option.value;
      break;
    }
  }
  
  // In a real implementation, you would send this data to a server
  console.log('Form submitted:', { name, email, track: selectedTrack });
  
  // Show success message
  const formContainer = document.querySelector('.join-content');
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="success-icon">✓</div>
    <h3>Thank you for joining!</h3>
    <p>We've sent a confirmation email to <strong>${email}</strong>. Check your inbox to complete your subscription to THE AI FIX.</p>
  `;
  
  // Replace form with success message
  formContainer.innerHTML = '';
  formContainer.appendChild(successMessage);
  setTimeout(() => {
    successMessage.classList.add('show');
  }, 100);
  
  // Scroll to success message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Header scroll effect
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(12, 15, 23, 0.95)';
    header.style.padding = '1rem 0';
  } else {
    header.style.background = 'rgba(12, 15, 23, 0.8)';
    header.style.padding = '1.5rem 0';
  }
}

// Track card hover effects
function setupTrackCardInteractions() {
  const trackCards = document.querySelectorAll('.track-card');
  
  trackCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const trackButton = card.querySelector('.track-button');
      if (trackButton) {
        trackButton.style.background = 'rgba(0, 255, 224, 0.15)';
        trackButton.style.borderColor = 'var(--color-accent-primary)';
        trackButton.style.color = 'var(--color-accent-primary)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const trackButton = card.querySelector('.track-button');
      if (trackButton) {
        trackButton.style.background = '';
        trackButton.style.borderColor = '';
        trackButton.style.color = '';
      }
    });
  });
}

// Add initial animations
function addInitialAnimations() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  
  if (heroTitle) heroTitle.classList.add('fade-in');
  if (heroSubtitle) {
    heroSubtitle.classList.add('fade-in');
    heroSubtitle.classList.add('delay-200');
  }
  if (heroCta) {
    heroCta.classList.add('fade-in-up');
    heroCta.classList.add('delay-400');
  }
}

// Initialize all functions
function init() {
  // Add event listeners
  if (signupForm) signupForm.addEventListener('submit', handleFormSubmit);
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Setup interactions
  setupSmoothScroll();
  setupTrackCardInteractions();
  addInitialAnimations();
  
  // Initial call to animate elements already in viewport
  animateOnScroll();
  handleHeaderScroll();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);