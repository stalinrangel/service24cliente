import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZonesServicePage } from './zones-service.page';

describe('ZonesServicePage', () => {
  let component: ZonesServicePage;
  let fixture: ComponentFixture<ZonesServicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ZonesServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
