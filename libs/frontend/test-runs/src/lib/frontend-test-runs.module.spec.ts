import { async, TestBed } from '@angular/core/testing';
import { FrontendTestRunsModule } from './frontend-test-runs.module';

describe('FrontendTestRunsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendTestRunsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendTestRunsModule).toBeDefined();
  });
});
