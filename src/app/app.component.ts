import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';
import Hls from 'hls.js';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private apiUrl = environment.apiUrl;
  title = 'VideoStreamingApp';

  videoId: string = "c0b29cc2-7b5c-4a54-9574-7c08cc2dc8dc";
  videoUrl: string;

  constructor() {
    this.videoUrl = `${this.apiUrl}/videos/${this.videoId}/master.m3u8`;
  }
}