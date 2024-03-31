import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatSupportPage } from './chat-support.page';

describe('ChatSupportPage', () => {
  let component: ChatSupportPage;
  let fixture: ComponentFixture<ChatSupportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
