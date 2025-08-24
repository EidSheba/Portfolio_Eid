document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const skillCategories = document.querySelectorAll('.skill-category');
    let animated = false;

    // Set index for each skill item for staggered animation
    document.addEventListener('DOMContentLoaded', function() {
        skillCategories.forEach(category => {
            const items = category.querySelectorAll('.skill-item');
            items.forEach((item, index) => {
                item.style.setProperty('--index', index);
                // Ensure initial state
                item.style.opacity = '0';
                item.style.transform = 'scale(0.5)';
            });
        });
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const triggerPoint = 150; // Start animation 150px into the section
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - triggerPoint
        );
    }

    function toggleSkillsAnimation(show) {
        skillCategories.forEach((category, index) => {
            // Clear any existing timeouts to prevent multiple triggers
            if (category.animationTimeout) {
                clearTimeout(category.animationTimeout);
            }
            
            if (show) {
                // Add 1 second delay before showing animations
                category.animationTimeout = setTimeout(() => {
                    category.classList.add('animate');
                }, 1000 + (index * 150));
            } else {
                // Remove animation class immediately when leaving
                category.classList.remove('animate');
            }
        });
        
        animated = show;
    }
    
    function handleScroll() {
        const shouldAnimate = isInViewport(skillsSection);
        if (shouldAnimate !== animated) {
            toggleSkillsAnimation(shouldAnimate);
        }
    }

    // Use Intersection Observer to detect when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleScroll();
            }
        });
    }, {
        threshold: 0.1
    });

    // Start observing the skills section
    observer.observe(skillsSection);
    
    // Check on page load and scroll
    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
});
