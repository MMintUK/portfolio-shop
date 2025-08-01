const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
  // Configuration
  const videoDir = './assets/uploads';
  const gifDir = './assets/uploads/gifs';
  const gifStartTime = 6; // Start at 6 seconds
  const gifDuration = 4; // 4 second duration
  const gifFps = 12; // Lower FPS for smaller file size
  const gifWidth = 400; // Max width for reasonable file size

  // Ensure GIF directory exists
  if (!fs.existsSync(gifDir)) {
    fs.mkdirSync(gifDir, { recursive: true });
    console.log('📁 Created GIF directory:', gifDir);
  }

  // Function to check if FFmpeg is available
  function checkFFmpeg() {
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.warn('⚠️  FFmpeg not found. GIF generation will be skipped.');
      console.warn('   Install FFmpeg to enable automatic GIF generation.');
      return false;
    }
  }

  // Function to generate GIF from video
  function generateGIF(videoPath, gifPath) {
    try {
      const command = `ffmpeg -ss ${gifStartTime} -t ${gifDuration} -i "${videoPath}" -vf "fps=${gifFps},scale=${gifWidth}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -y "${gifPath}"`;
      
      console.log(`🎬 Generating GIF: ${path.basename(gifPath)}`);
      execSync(command, { stdio: 'pipe' });
      console.log(`✅ Generated: ${path.basename(gifPath)}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to generate GIF for ${path.basename(videoPath)}:`, error.message);
      return false;
    }
  }

  // Function to get video files and generate GIFs
  function processVideos() {
    if (!checkFFmpeg()) {
      return {};
    }

    const videoFiles = [];
    const gifMap = {};

    // Find all video files in uploads directory
    if (fs.existsSync(videoDir)) {
      const files = fs.readdirSync(videoDir);
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.mp4', '.webm', '.mov'].includes(ext)) {
          videoFiles.push(file);
        }
      });
    }

    console.log(`🎥 Found ${videoFiles.length} video files`);

    // Process each video file
    videoFiles.forEach(videoFile => {
      const videoPath = path.join(videoDir, videoFile);
      const baseName = path.parse(videoFile).name;
      const gifFile = `${baseName}.gif`;
      const gifPath = path.join(gifDir, gifFile);

      // Check if GIF already exists and is newer than video
      let shouldGenerate = true;
      if (fs.existsSync(gifPath)) {
        const videoStat = fs.statSync(videoPath);
        const gifStat = fs.statSync(gifPath);
        
        if (gifStat.mtime > videoStat.mtime) {
          console.log(`⏭️  Skipping ${gifFile} (already up to date)`);
          shouldGenerate = false;
        }
      }

      if (shouldGenerate) {
        const success = generateGIF(videoPath, gifPath);
        if (success) {
          // Create mapping for templates
          gifMap[videoFile] = `/assets/uploads/gifs/${gifFile}`;
        }
      } else {
        // Still add to map if GIF exists
        gifMap[videoFile] = `/assets/uploads/gifs/${gifFile}`;
      }
    });

    return gifMap;
  }

  // Add the GIF generation to the build process
  eleventyConfig.on('eleventy.before', async () => {
    console.log('🎬 Starting GIF generation...');
    const gifMap = processVideos();
    
    // Store the mapping for use in templates
    eleventyConfig.addGlobalData('videoGifs', gifMap);
    
    console.log(`✅ GIF generation complete. Generated/found ${Object.keys(gifMap).length} GIFs`);
  });

  // Add passthrough copy for the GIFs directory
  eleventyConfig.addPassthroughCopy('assets/uploads/gifs');

  // Helper function for templates to get GIF path
  eleventyConfig.addFilter('getVideoGif', function(videoSrc) {
    // Extract filename from video source
    const filename = path.basename(videoSrc);
    const baseName = path.parse(filename).name;
    return `/assets/uploads/gifs/${baseName}.gif`;
  });

  console.log('🎬 GIF Generator plugin loaded');
};