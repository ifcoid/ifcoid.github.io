/**
 * Configuration for the Academic Tools Search Engine
 */

// Fuse.js search configuration
export const SEARCH_CONFIG = {
  // Controls how "fuzzy" the search is (0.0 = exact match, 1.0 = match anything)
  threshold: 0.3,
  
  // Which fields to search in
  keys: [
    { name: 'title', weight: 0.7 },      // Title has highest priority
    { name: 'keywords', weight: 0.2 },   // Keywords are important
    { name: 'description', weight: 0.1 } // Description has lower priority
  ],
  
  // Minimum characters that must match
  minMatchCharLength: 2,
  
  // Include score in results for debugging
  includeScore: true,
  
  // Include matched indices for highlighting
  includeMatches: true,
  
  // Ignore location of match in string
  ignoreLocation: true
};

// UI Configuration
export const UI_CONFIG = {
  // Maximum number of results to display
  maxResults: 8,
  
  // Debounce delay for search input (ms)
  debounceDelay: 300,
  
  // Minimum characters before triggering search
  minSearchLength: 2,
  
  // Animation durations
  animations: {
    fadeIn: 200,
    fadeOut: 150
  }
};

// Data source
export const DATA_SOURCE = './data/tools.json';
