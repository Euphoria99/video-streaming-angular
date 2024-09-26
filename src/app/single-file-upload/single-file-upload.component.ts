import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.scss']
})
export class SingleFileUploadComponent {
  private apiUrl = environment.apiUrl;
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  title: string = '';
  description: string = '';
  fileUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
      this.fileUrl = URL.createObjectURL(file); // Create a URL for the file preview
    }
  }

  removeFile() {
    this.file = null;
    this.fileUrl = null;
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  onUpload(uploadForm: any) {
    if (uploadForm.valid && this.file) {
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
      formData.append("title", this.title);
      formData.append("description", this.description);

      const upload$ = this.http.post(`${this.apiUrl}/post`, formData);
      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
          this.removeFile(); // Clear file after successful upload
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  }
}
