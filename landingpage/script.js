
// Theme switcher
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Function to set the theme
const setTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggleButton.textContent = '☀️';
    } else {
        body.classList.remove('light-mode');
        themeToggleButton.textContent = '🌙';
    }
};

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    let currentTheme;
    if (body.classList.contains('light-mode')) {
        currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    } else {
        currentTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
    setTheme(currentTheme);
});