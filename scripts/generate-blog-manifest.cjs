const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Script pour générer automatiquement le manifeste des articles de blog
 */
class BlogManifestGenerator {
  constructor(blogDir = 'src/app/assets/blog', outputPath = 'public/blog/blog-manifest.json') {
    this.blogDir = blogDir;
    this.outputPath = outputPath;
  }

  /**
   * Scanne le dossier blog et génère le manifeste
   */
  generateManifest() {
    console.log('🔍 Scanning blog directory:', this.blogDir);

    if (!fs.existsSync(this.blogDir)) {
      console.error('❌ Blog directory not found:', this.blogDir);
      return;
    }

    const markdownFiles = this.getMarkdownFiles(this.blogDir);
    console.log(`📝 Found ${markdownFiles.length} markdown files`);

    const posts = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Minuit pour comparer uniquement les dates

    for (const filePath of markdownFiles) {
      try {
        const post = this.parseMarkdownFile(filePath);
        if (post) {
          // Filtrer les articles avec une date future
          const postDate = new Date(post.date);
          postDate.setHours(0, 0, 0, 0);

          if (postDate <= today) {
            posts.push(post);
            console.log(`✅ Processed: ${post.title} (${post.date})`);
          } else {
            console.log(`⏭️  Skipped (future date): ${post.title} (${post.date})`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }

    // Trier les articles par date (plus récent en premier)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const manifest = {
      posts,
      lastUpdated: new Date().toISOString(),
      totalPosts: posts.length
    };

    // Créer le dossier de sortie s'il n'existe pas
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.outputPath, JSON.stringify(manifest, null, 2));
    console.log(`🎉 Manifest generated successfully: ${this.outputPath}`);
    console.log(`📊 Total posts: ${posts.length}`);
  }

  /**
   * Récupère tous les fichiers markdown du dossier
   */
  getMarkdownFiles(dir) {
    const files = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recherche récursive dans les sous-dossiers
        files.push(...this.getMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Parse un fichier markdown et extrait les métadonnées
   */
  parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const metadata = parsed.data;
    const contentBody = parsed.content;

    // Extraire la date du nom de fichier (format: YYYY-MM-DD_title.md)
    const fileName = path.basename(filePath);
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

    // Générer le slug depuis le nom de fichier
    const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md$/, '');

    // Calculer le temps de lecture approximatif (250 mots/min)
    const wordCount = contentBody.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 250);

    // Extraire un excerpt du contenu
    const excerpt = this.extractExcerpt(contentBody);

    // Chemin relatif depuis assets
    const relativePath = path.relative('src/app/assets', filePath).replace(/\\/g, '/');

    return {
      id: slug,
      title: metadata.title || 'Article sans titre',
      description: metadata.description || '',
      tags: metadata.tags || [],
      cover: metadata.cover,
      draft: metadata.draft || false,
      lang: metadata.lang || 'fr',
      date,
      slug,
      filename: fileName,
      excerpt,
      readingTime
    };
  }

  /**
   * Extrait un excerpt du contenu markdown
   */
  extractExcerpt(content, maxLength = 200) {
    // Supprimer les balises markdown de base
    const cleanContent = content
      .replace(/#{1,6}\s+/g, '') // Headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/!\[.*?\]\(.*?\)/g, '') // Images
      .replace(/`(.*?)`/g, '$1') // Code
      .replace(/\n+/g, ' ') // Line breaks
      .replace(/^\s+/, '') // Leading spaces
      .trim();

    return cleanContent.length > maxLength
      ? cleanContent.substring(0, maxLength) + '...'
      : cleanContent;
  }
}

// Exécution du script
if (require.main === module) {
  const generator = new BlogManifestGenerator();
  generator.generateManifest();
}

module.exports = BlogManifestGenerator;
