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

const COMPONENT_REGEX = /<comp-([a-z0-9-]+)([^>]*)><\/comp-\1>/g;

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
        throw new Error(`Component not found: comp-${name}`);
    }

    return match;
}

function parseProps(propString) {
    const props = {};

    const ATTR_REGEX = /([a-zA-Z0-9-_]+)="([^"]*)"/g;

    let match;

    while ((match = ATTR_REGEX.exec(propString)) !== null) {
        props[match[1]] = match[2];
    }

    return props;
}

function injectProps(content, props) {
    for (const [key, value] of Object.entries(props)) {
        content = content.replaceAll(`$${key}$`, value);
    }

    return content;
}

function processConditionals(content, props) {
    let index = 0;

    function startsWith(str) {
        return content.startsWith(str, index);
    }

    function consume(str) {
        if (!startsWith(str)) {
            throw new Error(
                `Expected '${str}' at index ${index}`
            );
        }

        index += str.length;
    }

    function parseBlock(stopTokens = []) {
        let result = "";

        while (index < content.length) {

            // ELSE
            if (startsWith("$else$")) {
                if (stopTokens.includes("else")) {
                    consume("$else$");

                    return {
                        token: "else",
                        content: result
                    };
                }
            }

            // END
            if (startsWith("$end$")) {
                if (stopTokens.includes("end")) {
                    consume("$end$");

                    return {
                        token: "end",
                        content: result
                    };
                }
            }

            // IF
            if (startsWith("$if:")) {
                result += parseIf();
                continue;
            }

            // Normal character
            result += content[index];
            index++;
        }

        return {
            token: null,
            content: result
        };
    }

    function parseIf() {
        consume("$if:");

        let negated = false;

        if (content[index] === "!") {
            negated = true;
            index++;
        }

        // Read variable name
        let varName = "";

        while (
            index < content.length &&
            content[index] !== "$"
        ) {
            varName += content[index];
            index++;
        }

        consume("$");

        if (!varName) {
            throw new Error(
                "Empty conditional variable name."
            );
        }

        // Parse IF block
        const ifResult =
            parseBlock(["else", "end"]);

        if (ifResult.token === null) {
            throw new Error(
                `Missing $end$ for $if:${varName}$`
            );
        }

        let elseContent = "";

        if (ifResult.token === "else") {
            const elseResult =
                parseBlock(["end"]);

            elseContent = elseResult.content;
        }

        const rawValue = props[varName];

        const value =
            rawValue === true ||
            rawValue === "true";

        const finalValue =
            negated
                ? !value
                : value;

        return finalValue
            ? ifResult.content
            : elseContent;
    }

    const result = parseBlock().content;

    if (
        result.includes("$else$") ||
        result.includes("$end$")
    ) {
        throw new Error(
            "Unexpected $else$ or $end$ found."
        );
    }

    return result;
}

function resolveComponents(content) {
    return content.replace(
        COMPONENT_REGEX,
        (_, componentName, propString) => {
            const componentPath = findComponentFile(componentName);

            let componentContent = read(componentPath);

            const props = parseProps(propString);

            componentContent = processConditionals(componentContent, props);
            componentContent = injectProps(componentContent, props);
            componentContent = resolveComponents(componentContent);

            const unresolved = componentContent.match(/\$[a-zA-Z0-9-_]+\$/g)?.filter(
                token =>
                    !token.startsWith("$if:") &&
                    token !== "$else$" &&
                    token !== "$end$"
                );

            if (unresolved) {
                throw new Error(
                    `Unresolved props in component '${componentName}'\n\n` +
                    `Passed props:\n${JSON.stringify(props, null, 2)}\n\n` +
                    `Unresolved:\n${unresolved.join("\n")}`
                );
            }

            return componentContent;
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