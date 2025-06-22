document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Handle email obfuscation
    const emailElement = document.querySelector('.obfuscated-email');
    if (emailElement) {
        emailElement.addEventListener('click', function(e) {
            // This is just for display - the href already contains the correct email
            e.preventDefault();
            const text = this.getAttribute('href').replace('mailto:', '');
            this.textContent = text;
            this.href = 'mailto:' + text;
            this.classList.remove('obfuscated-email');
            this.removeEventListener('click', arguments.callee);
        });
    }
    
    // Check for saved preference in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Optional: Check for system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // If no preference saved and system prefers dark mode
    if (!localStorage.getItem('darkMode') && prefersDarkScheme.matches) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    // Listen for changes in system preference
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    });
});