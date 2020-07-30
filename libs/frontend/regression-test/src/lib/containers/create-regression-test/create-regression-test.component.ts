import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'frontend-create-regression-test',
  templateUrl: './create-regression-test.component.html',
  styleUrls: ['./create-regression-test.component.scss'],
})
export class CreateRegressionTestComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];
  
  constructor(private http: HttpClient) {
    this.getData().subscribe((data: any) => {
      this.dataSource = data
    })
    console.log(this.dataSource)
  }

  ngOnInit(): void { }
  
  getData() {
    return this.http.get('/api/regression-test')
  }
}
