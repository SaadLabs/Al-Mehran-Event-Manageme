// Toggle navbar background on scroll
const header = document.querySelector('.header');

function toggleHeaderBackground() {
  const scrollThreshold = 150; // about 2 scrolls or more

  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}


window.addEventListener('scroll', toggleHeaderBackground);
window.addEventListener('load', toggleHeaderBackground);


document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Toggle menu icon
      const menuIcon = menuToggle.querySelector('i');
      if (menuIcon.classList.contains('ri-menu-line')) {
        menuIcon.classList.remove('ri-menu-line');
        menuIcon.classList.add('ri-close-line');
      } else {
        menuIcon.classList.remove('ri-close-line');
        menuIcon.classList.add('ri-menu-line');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile nav if open
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) {
          const menuIcon = menuToggle.querySelector('i');
          menuIcon.classList.remove('ri-close-line');
          menuIcon.classList.add('ri-menu-line');
        }
      }

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

// Keep only the Home link active on the home page
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  if (link.textContent.trim().toLowerCase() === 'home') {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});


  // Add animation classes to elements when they enter viewport
  const animateElements = document.querySelectorAll('.service-card, .testimonial-card');

  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;

    animateElements.forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;

      // Check if element is in view
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        element.classList.add('fade-in');
      }
    });
  }

  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('load', checkIfInView);
  window.addEventListener('resize', checkIfInView);

  // Initial check for elements in view
  checkIfInView();

  // Form validation for contact form (if added later)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const formInputs = contactForm.querySelectorAll('input, textarea');

      formInputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Show success message or submit form
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
        contactForm.appendChild(successMessage);

        // Remove message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  }
});

// testimonial section scrolling

// Auto-scroll testimonials on mobile
function initTestimonialsAutoScroll() {
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  // Only run on mobile screens
  if (window.innerWidth <= 768 && testimonialsGrid && testimonialCards.length > 0) {
    let currentIndex = 0;
    let isUserScrolling = false;
    let userScrollTimeout;

    // Track user scrolling
    testimonialsGrid.addEventListener('scroll', function () {
      isUserScrolling = true;
      clearTimeout(userScrollTimeout);

      // Resume auto-scroll after user stops scrolling for 3 seconds
      userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    });

    // Auto-scroll function
    function autoScroll() {
      if (!isUserScrolling && document.visibilityState === 'visible') {
        currentIndex = (currentIndex + 1) % testimonialCards.length;

        // Calculate scroll position for single card view
        const cardWidth = testimonialsGrid.scrollWidth / testimonialCards.length;
        const scrollPosition = currentIndex * cardWidth;

        testimonialsGrid.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }

    // Start auto-scroll every 4 seconds
    const autoScrollInterval = setInterval(autoScroll, 4000);

    // Clean up on window resize if not mobile anymore
    function handleResize() {
      if (window.innerWidth > 768) {
        clearInterval(autoScrollInterval);
        window.removeEventListener('resize', handleResize);
      }
    }

    window.addEventListener('resize', handleResize);

    // Pause auto-scroll when page is not visible
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        isUserScrolling = true;
      } else {
        setTimeout(() => {
          isUserScrolling = false;
        }, 1000);
      }
    });
  }
}

// Initialize auto-scroll
initTestimonialsAutoScroll();

// Re-initialize on window resize
window.addEventListener('resize', function () {
  setTimeout(initTestimonialsAutoScroll, 100);
});




// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});