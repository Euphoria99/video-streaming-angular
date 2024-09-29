import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private apiUrl = environment.apiUrl;
  title = 'VideoStreamingApp';

  videoId: any = "25383b6b-3096-41d8-8ace-7bdaf344dee9";

  videoUrl:string;

  constructor(){
   this.videoUrl = `${this.apiUrl}/videos/stream/${this.videoId}`;
  }
}
