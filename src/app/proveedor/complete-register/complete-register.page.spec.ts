import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteRegisterPage } from './complete-register.page';

describe('CompleteRegisterPage', () => {
  let component: CompleteRegisterPage;
  let fixture: ComponentFixture<CompleteRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompleteRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
