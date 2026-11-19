# ifcoid.github.io

> Portfolio dan direktori tools akademik - Landing page for qualitative data analysis software with the best AI integration (MAXQDA alternative)

🔗 **Live Site:** [https://ifcoid.github.io/](https://ifcoid.github.io/)


---

## 📂 Projects

### 1. Academic Research Tools Search Engine

Direktori pencarian tools akademik dan riset dengan autocomplete - Built with Vanilla JS & Fuse.js

#### ✨ Features

- 🔍 **Fuzzy Search** - Typo-tolerant search powered by Fuse.js
- ⚡ **Instant Autocomplete** - Results appear as you type
- ⌨️ **Keyboard Navigation** - Full arrow key support (↑↓ Enter Esc)
- 🎨 **Modern UI** - Dark mode with glassmorphism design
- 📱 **Responsive** - Works on all devices
- 🚀 **Zero Backend** - Fully static, deployable to GitHub Pages
- 🎯 **30+ Tools** - Curated academic and research tools

#### 🚀 Quick Start

**Running Locally:**

```bash
# Navigate to project root
cd ifcoid.github.io

# Start a local server
python -m http.server 8080

# Or with Node.js
npx -y http-server -p 8080 -c-1
```

Then open: **http://localhost:8080/**

#### 📁 Project Structure

```
ifcoid.github.io/
├── index.html          # Search engine main page
├── css/
│   └── style.css      # Styling
├── js/
│   ├── main.js        # App entry point
│   ├── search.js      # Search engine
│   ├── autocomplete.js # Autocomplete UI
│   └── config.js      # Configuration
└── data/
    └── tools.json     # Tools database (30+ academic tools)
```

#### 🛠️ Adding New Tools

Edit `data/tools.json` and add a new entry:

```json
{
  "id": "tool-identifier",
  "title": "Tool Name",
  "keywords": ["keyword1", "keyword2", "alternative names"],
  "url": "https://tool-website.com",
  "category": "Category Name",
  "description": "Brief description of the tool"
}
```

**Tips:**
- Include common misspellings in keywords for better search
- Keep descriptions concise (~80 chars)
- Use HTTPS URLs
- Pick an existing category or create a new one

#### ⚙️ Configuration

Customize search behavior in `js/config.js`:

```javascript
export const SEARCH_CONFIG = {
  threshold: 0.3,        // Fuzzy matching sensitivity (0-1)
  maxResults: 8,         // Max results to display
  debounceDelay: 300,    // Search delay (ms)
  minSearchLength: 2     // Min chars before search
};
```

#### 🎨 Included Tools

The database includes 30+ curated tools across categories:

- **Writing & Typesetting**: Overleaf, LaTeX, Grammarly, DeepL
- **Reference Management**: Zotero, Mendeley, SciWheel
- **Programming**: Python, R, Jupyter, Pandas, TensorFlow, PyTorch
- **Visualization**: Matplotlib, Plotly, Tableau
- **Search & Discovery**: Google Scholar, arXiv, PubMed, Semantic Scholar
- **Productivity**: Notion, Obsidian
- **Code & Collaboration**: GitHub, Google Colab, Kaggle
- **Academic Profiles**: ORCID, ResearchGate

#### 🌐 Tech Stack

- **Framework:** Vanilla JavaScript ES6+ Modules
- **Search:** Fuse.js 7.0.0 (fuzzy search)
- **Styling:** Vanilla CSS with modern effects
- **Data:** JSON file-based storage
- **Hosting:** GitHub Pages (static site)

**No build step required!** Just open `index.html` in a browser.

---

## 🔮 Future Ideas

- [ ] Category filter sidebar
- [ ] Favorites system (localStorage)
- [ ] Recent searches
- [ ] Dark/light mode toggle
- [ ] Search analytics
- [ ] Community ratings
- [ ] Admin panel for editing tools

---

## 🤝 Contributing

Want to add more tools or improve the search?

1. Fork the repository
2. Edit `data/tools.json` to add tools
3. Test locally
4. Submit a pull request

---

## 💡 Credits

- **Search Engine:** [Fuse.js](https://fusejs.io/)
- **Fonts:** [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Icons:** SVG (inline)

---

## 📄 License

See LICENSE file for details.

---

**Built with ❤️ for the academic community**
