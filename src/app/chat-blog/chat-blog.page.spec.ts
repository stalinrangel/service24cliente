import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBlogPage } from './chat-blog.page';

describe('ChatBlogPage', () => {
  let component: ChatBlogPage;
  let fixture: ComponentFixture<ChatBlogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
