import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegressionTestComponent } from './create-regression-test.component';

describe('CreateRegressionTestComponent', () => {
  let component: CreateRegressionTestComponent;
  let fixture: ComponentFixture<CreateRegressionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRegressionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRegressionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
