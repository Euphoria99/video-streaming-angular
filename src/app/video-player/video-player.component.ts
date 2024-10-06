import { Component, Input, OnInit ,OnDestroy} from '@angular/core';
import videojs from 'video.js';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent  {
  @Input() videoUrl: string | null = null; // URL for the video stream
  player: any;

  ngAfterViewInit() {
    this.initPlayer();
  }

  private initPlayer() {
    if (!this.videoUrl) {
      console.error('No video URL provided.');
      return;
    }

    console.log('Initializing player with URL:', this.videoUrl);

    const videoElement = document.getElementById('videoPlayer') as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.videoUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Manifest parsed, playing video');
        videoElement.play();
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = this.videoUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        console.log('Loaded metadata, playing video');
        videoElement.play();
      });
    }
    
    this.player = videojs(videoElement, {
      controls: true,
      autoplay: true,
      preload: 'auto'
    });
}


  ngOnDestroy() {
    if (this.player) {
      this.player.dispose(); // Dispose of the Video.js player
    }
  }
}