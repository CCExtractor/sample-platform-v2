

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'frontend-list-regression-tests',
  templateUrl: './list-regression-tests.component.html',
  styleUrls: ['./list-regression-tests.component.scss'],
})
export class ListRegressionTestsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];
  
  constructor(private http: HttpClient) {
    this.getData().subscribe((data: any) => {
      this.dataSource = data
    })
  }

  ngOnInit(): void { }
  
  getData() {
    return this.http.get('/api/regression-test')
  }
}
