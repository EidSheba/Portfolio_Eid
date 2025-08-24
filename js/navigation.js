document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to set active link
    function setActiveLink() {
        const scrollPosition = window.scrollY + 100; // Adjust offset as needed
        
        // Check each section
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Set active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();
    
    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('sidebar');
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
});
