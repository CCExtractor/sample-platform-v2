import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'frontend-list-test-runs',
  templateUrl: './list-test-runs.component.html',
  styleUrls: ['./list-test-runs.component.scss'],
})
export class ListTestRunsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];

  constructor(private http: HttpClient) {
    this.getData().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  getData() {
    return this.http.get('/api/test-run');
  }
}
