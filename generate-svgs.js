const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonFilePath = path.join(__dirname, 'open-pid-icons.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Output directory for SVG files
const outputDir = path.join(__dirname, 'svgs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Generate SVG files for each valve
let readmeContent = `## Generated SVG Icons\n\n`;
jsonData.data.forEach((valve) => {
    const { width, height } = valve;
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width+2} ${height+2}" width="${width+2}" height="${height+2}">
    <rect width="${width+2}" height="${height+2}" fill="white" />
    <path d="${valve.path}" stroke="black" fill="none" stroke-width="1" />
</svg>
    `.trim();

    const fileName = `${valve.name.toLowerCase().replace(/ /g, '_')}.svg`;
    const pathFormatted = `${valve.path.toLowerCase().replace(/ /g, '_')}`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, svgContent, 'utf8');
    console.log(`Generated: ${filePath}`);

    // Add SVG reference to README content
    readmeContent += `${valve.name}\n\n`;
    readmeContent += `<a href="https://yqnn.github.io/svg-path-editor/#P=${pathFormatted}" target="svgeditor">\n`;
    readmeContent += `<img src="https://raw.githubusercontent.com/tbo47/open-pid-icons/refs/heads/main/svgs/${fileName}">\n`;
    readmeContent += `</a>\n\n`;
});

// Update the README.md file
const readmeFilePath = path.join(__dirname, 'LIST.md');
fs.writeFileSync(readmeFilePath, readmeContent, 'utf8');
console.log(`Updated: ${readmeFilePath}`);

console.log('SVG generation and README update complete.');