// Move videos from project content to left column and generate poster frames
class ProjectVideoMover {
  constructor() {
    this.init();
  }

  init() {
    // Only run on project pages
    if (!document.querySelector('.project-page')) return;

    const videosContainer = document.getElementById('project-videos-container');
    const contentArea = document.querySelector('.product-additional-info');
    
    if (!videosContainer || !contentArea) return;

    // Find all video elements in the content
    const videos = contentArea.querySelectorAll('video');
    
    if (videos.length === 0) return;

    videos.forEach(video => {
      // Create a wrapper div for each video
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'product-video-large';
      
      // Clone the video element
      const videoClone = video.cloneNode(true);
      
      // Add styling to make videos responsive
      videoClone.style.width = '100%';
      videoClone.style.height = 'auto';
      videoClone.style.marginBottom = '2rem';
      
      // Set up immediate audio unmuting for autoplay videos
      this.setupAutoUnmute(videoClone);
      
      // Generate poster if one doesn't exist
      this.generatePosterFrame(videoClone);
      
      // Add the video to the wrapper
      videoWrapper.appendChild(videoClone);
      
      // Move to videos container
      videosContainer.appendChild(videoWrapper);
      
      // Remove original video from content
      video.remove();
    });

    // Also handle videos that are already in the project-video-content area
    this.handleExistingVideos();
  }

  handleExistingVideos() {
    const existingVideos = document.querySelectorAll('.project-video-content video');
    existingVideos.forEach(video => {
      this.generatePosterFrame(video);
      this.setupAutoUnmute(video);
    });
  }

