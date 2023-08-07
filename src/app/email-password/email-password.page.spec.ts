import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailPasswordPage } from './email-password.page';

describe('EmailPasswordPage', () => {
  let component: EmailPasswordPage;
  let fixture: ComponentFixture<EmailPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
