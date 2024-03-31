import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterProveedorPage } from './register-proveedor.page';

describe('RegisterProveedorPage', () => {
  let component: RegisterProveedorPage;
  let fixture: ComponentFixture<RegisterProveedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
