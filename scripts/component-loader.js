// Component Loader - Loads HTML components using XMLHttpRequest
// Works with both file:// and http:// protocols
// Optimized for GitHub Pages

function loadComponent(componentName, containerId) {
    return new Promise((resolve, reject) => {
        const container = document.getElementById(containerId);
        if (!container) {
            reject(new Error(`Container ${containerId} not found`));
            return;
        }

        // Use relative path - works for both GitHub Pages and local development
        // GitHub Pages serves from root, so relative paths work fine
        const componentPath = `./components/${componentName}.html`;
        
        const xhr = new XMLHttpRequest();
        const timestamp = new Date().getTime();
        xhr.open('GET', `${componentPath}?t=${timestamp}`, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    container.innerHTML = xhr.responseText;
                    resolve();
                } else {
                    console.error(`Failed to load ${componentName}: ${xhr.status} from ${componentPath}`);
                    reject(new Error(`Failed to load ${componentName}: ${xhr.status}`));
                }
            }
        };
        
        xhr.onerror = function() {
            console.error(`Network error loading ${componentName} from ${componentPath}`);
            reject(new Error(`Network error loading ${componentName}`));
        };
        
        xhr.send();
    });
}

async function loadAllComponents() {
    try {
        await Promise.all([
            loadComponent('header', 'header'),
            loadComponent('hero', 'hero'),
            loadComponent('footer', 'footer')
        ]);
        
        // Dispatch event when all components are loaded
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
