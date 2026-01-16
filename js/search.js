/**
 * Search Engine Module
 * Handles data loading and fuzzy search using Fuse.js
 */

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';
import { SEARCH_CONFIG, DATA_SOURCE, UI_CONFIG } from './config.js';

export class SearchEngine {
    constructor() {
        this.fuse = null;
        this.data = null;
    }

    /**
     * Initialize the search engine by loading data and creating Fuse instance
     */
    async init() {
        try {
            const response = await fetch(DATA_SOURCE);
            if (!response.ok) {
                throw new Error(`Failed to load data: ${response.status}`);
            }

            const jsonData = await response.json();
            this.data = jsonData.tools;

            // Initialize Fuse.js with our data and config
            this.fuse = new Fuse(this.data, SEARCH_CONFIG);

            console.log(`✓ Search engine initialized with ${this.data.length} tools`);
            return true;
        } catch (error) {
            console.error('Failed to initialize search engine:', error);
            throw error;
        }
    }

    /**
     * Perform a search query
     * @param {string} query - Search query string
     * @returns {Array} - Array of search results, limited by UI_CONFIG.maxResults
     */
    search(query) {
        if (!this.fuse) {
            console.warn('Search engine not initialized');
            return [];
        }

        if (!query || query.trim().length < UI_CONFIG.minSearchLength) {
            return [];
        }

        // Perform fuzzy search
        const results = this.fuse.search(query.trim());

        // Limit results and extract the item data
        return results
            .slice(0, UI_CONFIG.maxResults)
            .map(result => ({
                ...result.item,
                score: result.score,
                matches: result.matches
            }));
    }

    /**
     * Get all available categories
     * @returns {Array} - Unique list of categories
     */
    getCategories() {
        if (!this.data) return [];
        return [...new Set(this.data.map(tool => tool.category))].sort();
    }

    /**
     * Get tools by category
     * @param {string} category - Category name
     * @returns {Array} - Tools in the specified category
     */
    getByCategory(category) {
        if (!this.data) return [];
        return this.data.filter(tool => tool.category === category);
    }
}
