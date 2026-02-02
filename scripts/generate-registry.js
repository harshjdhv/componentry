const fs = require('fs');
const path = require('path');

// Configuration
const COMPONENT_DIR = path.join(__dirname, '../packages/ui/src/components');
const REGISTRY_DIR = path.join(__dirname, '../apps/web/public/r');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a component name (e.g., scroll-based-velocity)');
  process.exit(1);
}

const componentName = args[0];
const componentFilename = `${componentName}.tsx`;
const sourcePath = path.join(COMPONENT_DIR, componentFilename);
const registryPath = path.join(REGISTRY_DIR, `${componentName}.json`);

// Check if source component exists
if (!fs.existsSync(sourcePath)) {
  console.error(`Component file not found at: ${sourcePath}`);
  process.exit(1);
}

// Read source content
const sourceContent = fs.readFileSync(sourcePath, 'utf8');

// Prepare registry data
let registryData;
if (fs.existsSync(registryPath)) {
  try {
    registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    console.log(`Updating existing registry file for ${componentName}...`);
  } catch (error) {
    console.error('Error parsing existing registry file:', error);
    process.exit(1);
  }
} else {
  console.log(`Creating new registry file for ${componentName}...`);
  registryData = {
    name: componentName,
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    description: `Component for ${componentName}`, // Default description
    files: []
  };
}

// Update or add the main file content
// We assume simple 1-file component structure for now or find the matching file path
const targetFilePath = `components/ui/${componentFilename}`;

if (!registryData.files) {
    registryData.files = [];
}

const existingFileIndex = registryData.files.findIndex(f => f.path === targetFilePath || f.path.endsWith(componentFilename));

if (existingFileIndex >= 0) {
  registryData.files[existingFileIndex].content = sourceContent;
} else {
  registryData.files.push({
    path: targetFilePath,
    content: sourceContent,
    type: 'registry:ui'
  });
}

// Write back to registry file
fs.writeFileSync(registryPath, JSON.stringify(registryData, null, 2));

console.log(`Successfully updated ${registryPath}`);
