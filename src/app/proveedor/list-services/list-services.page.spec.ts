import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListServicesPage } from './list-services.page';

describe('ListServicesPage', () => {
  let component: ListServicesPage;
  let fixture: ComponentFixture<ListServicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
