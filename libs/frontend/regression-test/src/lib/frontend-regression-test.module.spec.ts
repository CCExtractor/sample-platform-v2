import { async, TestBed } from '@angular/core/testing';
import { FrontendRegressionTestModule } from './frontend-regression-test.module';

describe('FrontendRegressionTestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendRegressionTestModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendRegressionTestModule).toBeDefined();
  });
});
