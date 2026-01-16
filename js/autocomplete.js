/**
 * Autocomplete Component
 * Handles the autocomplete UI, user interactions, and keyboard navigation
 */

import { UI_CONFIG } from './config.js';

export class Autocomplete {
    constructor(inputElement, resultsElement, searchEngine) {
        this.input = inputElement;
        this.results = resultsElement;
        this.searchEngine = searchEngine;
        this.currentResults = [];
        this.selectedIndex = -1;
        this.debounceTimer = null;

        this.init();
    }

    /**
     * Initialize event listeners
     */
    init() {
        // Input event with debouncing
        this.input.addEventListener('input', (e) => this.onInput(e));

        // Keyboard navigation
        this.input.addEventListener('keydown', (e) => this.onKeyDown(e));

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target) && !this.results.contains(e.target)) {
                this.clear();
            }
        });

        // Focus input on page load
        this.input.focus();
    }

    /**
     * Handle input events with debouncing
     */
    onInput(e) {
        const query = e.target.value;

        // Clear previous timer
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        // Debounce search
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, UI_CONFIG.debounceDelay);
    }

    /**
     * Perform search and render results
     */
    performSearch(query) {
        if (!query || query.trim().length < UI_CONFIG.minSearchLength) {
            this.clear();
            return;
        }

        this.currentResults = this.searchEngine.search(query);
        this.selectedIndex = -1;
        this.render();
    }

    /**
     * Handle keyboard events
     */
    onKeyDown(e) {
        if (!this.currentResults.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectNext();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectPrev();
                break;
            case 'Enter':
                e.preventDefault();
                this.openSelected();
                break;
            case 'Escape':
                e.preventDefault();
                this.clear();
                this.input.blur();
                break;
        }
    }

    /**
     * Select next result (arrow down)
     */
    selectNext() {
        if (this.selectedIndex < this.currentResults.length - 1) {
            this.selectedIndex++;
            this.updateSelection();
        }
    }

    /**
     * Select previous result (arrow up)
     */
    selectPrev() {
        if (this.selectedIndex > 0) {
            this.selectedIndex--;
            this.updateSelection();
        } else if (this.selectedIndex === 0) {
            this.selectedIndex = -1;
            this.updateSelection();
        }
    }

    /**
     * Update visual selection
     */
    updateSelection() {
        const items = this.results.querySelectorAll('.result-item');
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('selected');
                // Scroll into view if needed
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    /**
     * Open selected result in new tab
     */
    openSelected() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
            const selected = this.currentResults[this.selectedIndex];
            window.open(selected.url, '_blank', 'noopener,noreferrer');
            this.clear();
            this.input.value = '';
        }
    }

    /**
     * Render search results
     */
    render() {
        if (!this.currentResults.length) {
            this.renderNoResults();
            return;
        }

        const html = this.currentResults.map((result, index) => `
      <div class="result-item" data-index="${index}">
        <div class="result-main">
          <div class="result-title">${this.escapeHtml(result.title)}</div>
          <div class="result-description">${this.escapeHtml(result.description)}</div>
        </div>
        <div class="result-meta">
          <span class="result-category">${this.escapeHtml(result.category)}</span>
          <svg class="result-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `).join('');

        this.results.innerHTML = html;
        this.results.classList.add('visible');

        // Add click handlers
        this.results.querySelectorAll('.result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const result = this.currentResults[index];
                window.open(result.url, '_blank', 'noopener,noreferrer');
                this.clear();
                this.input.value = '';
            });

            // Hover to select
            item.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.updateSelection();
            });
        });
    }

    /**
     * Render "no results" message
     */
    renderNoResults() {
        this.results.innerHTML = `
      <div class="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <p>No tools found</p>
        <small>Try different keywords</small>
      </div>
    `;
        this.results.classList.add('visible');
    }

    /**
     * Clear results and hide container
     */
    clear() {
        this.results.innerHTML = '';
        this.results.classList.remove('visible');
        this.currentResults = [];
        this.selectedIndex = -1;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
