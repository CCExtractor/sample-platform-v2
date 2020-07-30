import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'frontend-create-regression-test',
  templateUrl: './create-regression-test.component.html',
  styleUrls: ['./create-regression-test.component.scss'],
})
export class CreateRegressionTest implements OnInit {
  checkoutForm;

  value = 'Write regression test here';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      command: '',
    });
  }

  onSubmit(data) {
    return this.http
      .post('/api/regression-test', data)
      .pipe(
        tap((res: Response) => {
          this.router.navigate(['/tests/list']);
          alert("You have created the regression test!")
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