  setupAutoUnmute(video) {
    // Only handle videos with autoplay and controls
    if (!video.hasAttribute('autoplay') || !video.hasAttribute('controls')) {
      return;
    }

    console.log('🎬 Setting up auto-unmute for video:', video.src || video.querySelector('source')?.src);

    let hasTriedUnmute = false;
    let audioPromptShown = false;

    // Function to try unmuting
    const tryUnmute = async () => {
      if (hasTriedUnmute) return;
      hasTriedUnmute = true;

      console.log('🎵 Attempting to unmute video...');
      
      try {
        // Try to unmute immediately
        video.muted = false;
        
        // Restart video to ensure audio plays
        video.currentTime = 0;
        await video.play();
        
        console.log('✅ Video successfully unmuted and playing with audio');
        
        // Verify audio is actually working after a short delay
        setTimeout(() => {
          if (video.muted) {
            console.warn('⚠️ Video was re-muted by browser, showing prompt');
            this.showAudioPrompt(video);
          } else {
            console.log('🎵 Audio confirmed working');
          }
        }, 500);
        
      } catch (error) {
        console.warn('❌ Failed to unmute video automatically:', error);
        this.showAudioPrompt(video);
      }
    };

    // Try to unmute as soon as possible using multiple triggers
    const immediateUnmute = () => {
      // Try unmuting immediately on any user interaction
      tryUnmute();
    };

    // Listen for any user interaction to enable audio
    const interactionEvents = ['click', 'touchstart', 'keydown', 'mousemove'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, immediateUnmute, { once: true });
    });

    // Also try when video events fire
    video.addEventListener('loadeddata', tryUnmute, { once: true });
    video.addEventListener('canplay', tryUnmute, { once: true });
    video.addEventListener('play', tryUnmute, { once: true });

    // Final fallback - show prompt if still muted after delay
    setTimeout(() => {
      if (video.muted && !audioPromptShown) {
        console.log('🔇 Video still muted after attempts, showing audio prompt');
        this.showAudioPrompt(video);
      }
    }, 2000);
  }

  showAudioPrompt(video) {
    // Create prominent audio enable button
    const prompt = document.createElement('div');
    prompt.className = 'video-audio-prompt';
    prompt.innerHTML = '🔊 Click to Enable Audio';
    prompt.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff4444;
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      z-index: 1000;
      cursor: pointer;
      border: 3px solid white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
    `;

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
    `;
    document.head.appendChild(style);

    // Make video container relative for positioning
    const wrapper = video.parentElement;
    if (wrapper) {
      wrapper.style.position = 'relative';
      wrapper.appendChild(prompt);

      // Handle click to enable audio
      prompt.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        try {
          video.muted = false;
          video.currentTime = 0;
          await video.play();
          
          console.log('🎵 Audio enabled by user click');
          
          // Remove prompt
          prompt.style.opacity = '0';
          setTimeout(() => prompt.remove(), 300);
          
        } catch (error) {
          console.error('Failed to enable audio:', error);
        }
      });

      // Auto-hide prompt if video gets unmuted elsewhere
      const checkMuted = () => {
        if (!video.muted && prompt.parentElement) {
          prompt.style.opacity = '0';
          setTimeout(() => prompt.remove(), 300);
        }
      };
      
      video.addEventListener('volumechange', checkMuted);
    }
  }


  generatePosterFrame(video) {
    // Skip if video already has a poster
    if (video.poster && video.poster.trim() !== '') return;

    // Wait for video metadata to load
    if (video.readyState >= video.HAVE_METADATA) {
      this.createPoster(video);
    } else {
      video.addEventListener('loadedmetadata', () => {
        this.createPoster(video);
      });
    }
  }

  createPoster(video) {
    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn('Video poster generation timed out for:', video.src);
      this.tryAlternativePosterMethods(video);
    }, 5000);

    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      
      // Try multiple seek times for better frame capture
      const seekTimes = [
        video.duration * 0.1 || 1,
        video.duration * 0.2 || 2, 
        video.duration * 0.05 || 0.5,
        3 // fallback fixed time
      ];
      
      let currentTimeIndex = 0;
      
      // Set up event listener for when we reach the seek time
      const captureFrame = () => {
        try {
          // Check if video has valid dimensions
          if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.warn('Video has invalid dimensions, trying next seek time');
            this.tryNextSeekTime();
            return;
          }
          
          // Update canvas size to actual video dimensions
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw the current video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Check if we actually drew something (not a blank frame)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const isBlank = this.isBlankFrame(imageData);
          
          if (isBlank && currentTimeIndex < seekTimes.length - 1) {
            console.warn('Captured blank frame, trying next seek time');
            this.tryNextSeekTime();
            return;
          }
          
          // Convert canvas to data URL
          const posterDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          // Set as poster
          video.poster = posterDataUrl;
          
          // Reset video to beginning
          video.currentTime = 0;
          
          // Clean up
          clearTimeout(timeout);
          video.removeEventListener('seeked', captureFrame);
          video.removeEventListener('error', handleError);
          
          console.log('Successfully generated poster for video:', video.src);
          
        } catch (error) {
          console.warn('Could not generate poster frame:', error);
          this.tryNextSeekTime();
        }
      };
      
      const tryNextSeekTime = () => {
        currentTimeIndex++;
        if (currentTimeIndex < seekTimes.length) {
          video.currentTime = seekTimes[currentTimeIndex];
        } else {
          console.warn('All seek times failed, trying alternative methods');
          clearTimeout(timeout);
          video.removeEventListener('seeked', captureFrame);
          video.removeEventListener('error', handleError);
          this.tryAlternativePosterMethods(video);
        }
      };
      
      this.tryNextSeekTime = tryNextSeekTime;
      
      const handleError = (error) => {
        console.warn('Video error during poster generation:', error);
        clearTimeout(timeout);
        video.removeEventListener('seeked', captureFrame);
        video.removeEventListener('error', handleError);
        this.tryAlternativePosterMethods(video);
      };
      
      // Add event listeners
      video.addEventListener('seeked', captureFrame);
      video.addEventListener('error', handleError);
      
      // Start with first seek time
      video.currentTime = seekTimes[0];
      
    } catch (error) {
      clearTimeout(timeout);
      console.warn('Error generating video poster:', error);
      this.tryAlternativePosterMethods(video);
    }
  }

  // Check if the captured frame is essentially blank/black
  isBlankFrame(imageData) {
    const data = imageData.data;
    let nonBlackPixels = 0;
    const threshold = 0.05; // 5% non-black pixels required
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Consider pixel non-black if any channel > 30
      if (r > 30 || g > 30 || b > 30) {
        nonBlackPixels++;
      }
    }
    
    const totalPixels = data.length / 4;
    const nonBlackRatio = nonBlackPixels / totalPixels;
    
    return nonBlackRatio < threshold;
  }

  // Try alternative methods if canvas approach fails
  tryAlternativePosterMethods(video) {
    // Method 1: Use the cover image from the project if it exists
    const coverImage = this.findProjectCoverImage();
    if (coverImage) {
      video.poster = coverImage;
      console.log('Using project cover image as video poster:', coverImage);
      return;
    }
    
    // Method 2: Try to use preload="metadata" and wait longer
    if (video.preload !== 'metadata') {
      video.preload = 'metadata';
      setTimeout(() => {
        if (video.readyState >= video.HAVE_METADATA) {
          this.createPoster(video);
        }
      }, 2000);
      return;
    }
    
    // Method 3: Add a default video poster style
    this.addDefaultVideoPoster(video);
  }

  // Find cover image from project data
  findProjectCoverImage() {
    // Look for images in the project that could serve as a poster
    const projectImages = document.querySelectorAll('.product-images img, .project-video-content img');
    if (projectImages.length > 0) {
      return projectImages[0].src;
    }
    
    // Look for any images in the project content
    const contentImages = document.querySelectorAll('.product-description img, .product-additional-info img');
    if (contentImages.length > 0) {
      return contentImages[0].src;
    }
    
    return null;
  }

  // Add a styled default poster when all else fails
  addDefaultVideoPoster(video) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add a play icon
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.8;
    
    // Draw play triangle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;
    
    ctx.beginPath();
    ctx.moveTo(centerX - size/2, centerY - size/2);
    ctx.lineTo(centerX + size/2, centerY);
    ctx.lineTo(centerX - size/2, centerY + size/2);
    ctx.closePath();
    ctx.fill();
    
    // Add text
    ctx.font = '48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Video', centerX, centerY + size + 60);
    
    video.poster = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Applied default poster to video');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectVideoMover = new ProjectVideoMover();
});