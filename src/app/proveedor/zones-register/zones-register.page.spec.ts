import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZonesRegisterPage } from './zones-register.page';

describe('ZonesRegisterPage', () => {
  let component: ZonesRegisterPage;
  let fixture: ComponentFixture<ZonesRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ZonesRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
