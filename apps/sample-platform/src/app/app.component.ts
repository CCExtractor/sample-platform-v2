import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@new-sample-platform/api-interfaces';

@Component({
  selector: 'new-sample-platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
