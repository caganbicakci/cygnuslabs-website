// Component Loader - Loads HTML components using XMLHttpRequest
// Works with both file:// and http:// protocols

function loadComponent(componentName, containerId) {
    return new Promise((resolve, reject) => {
        const container = document.getElementById(containerId);
        if (!container) {
            reject(new Error(`Container ${containerId} not found`));
            return;
        }

        const xhr = new XMLHttpRequest();
        const timestamp = new Date().getTime();
        xhr.open('GET', `components/${componentName}.html?t=${timestamp}`, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    container.innerHTML = xhr.responseText;
                    resolve();
                } else {
                    reject(new Error(`Failed to load ${componentName}: ${xhr.status}`));
                }
            }
        };
        
        xhr.onerror = function() {
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
        // Show error message but don't replace entire body
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'padding: 2rem; text-align: center; color: white; background: red; margin: 1rem; border-radius: 0.5rem;';
        errorDiv.innerHTML = '<h2>Error Loading Components</h2><p>Please use a web server to run this application.</p><p>Run: python3 -m http.server 8000</p>';
        document.body.insertBefore(errorDiv, document.body.firstChild);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
