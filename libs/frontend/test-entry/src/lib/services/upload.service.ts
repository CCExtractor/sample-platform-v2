import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(form: FormData) {
    this.http.post('api/test-entry', form).subscribe();
  }

  public getSamples() {
    return this.http.get('api/samples');
  }
}
