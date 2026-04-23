# Freegliders Roll20 Character Sheet

A custom Roll20 character sheet for the **Freegliders Steampunk TTRPG** system.

This project contains the source code, styles, components, roll templates, and sheetworkers used to build the Roll20 sheet for Freegliders.

---

## Features

- Custom character sheet designed for Freegliders
- Automated derived stat calculations via sheetworkers
- Modular source structure for easier development
- Roll templates for cleaner in-game rolls
- Organized HTML components and reusable CSS
- Build pipeline that compiles everything into Roll20-ready files

---

## Project Structure

```text
freegliders-roll20-charsheet/
│── src/
│   │── index.html
│   │── styles.css
│   │── worker-constants.js
│   │
│   ├── components/
│   │   ├── *.html
│   │
│   ├── styles/
│   │   ├── *.css
│   │
│   ├── sheetworkers/
│   │   ├── *.js
│   │
│   ├── rolltemplates/
│   │   ├── *.html
│
│── dist/
│   ├── Freegliders.html
│   └── Freegliders.css
│
│── build.js
│── package.json
│── README.md
```

---

## Development Workflow

The project uses a modular source structure.

Instead of writing one massive Roll20 HTML file, the sheet is split into:

- **Components** → UI sections of the sheet
- **Styles** → CSS files
- **Sheetworkers** → Roll20 worker scripts
- **Roll Templates** → Custom roll outputs

These are compiled into final Roll20 files using the build script.

---

## Build Instructions

### Install Node.js

Download and install Node.js if not already installed.

### Install Dependencies

```bash
npm install
```

### Build the Sheet

```bash
node build.js
```

This generates:

```text
dist/Freegliders.html
dist/Freegliders.css
```

These are the files used in Roll20.

---

## Roll20 Installation

1. Open your Roll20 game
2. Go to **Game Settings**
3. Select **Custom Character Sheet**
4. Paste contents of:

- `dist/Freegliders.html` into HTML
- `dist/Freegliders.css` into CSS

5. Save and launch game

---

## Recommended Development Tools

- VS Code
- Prettier
- Live Server
- Git

---

## Roadmap

Planned / possible future additions:

- Expanded vehicle support
- Inventory automation
- Better repeating sections
- Advanced roll templates
- Mobile friendliness improvements
- Theme polish
- Localization support

---

## About Freegliders

Freegliders is a custom Victorian fantasy / steampunk tabletop RPG featuring:

- Airships
- Magic
- Engineering
- Adventure crews
- Dangerous skies
- Monsters and mysteries

---

## License

Project license to be determined.

---

## Author

Created by Marc Schäfer / Marcedarc

