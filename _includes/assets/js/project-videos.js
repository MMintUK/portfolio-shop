// Move videos from project content to left column
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
      
      // Add the video to the wrapper
      videoWrapper.appendChild(videoClone);
      
      // Move to videos container
      videosContainer.appendChild(videoWrapper);
      
      // Remove original video from content
      video.remove();
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectVideoMover = new ProjectVideoMover();
});