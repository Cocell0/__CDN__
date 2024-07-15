const fs = require('fs');
const path = require('path');

// Function to read the content of a file
function readFileContent(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Function to process HTML file and replace link/script references with actual content
function processHTMLFile(filePath) {
    let content = readFileContent(filePath);

    // Replace <link> tags with the actual content
    content = content.replace(/<link rel="stylesheet" href="(.+?)">/g, (match, href) => {
        const cssFilePath = path.resolve(path.dirname(filePath), href);
        const cssContent = readFileContent(cssFilePath);
        return `<style>\n${cssContent}\n</style>`;
    });

    // Replace <script> tags with the actual content
    content = content.replace(/<script src="(.+?)"><\/script>/g, (match, src) => {
        const jsFilePath = path.resolve(path.dirname(filePath), src);
        const jsContent = readFileContent(jsFilePath);
        return `<script>\n${jsContent}\n</script>`;
    });

    return content;
}

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node compile.js <input-html-file> [output-html-file]');
    process.exit(1);
}

const inputFilePath = args[0];
let outputFilePath;

if (args.length === 2) {
    outputFilePath = args[1];
} else {
    const inputDir = path.dirname(inputFilePath);
    const inputFileName = path.basename(inputFilePath);
    const outputFileName = `compiled-${inputFileName}`;
    outputFilePath = path.join(inputDir, outputFileName);
}

// Process the HTML file
const compiledHTMLContent = processHTMLFile(inputFilePath);

// Write the compiled content to a new file
fs.writeFileSync(outputFilePath, compiledHTMLContent, 'utf-8');

console.log('Compilation complete. Output file created at:', outputFilePath);