// loading // hide loader after page finishes loading and trigger animations
window.addEventListener("load", function () {
  // Hide loading overlay
  document.getElementById("loadingOverlay").style.display = "none";
  
  // Add 'visible' class to home section to trigger the 3D zoom-in animation
  const homeSection = document.querySelector('.home');
  if (homeSection) {
    // Use setTimeout to ensure the transition is visible
    setTimeout(() => {
      homeSection.classList.add('visible');
    }, 50);
  }
  
 

  // Read More functionality
  const readMoreBtn = document.querySelector('.read-more-btn');
  const aboutParagraph = document.querySelector('.about-paragraph');

  if (readMoreBtn && aboutParagraph) {
    // Only show read more on screens < 1200px
    function updateReadMoreButton() {
      if (window.innerWidth < 1200) {
        readMoreBtn.style.display = 'block';
        aboutParagraph.classList.remove('expanded');
      } else {
        readMoreBtn.style.display = 'none';
        aboutParagraph.classList.add('expanded');
      }
    }

    // Initial setup
    updateReadMoreButton();
    
    // Handle button click
    readMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      aboutParagraph.classList.toggle('expanded');
      readMoreBtn.textContent = aboutParagraph.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });

    // Update on window resize
    window.addEventListener('resize', updateReadMoreButton);
  }

  // Animate navigation links one by one
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, index) => {
    // Add a staggered delay for each navigation item (100ms between each)
    setTimeout(() => {
      item.classList.add('visible');
    }, 300 + (index * 100)); // Start after 300ms, then each item appears 100ms after the previous one
  });
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-item a');

// Toggle sidebar when menu button is clicked
if (mobileMenuToggle && sidebar) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    sidebar.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close sidebar when a nav link is clicked (for mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) { // Only for mobile
        mobileMenuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        
        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
}

// hire function for button in the header
function hireMe() {
  window.location.href = "#contact";
}

// Intersection Observer for scroll animations
const animateOnScroll = () => {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { target } = entry;
      const title = target.querySelector('.section-title');
      const line = target.querySelector('.animated-line');
      const image = target.querySelector('.circle-img');
      const paragraphs = target.querySelectorAll('p');

      if (entry.isIntersecting) {
        // Add animate class to elements
        if (title) title.classList.add('animate');
        if (line) line.classList.add('animate');
        if (image) image.classList.add('animate');
        paragraphs.forEach(p => p.classList.add('animate'));
      } else {
        // Remove animate class when leaving the section
        if (title) title.classList.remove('animate');
        if (line) line.classList.remove('animate');
        if (image) image.classList.remove('animate');
        paragraphs.forEach(p => p.classList.remove('animate'));
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });

  observer.observe(aboutSection);
};

// Initialize animations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Re-initialize animations when navigating with hash links
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#about') {
      setTimeout(animateOnScroll, 300); // Small delay to ensure the section is in view
    }
  });
});


// strat portfolio 
// Show cards on scroll
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, i * 400);
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

// Slider logic for each card
document.querySelectorAll(".card").forEach((card) => {
  const images = card.querySelectorAll(".card-slider img");
  const indicatorsContainer = card.querySelector(".indicators");
  let index = 0;

  // Create indicators
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      showSlide(i);
    });
    indicatorsContainer.appendChild(dot);
  });

  const dots = indicatorsContainer.querySelectorAll("span");

  function showSlide(i) {
    images[index].classList.remove("active");
    dots[index].classList.remove("active");
    index = i;
    images[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // Auto change
  setInterval(() => {
    let next = (index + 1) % images.length;
    showSlide(next);
  }, 4000);
});


// end portfoloi 