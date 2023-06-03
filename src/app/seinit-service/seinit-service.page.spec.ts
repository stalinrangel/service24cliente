import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeinitServicePage } from './seinit-service.page';

describe('SeinitServicePage', () => {
  let component: SeinitServicePage;
  let fixture: ComponentFixture<SeinitServicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeinitServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
