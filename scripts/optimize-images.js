const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const inputDir = './public';
const outputDir = './public/optimized';

// Créer le dossier optimized s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Calcule la qualité en fonction de la taille de l'image
async function calculateQuality(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  const imageSize = metadata.width * metadata.height;
  
  // Définir des seuils de taille
  const smallImage = 800 * 600;    // 480,000 pixels
  const mediumImage = 1920 * 1080; // 2,073,600 pixels
  const largeImage = 2560 * 1440;  // 3,686,400 pixels
  
  // Ajuster la qualité en fonction de la taille
  if (imageSize <= smallImage) {
    return { quality: 95, resize: { width: metadata.width, height: metadata.height } };
  } else if (imageSize <= mediumImage) {
    return { quality: 90, resize: { width: 1920, height: 1920 } };
  } else if (imageSize <= largeImage) {
    return { quality: 85, resize: { width: 2560, height: 2560 } };
  } else {
    return { quality: 80, resize: { width: 3840, height: 3840 } };
  }
}

// Optimiser une seule image
async function optimizeImage(inputPath) {
  const fileName = path.basename(inputPath);
  if (!fileName.match(/\.(jpg|jpeg|png)$/i)) return;

  const outputPath = path.join(outputDir, fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  console.log(`Optimisation de ${fileName}...`);

  try {
    const { quality, resize } = await calculateQuality(inputPath);
    
    await sharp(inputPath)
      .resize({
        ...resize,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: quality,
        effort: 6,
        smartSubsample: true,
        nearLossless: quality > 90
      })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
    
    console.log(`✓ ${fileName} optimisé ! Réduction de ${savings}% (Qualité: ${quality}%)`);
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${fileName}:`, error);
  }
}

// Traiter toutes les images
async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    if (fs.statSync(inputPath).isFile()) {
      await optimizeImage(inputPath);
    }
  }
}

// Surveiller les modifications des images
function watchImages() {
  const watcher = chokidar.watch(inputDir, {
    ignored: /(^|[\/\\])\../, // Ignorer les fichiers cachés
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('add', path => optimizeImage(path))
    .on('change', path => optimizeImage(path))
    .on('unlink', path => {
      const webpPath = path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const outputPath = path.join(outputDir, path.basename(webpPath));
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
        console.log(`Image supprimée: ${outputPath}`);
      }
    });

  console.log('Surveillance des modifications d\'images activée...');
}

// Exécuter l'optimisation initiale et démarrer la surveillance
optimizeAllImages().then(() => {
  console.log('Optimisation initiale terminée !');
  watchImages();
}).catch(console.error); 