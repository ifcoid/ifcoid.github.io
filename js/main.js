/**
 * Main Application Entry Point
 * Initializes the search engine and autocomplete components
 */

import { SearchEngine } from './search.js';
import { Autocomplete } from './autocomplete.js';

/**
 * Initialize the application
 */
async function init() {
    try {
        // Show loading state
        const searchInput = document.querySelector('#search-input');
        const resultsContainer = document.querySelector('#results');

        searchInput.disabled = true;
        searchInput.placeholder = 'Loading...';

        // Initialize search engine
        const searchEngine = new SearchEngine();
        await searchEngine.init();

        // Initialize autocomplete
        const autocomplete = new Autocomplete(
            searchInput,
            resultsContainer,
            searchEngine
        );

        // Ready!
        searchInput.disabled = false;
        searchInput.placeholder = 'Search academic tools... (e.g., latex, zotero, python)';
        searchInput.focus();

        console.log('✓ Application ready');

    } catch (error) {
        console.error('Failed to initialize application:', error);

        // Show error to user
        const searchInput = document.querySelector('#search-input');
        searchInput.disabled = true;
        searchInput.placeholder = 'Failed to load. Please refresh the page.';
        searchInput.classList.add('error');
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
