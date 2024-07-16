const fs = require('fs-extra');
const path = require('path');

async function readFileContent(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file: ${filePath}`);
        throw err;
    }
}

async function replaceReferences(content, baseDir) {
    const scriptTagRegex = /<script\s+src="([^"]+)"\s*><\/script>/g;
    const linkTagRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g;

    // Replace <script src="..."></script> references
    content = await replaceTagReferences(content, baseDir, scriptTagRegex, '<script>${content}</script>');
    // Replace <link rel="stylesheet" href="..."> references
    content = await replaceTagReferences(content, baseDir, linkTagRegex, '<style>${content}</style>');

    return content;
}

async function replaceTagReferences(content, baseDir, regex, replacementTemplate) {
    let match;
    while ((match = regex.exec(content)) !== null) {
        const relativePath = match[1];
        if (isExternalLink(relativePath)) {
            continue;  // Skip external links
        }
        const absolutePath = path.resolve(baseDir, relativePath);

        try {
            const fileContent = await readFileContent(absolutePath);
            const replacement = replacementTemplate.replace('${content}', fileContent);
            content = content.replace(match[0], replacement);
        } catch (err) {
            console.error(`Error processing reference: ${relativePath}`);
            throw err;
        }
    }
    return content;
}

function isExternalLink(link) {
    return /^(https?:)?\/\//.test(link);
}

async function compileFile(filePath) {
    const baseDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const compiledFileName = `compiled-${fileName}`;
    const compiledFilePath = path.join(baseDir, compiledFileName);

    try {
        let content = await readFileContent(filePath);
        content = await replaceReferences(content, baseDir);
        await fs.writeFile(compiledFilePath, content, 'utf8');
        console.log(`Compiled file saved as: ${compiledFilePath}`);
    } catch (err) {
        console.error(`Error compiling file: ${filePath}`);
    }
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node compile.js <path to the document>');
    process.exit(1);
}

compileFile(filePath);
