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

// Add click event to site title for home navigation
const siteTitle = document.querySelector('.site-title');
if (siteTitle) {
    siteTitle.addEventListener('click', () => {
        window.location.href = 'home-english.html';
    });
}

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // If we're on the root path or home-english.html, set home as active
    const isHomePage = currentPath === '/' || 
                      currentPath === 'home-english.html' || 
                      currentPath.endsWith('home-english.html');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        
        // Get the href path
        const linkPath = link.getAttribute('href');
        
        // Check if it's the home page or if the current path matches the link path
        if ((isHomePage && linkPath === 'home-english.html') || 
            (!isHomePage && currentPath === linkPath) || 
            (!isHomePage && currentPath.includes(linkPath) && linkPath !== 'home-english.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // If no active link is set and we're on the home page, set home link as active
    if (isHomePage && !document.querySelector('.nav-links a.active')) {
        const homeLink = document.querySelector('.nav-home');
        if (homeLink) {
            homeLink.classList.add('active');
            homeLink.setAttribute('aria-current', 'page');
        }
    }
});