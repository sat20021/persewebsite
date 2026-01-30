const fs = require('fs');
const path = require('path');

// Simple build script that copies all necessary files to a build directory
const buildDir = path.join(__dirname, 'build');

// Create build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// List of files and directories to copy
const itemsToCopy = [
  'index.html',
  'about.html',
  'blog.html',
  'blog-details.html',
  'cart.html',
  'checkout.html',
  'confirmation.html',
  'contact.html',
  'elements.html',
  'login.html',
  'main.html',
  'product_details.html',
  'shop.html',
  'assets',
  'Doc'
];

// Function to copy files recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy all items to build directory
console.log('Building static site...');
itemsToCopy.forEach(item => {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(buildDir, item);
  
  if (fs.existsSync(srcPath)) {
    console.log(`Copying ${item}...`);
    copyRecursive(srcPath, destPath);
  } else {
    console.log(`Warning: ${item} not found, skipping...`);
  }
});

console.log('Build completed successfully! ✓');
console.log(`Output directory: ${buildDir}`);
