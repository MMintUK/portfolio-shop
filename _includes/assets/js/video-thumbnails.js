/**
 * Simple Video Thumbnail Loader
 * No lazy loading - loads all videos immediately for better performance
 */

class VideoThumbnailLoader {
  constructor() {
    this.loadedVideos = new Set();
    this.playingVideos = new Set();
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadAllVideos());
    } else {
      this.loadAllVideos();
    }

    // Periodic check to ensure videos keep playing
    setInterval(() => {
      this.checkVideoPlayback();
    }, 5000); // Check every 5 seconds
  }

  checkVideoPlayback() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail.video-loaded');
    
    videoThumbnails.forEach(thumbnail => {
      const videoElement = thumbnail.querySelector('.project-video-thumbnail');
      
      if (videoElement && videoElement.src) {
        const rect = thumbnail.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        // If video is visible but paused, restart it
        if (isVisible && videoElement.paused) {
          console.log('VideoThumbnailLoader: Restarting paused visible video during periodic check');
          videoElement.play().catch(error => {
            console.log('VideoThumbnailLoader: Failed to restart video during check:', error);
          });
        }
      }
    });
  }

  loadAllVideos() {
    // Load all videos immediately - no lazy loading
    const videoThumbnails = document.querySelectorAll('.video-thumbnail[data-video-src]');
    console.log(`VideoThumbnailLoader: Found ${videoThumbnails.length} video thumbnails - loading all immediately`);
    
    videoThumbnails.forEach((thumbnail, index) => {
      // Stagger loading slightly to prevent overwhelming the browser
      setTimeout(() => this.loadVideo(thumbnail), index * 100);
    });
  }

  loadVideo(thumbnailElement) {
    const videoSrc = thumbnailElement.dataset.videoSrc;
    const videoElement = thumbnailElement.querySelector('.project-video-thumbnail');
    
    if (!videoSrc || !videoElement || this.loadedVideos.has(videoSrc)) {
      return;
    }

    console.log(`VideoThumbnailLoader: Loading video ${videoSrc}`);
    
    // Mark as loading
    thumbnailElement.classList.add('video-loading');
    this.loadedVideos.add(videoSrc);

    // Optimize video element for autoplay
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.preload = 'metadata';
    videoElement.loop = true;
    
    // Create and set video source
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc;
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);

    // Add timeout to prevent hanging
    const loadTimeout = setTimeout(() => {
      console.warn(`VideoThumbnailLoader: Video load timeout for ${videoSrc}`);
      this.onVideoError(thumbnailElement, videoElement);
    }, 10000);

    // Handle video metadata loaded
    videoElement.addEventListener('loadedmetadata', () => {
      clearTimeout(loadTimeout);
      this.onVideoReady(thumbnailElement, videoElement);
    }, { once: true });

    // Handle video load error
    videoElement.addEventListener('error', (e) => {
      clearTimeout(loadTimeout);
      console.error(`VideoThumbnailLoader: Video error for ${videoSrc}:`, e);
      this.onVideoError(thumbnailElement, videoElement);
    }, { once: true });

    // Load the video
    videoElement.load();
  }

  onVideoReady(thumbnailElement, videoElement) {
    thumbnailElement.classList.remove('video-loading');
    thumbnailElement.classList.add('video-loaded');
    
    console.log(`VideoThumbnailLoader: Video ready ${thumbnailElement.dataset.videoSrc}`);
    
    // Show video and start simple autoplay - no seeking, no complex loops
    videoElement.style.display = 'block';
    this.playingVideos.add(videoElement);
    
    // Simple autoplay attempt
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`VideoThumbnailLoader: Video playing ${thumbnailElement.dataset.videoSrc}`);
        })
        .catch(error => {
          console.warn(`VideoThumbnailLoader: Autoplay failed for ${thumbnailElement.dataset.videoSrc}:`, error);
          // Keep the poster image visible if autoplay fails
          thumbnailElement.classList.remove('video-loaded');
          this.playingVideos.delete(videoElement);
        });
    }

    // Handle video pause/play events for tracking
    videoElement.addEventListener('pause', () => {
      this.playingVideos.delete(videoElement);
      
      // If video paused unexpectedly (not by user), try to restart it
      setTimeout(() => {
        if (videoElement.paused && thumbnailElement.classList.contains('video-loaded')) {
          const rect = thumbnailElement.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            console.log('VideoThumbnailLoader: Restarting paused video that should be playing');
            videoElement.play().catch(error => {
              console.log('VideoThumbnailLoader: Failed to restart video:', error);
            });
          }
        }
      }, 1000);
    });

    videoElement.addEventListener('play', () => {
      this.playingVideos.add(videoElement);
    });

    // Handle video ended event (in case loop fails)
    videoElement.addEventListener('ended', () => {
      if (thumbnailElement.classList.contains('video-loaded')) {
        console.log('VideoThumbnailLoader: Video ended, restarting playback');
        videoElement.currentTime = 0;
        videoElement.play().catch(error => {
          console.log('VideoThumbnailLoader: Failed to restart ended video:', error);
        });
      }
    });

    // Handle video stalling
    videoElement.addEventListener('stalled', () => {
      console.log('VideoThumbnailLoader: Video stalled, attempting to resume');
      if (!videoElement.paused) {
        videoElement.load();
        videoElement.play().catch(error => {
          console.log('VideoThumbnailLoader: Failed to resume stalled video:', error);
        });
      }
    });
  }


  onVideoError(thumbnailElement, videoElement) {
    const videoSrc = thumbnailElement.dataset.videoSrc;
    console.warn(`VideoThumbnailLoader: Video failed to load: ${videoSrc}`);
    thumbnailElement.classList.remove('video-loading');
    
    // Try alternative approach - maybe the file path is wrong
    this.debugVideoPath(videoSrc);
    
    // Keep poster image visible on error
  }

  debugVideoPath(videoSrc) {
    // Log video src for debugging
    console.log(`VideoThumbnailLoader: Debugging video path: ${videoSrc}`);
    
    // Try to fetch the video to see if it exists
    fetch(videoSrc, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          console.error(`VideoThumbnailLoader: Video file not found (${response.status}): ${videoSrc}`);
        } else {
          console.log(`VideoThumbnailLoader: Video file exists but failed to load: ${videoSrc}`);
        }
      })
      .catch(error => {
        console.error(`VideoThumbnailLoader: Network error checking video: ${videoSrc}`, error);
      });
  }


  // Method to manually trigger video loading (for hover interactions, etc.)
  loadVideoOnDemand(thumbnailElement) {
    if (!thumbnailElement.classList.contains('video-loaded') && 
        !thumbnailElement.classList.contains('video-loading')) {
      this.loadVideo(thumbnailElement);
    }
  }
}

// Initialize the video thumbnail loader
const videoLoader = new VideoThumbnailLoader();

// Simple initialization log
console.log('🎬 VideoThumbnailLoader initialized - using simple autoplay');

// Optional: Add hover interaction to load videos on demand
document.addEventListener('DOMContentLoaded', () => {
  const videoThumbnails = document.querySelectorAll('.video-thumbnail[data-video-src]');
  
  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', () => {
      // Load video on hover for desktop users
      if (window.innerWidth > 768) {
        const loader = new VideoThumbnailLoader();
        loader.loadVideoOnDemand(thumbnail);
      }
    }, { once: true });
  });
});