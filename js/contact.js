// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Form submission handling
 const contactForm = document.getElementById('contactForm');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');

        // Check empty fields
        if (!formData.get("name") || !formData.get("email") || !formData.get("subject") || !formData.get("message")) {
          showNotification("Please fill in all fields!", "error");
          return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending...';
        submitBtnIcon.className = 'fas fa-spinner fa-spin';

        try {
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
          });

          if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
          } else {
            showNotification('Failed to send message. Please try again.', 'error');
          }

        } catch (error) {
          showNotification('Error connecting to server!', 'error');
        }

        // Reset button
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        submitBtnIcon.className = 'fas fa-paper-plane';
      });
    }

    // Notification function
    function showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 10);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 4000);
    }

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateX(120%);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 9999;
    max-width: 300px;
    opacity: 0;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification.success {
    background: linear-gradient(135deg, #4CAF50, #45a049);
  }
  
  .notification.error {
    background: linear-gradient(135deg, #f44336, #d32f2f);
  }
`;
document.head.appendChild(style);
