const fs = require("fs");
const path = require("path");

// Function to extract dimensions from a JPEG file
function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;

    if (marker === 0xffc0) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += buffer.readUInt16BE(offset);
  }
  return null;
}

// Function to extract dimensions from a PNG file
function getPngDimensions(buffer) {
  if (buffer.toString("ascii", 12, 16) === "IHDR") {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }
  return null;
}

// Function to get image dimensions based on the file type
function getImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (buffer.readUInt16BE(0) === 0xffd8) {
    // JPEG
    return getJpegDimensions(buffer);
  } else if (buffer.toString("ascii", 1, 4) === "PNG") {
    // PNG
    return getPngDimensions(buffer);
  }
  // Add additional file type handlers if necessary
  return null;
}

// Function to get image info
function getImageInfo(filePath, baseDir) {
  try {
    const dimensions = getImageDimensions(filePath);
    if (dimensions) {
      const relativePath = path.relative(baseDir, filePath);
      const src = `/${relativePath.split(path.sep).join("/")}`; // Prepend "/" and ensure POSIX-style paths
      return {
        width: dimensions.width,
        height: dimensions.height,
        src: src,
      };
    } else {
      console.warn(`Unsupported image format for file: ${filePath}`);
      return null;
    }
  } catch (error) {
    console.error(`Error occurred while reading image ${filePath}:`, error);
    return null;
  }
}

// Recursive function to read image files from a directory and its subdirectories
function readImagesFromDirectory(directoryPath, baseDir) {
  let imagesInfo = [];
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Recursively read from subdirectory
      imagesInfo = imagesInfo.concat(
        readImagesFromDirectory(itemPath, baseDir)
      );
    } else if (stats.isFile()) {
      const extname = path.extname(itemPath).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(extname)) {
        const imageInfo = getImageInfo(itemPath, baseDir);
        if (imageInfo) {
          imagesInfo.push(imageInfo);
        }
      }
    }
  });

  return imagesInfo;
}

// Function to generate JSON output from the specified directory and write to output directory
function generateJsonFromDirectory(inputDirectoryPath, outputDirectoryPath) {
  try {
    const imagesInfo = readImagesFromDirectory(
      inputDirectoryPath,
      inputDirectoryPath
    );
    const jsonOutput = JSON.stringify(imagesInfo, null, 2);
    console.log(jsonOutput);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDirectoryPath)) {
      fs.mkdirSync(outputDirectoryPath, { recursive: true });
    }

    // Write the output to a file in the output directory
    const outputFilePath = path.join(
      outputDirectoryPath,
      "images-manifest.json"
    );
    fs.writeFileSync(outputFilePath, jsonOutput);
    console.log(`JSON output written to ${outputFilePath}`);
  } catch (err) {
    console.error(`Error processing directory ${inputDirectoryPath}:`, err);
  }
}

// Get the directory paths from command-line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error(
    "Usage: node make-next-images-manifest <input-directory-path> <output-directory-path>"
  );
  process.exit(1);
}

const inputDirectoryPath = args[0];
const outputDirectoryPath = args[1];

// Generate JSON output from the specified directory
generateJsonFromDirectory(inputDirectoryPath, outputDirectoryPath);
