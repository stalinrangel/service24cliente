import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBlogPage } from './list-blog.page';

describe('ListBlogPage', () => {
  let component: ListBlogPage;
  let fixture: ComponentFixture<ListBlogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
