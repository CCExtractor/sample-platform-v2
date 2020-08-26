import { async, TestBed } from '@angular/core/testing';
import { FrontendTestEntryModule } from './frontend-test-entry.module';

describe('FrontendTestEntryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendTestEntryModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendTestEntryModule).toBeDefined();
  });
});
