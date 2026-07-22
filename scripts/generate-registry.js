const fs = require('fs');
const path = require('path');

const REGISTRY_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

// Configuration
const COMPONENT_DIR = path.join(__dirname, '../packages/ui/src/components');
const REGISTRY_DIR = path.join(__dirname, '../apps/web/public/r');
const REGISTRY_INDEX_PATH = path.join(REGISTRY_DIR, 'registry.json');
const WEBGL_ERROR_BOUNDARY_FILENAME = 'webgl-error-boundary.tsx';
const WEBGL_ERROR_BOUNDARY_SOURCE_PATH = path.join(COMPONENT_DIR, WEBGL_ERROR_BOUNDARY_FILENAME);

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

function toTitleCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeRegistryContent(content) {
  return content
    .replace(/@workspace\/ui\/lib\/utils/g, '@/lib/utils')
    .replace(
      /@workspace\/ui\/components\/webgl-error-boundary/g,
      './webgl-error-boundary'
    );
}

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
    $schema: REGISTRY_ITEM_SCHEMA,
    name: componentName,
    type: 'registry:ui',
    title: toTitleCase(componentName),
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    description: `Component for ${componentName}`, // Default description
    files: []
  };
}

if (!registryData.$schema) {
  registryData.$schema = REGISTRY_ITEM_SCHEMA;
}

if (!registryData.title) {
  registryData.title = toTitleCase(componentName);
}

if (!Array.isArray(registryData.dependencies)) {
  registryData.dependencies = [];
}

if (!Array.isArray(registryData.devDependencies)) {
  registryData.devDependencies = [];
}

if (!Array.isArray(registryData.registryDependencies)) {
  registryData.registryDependencies = [];
}

// Update or add the main file content
// We assume simple 1-file component structure for now or find the matching file path
const targetFilePath = `components/ui/${componentFilename}`;

if (!registryData.files) {
    registryData.files = [];
}

const existingFileIndex = registryData.files.findIndex(f => f.path === targetFilePath || f.path.endsWith(componentFilename));

if (existingFileIndex >= 0) {
  registryData.files[existingFileIndex].content = normalizeRegistryContent(sourceContent);
} else {
  registryData.files.push({
    path: targetFilePath,
    content: normalizeRegistryContent(sourceContent),
    type: 'registry:ui'
  });
}

// Include shared helper file when the component uses the WebGL error boundary.
const usesWebGLErrorBoundary = sourceContent.includes('webgl-error-boundary');
if (usesWebGLErrorBoundary && fs.existsSync(WEBGL_ERROR_BOUNDARY_SOURCE_PATH)) {
  const boundaryContent = normalizeRegistryContent(
    fs.readFileSync(WEBGL_ERROR_BOUNDARY_SOURCE_PATH, 'utf8')
  );
  const boundaryTargetPath = `components/ui/${WEBGL_ERROR_BOUNDARY_FILENAME}`;
  const boundaryIndex = registryData.files.findIndex(
    (f) => f.path === boundaryTargetPath || f.path.endsWith(WEBGL_ERROR_BOUNDARY_FILENAME)
  );

  if (boundaryIndex >= 0) {
    registryData.files[boundaryIndex].content = boundaryContent;
  } else {
    registryData.files.push({
      path: boundaryTargetPath,
      content: boundaryContent,
      type: 'registry:ui'
    });
  }
}

// Write back to registry file
fs.writeFileSync(registryPath, JSON.stringify(registryData, null, 2));

console.log(`Successfully updated ${registryPath}`);

// Keep registry.json in sync when present.
if (fs.existsSync(REGISTRY_INDEX_PATH)) {
  try {
    const registryIndex = JSON.parse(fs.readFileSync(REGISTRY_INDEX_PATH, 'utf8'));
    if (!Array.isArray(registryIndex.items)) {
      registryIndex.items = [];
    }

    const existingNames = new Set(
      registryIndex.items
        .map((item) => (typeof item === 'string' ? item : item?.name))
        .filter(Boolean)
    );

    if (!existingNames.has(componentName)) {
      registryIndex.items.push({
        name: componentName,
        type: 'registry:ui',
      });
      registryIndex.items.sort((a, b) => {
        const aName = typeof a === 'string' ? a : a.name;
        const bName = typeof b === 'string' ? b : b.name;
        return aName.localeCompare(bName);
      });
      fs.writeFileSync(REGISTRY_INDEX_PATH, JSON.stringify(registryIndex, null, 2));
      console.log(`Added ${componentName} to ${REGISTRY_INDEX_PATH}`);
    }
  } catch (error) {
    console.error('Warning: could not sync apps/web/public/r/registry.json:', error.message);
  }
}
