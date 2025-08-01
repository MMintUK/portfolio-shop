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
    });
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
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      
      // Seek to 10% of video duration for a good frame
      const seekTime = video.duration * 0.1 || 1;
      
      // Set up event listener for when we reach the seek time
      const captureFrame = () => {
        try {
          // Draw the current video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to data URL
          const posterDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          // Set as poster
          video.poster = posterDataUrl;
          
          // Reset video to beginning
          video.currentTime = 0;
          
          // Clean up
          video.removeEventListener('seeked', captureFrame);
        } catch (error) {
          console.warn('Could not generate poster frame:', error);
        }
      };
      
      // Add event listener and seek
      video.addEventListener('seeked', captureFrame, { once: true });
      video.currentTime = seekTime;
      
    } catch (error) {
      console.warn('Error generating video poster:', error);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectVideoMover = new ProjectVideoMover();
});