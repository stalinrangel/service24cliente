import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyNumberPage } from './verify-number.page';

describe('VerifyNumberPage', () => {
  let component: VerifyNumberPage;
  let fixture: ComponentFixture<VerifyNumberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
