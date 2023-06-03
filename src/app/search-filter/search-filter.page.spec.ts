import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFilterPage } from './search-filter.page';

describe('SearchFilterPage', () => {
  let component: SearchFilterPage;
  let fixture: ComponentFixture<SearchFilterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
