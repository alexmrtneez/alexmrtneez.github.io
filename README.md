# alexmrtneez.github.io

Personal portfolio of **Alejandro Martínez del Castillo**, live at <https://alexmrtneez.github.io> (English) and <https://alexmrtneez.github.io/es/> (Spanish).

Plain HTML, CSS and JavaScript with no build step and no dependencies, served by GitHub Pages.

## Structure

```
index.html            English version (default)
es/index.html         Spanish version
assets/css/styles.css Styles (light/dark theme, responsive)
assets/js/main.js     Mobile menu, theme toggle, language switch, active section
assets/img/           favicon.svg, og-image.png (link preview image)
.nojekyll             Serve files as-is (skip Jekyll)
```

## Editing

- Content lives directly in `index.html` (EN) and `es/index.html` (ES). Keep both in sync.
- Pending personal data is marked with `TODO:`. Run `grep -rn "TODO" --include=*.html .` to find it.
- Section `id`s (`#education`, `#projects`…) must be identical in both pages so the EN/ES switch keeps the reader's position.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000 and http://localhost:8000/es/
```

## Publish

Every push to `main` redeploys the site via GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root).
