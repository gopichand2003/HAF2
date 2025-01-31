// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navClose = document.querySelector('.nav-close');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Close menu with close button
if (navClose) {
    navClose.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Handle dropdown menus
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
        const mainNav = document.querySelector('.main-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (mainNav) mainNav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
});

// Timeline scroll animation
function handleTimelineAnimation() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineHeight = timeline.offsetHeight;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    function updateTimeline() {
        const scrollPosition = window.scrollY;
        const timelineTop = timeline.offsetTop;
        const timelineBottom = timelineTop + timelineHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage = Math.min(
            Math.max(
                (scrollPosition + windowHeight - timelineTop) / 
                (timelineHeight + windowHeight) * 100,
                0
            ),
            100
        );

        timeline.style.setProperty('--scroll-percent', `${scrollPercentage}%`);
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingDown = currentScrollTop > lastScrollTop;
        lastScrollTop = currentScrollTop;

        timelineItems.forEach(item => {
            const itemTop = item.offsetTop + timelineTop;
            const triggerPoint = scrollPosition + windowHeight * 0.8;

            if (scrollingDown && triggerPoint > itemTop) {
                item.classList.add('visible');
            } else if (!scrollingDown && triggerPoint < itemTop + item.offsetHeight) {
                item.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline(); // Initial check
}

// Set active navigation link and expand dropdown based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const aboutUsDropdown = document.querySelector('.dropdown');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    
    // Initialize timeline animation for all language variants of the origin page
    if (currentPath.includes('origin-')) {
        handleTimelineAnimation();
    }
    
    // Function to get the base name of a page (e.g., 'home', 'origin', 'faith', etc.)
    function getPageBaseName(path) {
        const fileName = path.split('/').pop(); // Get the filename
        return fileName.split('-')[0]; // Get the base name before the hyphen
    }
    
    // Get current page base name
    const currentBaseName = getPageBaseName(currentPath);
    
    // Check if we're on an About Us page for any language
    const isAboutUsPage = ['origin', 'faith'].includes(currentBaseName);
    
    // If we're on an About Us page, expand the dropdown
    if (isAboutUsPage && aboutUsDropdown) {
        aboutUsDropdown.classList.add('active');
    }
    
    // Set active states for all navigation links
    navLinks.forEach(link => {
        // Skip dropdown toggle
        if (link.classList.contains('dropdown-toggle')) return;
        
        const linkPath = link.getAttribute('href');
        const linkBaseName = getPageBaseName(linkPath);
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Check if this link corresponds to the current page
        if (currentBaseName === linkBaseName) {
            link.classList.add('active');
        }
        
        // Special handling for home page
        if (currentPath === '/' || currentPath === '/index.html') {
            if (linkBaseName === 'home') {
                link.classList.add('active');
            }
        }
    });
    
    // Set active states for dropdown links
    dropdownLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkBaseName = getPageBaseName(linkPath);
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Check if this dropdown link corresponds to the current page
        if (currentBaseName === linkBaseName) {
            link.classList.add('active');
            // Also expand the dropdown if we're on one of its pages
            if (aboutUsDropdown) {
                aboutUsDropdown.classList.add('active');
            }
        }
    });
});
