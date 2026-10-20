// Site theme: Tailwind config + light/dark mode. Loaded in <head> right after the Tailwind CDN
// script on every page, so the saved theme is applied before the page is painted (no flash).
//
// Colors are CSS variables (styles/main.css): `bg-bg`, `bg-surface`, `text-fg`, `text-muted`,
// `border-line`, `text-accent`, ... switch with the `dark` class on <html>.
// The theme follows the device until the visitor picks one with the header button.

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--bg) / <alpha-value>)',
                surface: 'rgb(var(--surface) / <alpha-value>)',
                fg: 'rgb(var(--fg) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
                line: 'rgb(var(--line) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
            },
            fontFamily: {
                display: ['Plus Jakarta Sans', 'sans-serif'],
            },
        },
    },
};

(function () {
    var STORAGE_KEY = 'theme';

    function savedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function systemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function currentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    function updateToggles() {
        var dark = currentTheme() === 'dark';
        document.querySelectorAll('[data-theme-icon]').forEach(function (icon) {
            icon.textContent = dark ? 'light_mode' : 'dark_mode';
        });
        document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
            button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    function applyTheme(theme) {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        updateToggles();
    }

    applyTheme(savedTheme() || systemTheme());

    // Follow the device while the visitor hasn't picked a theme
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
            if (!savedTheme()) applyTheme(systemTheme());
        });
    }

    // The header is loaded later, so listen on the document
    document.addEventListener('click', function (event) {
        if (!event.target.closest('[data-theme-toggle]')) return;
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}
        applyTheme(next);
    });
    document.addEventListener('componentsLoaded', updateToggles);
})();
