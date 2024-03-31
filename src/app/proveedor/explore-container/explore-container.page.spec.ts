import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreContainerPage } from './explore-container.page';

describe('ExploreContainerPage', () => {
  let component: ExploreContainerPage;
  let fixture: ComponentFixture<ExploreContainerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExploreContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
