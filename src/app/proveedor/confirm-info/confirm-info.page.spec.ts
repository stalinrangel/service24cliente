import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmInfoPage } from './confirm-info.page';

describe('ConfirmInfoPage', () => {
  let component: ConfirmInfoPage;
  let fixture: ComponentFixture<ConfirmInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
