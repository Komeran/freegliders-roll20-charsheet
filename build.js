const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { ESLint } = require("eslint");

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

const COMPONENT_REGEX =
    /<comp-([a-z0-9-]+)><\/comp-\1>/g;

function walk(dir) {
    let results = [];

    const items = fs.readdirSync(dir, {
        withFileTypes: true
    });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            results.push(fullPath);
        }
    }

    return results;
}

function findComponentFile(name) {
    const componentFiles = walk("./src/components");

    const match = componentFiles.find(file =>
        path.basename(file, ".html") === name
    );

    if (!match) {
        throw new Error(
            `Component not found: comp-${name}`
        );
    }

    return match;
}

function resolveComponents(content) {
    return content.replace(
        COMPONENT_REGEX,
        (_, componentName) => {
            const componentPath =
                findComponentFile(componentName);

            const componentContent =
                read(componentPath);

            return resolveComponents(componentContent);
        }
    );
}

async function runLint() {
    console.log("Running ESLint...");

    const eslint = new ESLint({
        fix: false
    });

    const results = await eslint.lintFiles(["src/**/*.js"]);

    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    if (resultText) {
        console.log(resultText);
    }

    const hasErrors = results.some(result => result.errorCount > 0);

    if (hasErrors) {
        throw new Error("Build failed: ESLint detected errors.");
    }
    
    console.log("ESLint passed.");
}

async function build() {
    await runLint();

    let html = read("./src/index.html");
    let css = read("./src/styles.css");

    const styles = readDirFiles("./src/styles", ".css");
    const rolltemplates = readDirFiles("./src/rolltemplates", ".html");

    // Bundle JS modules
    const bundle = await esbuild.build({
        entryPoints: ["./src/sheetworkers/main.js"],
        bundle: true,
        write: false,
        format: "iife",
        target: "es2018",
        minify: true
    });

    const workers = bundle.outputFiles[0].text;

    css = css.replace("{{styles}}", styles);

    html = html.replace("{{workers}}", workers);
    html = html.replace("{{rolltemplates}}", rolltemplates);

    html = resolveComponents(html);

    fs.mkdirSync("./dist", { recursive: true });

    fs.writeFileSync("./dist/Freegliders.html", html);
    fs.writeFileSync("./dist/Freegliders.css", css);

    console.log("Compiled successfully.");
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});