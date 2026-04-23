const fs = require("fs");
const path = require("path");

function read(file) {
    return fs.readFileSync(file, "utf8");
}

function readDirFiles(dir, ext) {
    let results = [];

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            results.push(readDirFiles(fullPath, ext));
        } else if (item.name.endsWith(ext)) {
            results.push(read(fullPath));
        }
    }

    return results.join("\n");
}

let html = read("./src/index.html");
let css = read("./src/styles.css");

const workerconstants = read("./src/worker-constants.js");

const styles = readDirFiles("./src/styles", ".css");
const workers = readDirFiles("./src/sheetworkers", ".js");
const rolltemplates = readDirFiles("./src/rolltemplates", ".html");

css = css.replace("{{styles}}", styles);
html = html.replace("{{workerconstants}}", workerconstants);
html = html.replace("{{workers}}", workers);
html = html.replace("{{rolltemplates}}", rolltemplates);

// inject components
const components = fs.readdirSync("./src/components");

for (const file of components) {
    const name = file.replace(".html", "");
    html = html.replace(`{{${name}}}`, read(`./src/components/${file}`));
}

fs.writeFileSync("./dist/Freegliders.html", html);
fs.writeFileSync("./dist/Freegliders.css", css);

console.log("Compiled successfully.");