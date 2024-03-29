import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginProveedorPage } from './login-proveedor.page';

describe('LoginProveedorPage', () => {
  let component: LoginProveedorPage;
  let fixture: ComponentFixture<LoginProveedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
