import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceFormPage } from './service-form.page';

describe('ServiceFormPage', () => {
  let component: ServiceFormPage;
  let fixture: ComponentFixture<ServiceFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServiceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
