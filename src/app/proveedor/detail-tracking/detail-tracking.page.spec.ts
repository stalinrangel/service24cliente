import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTrackingPage } from './detail-tracking.page';

describe('DetailTrackingPage', () => {
  let component: DetailTrackingPage;
  let fixture: ComponentFixture<DetailTrackingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
