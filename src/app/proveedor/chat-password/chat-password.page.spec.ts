import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPasswordPage } from './chat-password.page';

describe('ChatPasswordPage', () => {
  let component: ChatPasswordPage;
  let fixture: ComponentFixture<ChatPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
