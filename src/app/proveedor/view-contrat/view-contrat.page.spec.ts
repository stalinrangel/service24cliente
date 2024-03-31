import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContratPage } from './view-contrat.page';

describe('ViewContratPage', () => {
  let component: ViewContratPage;
  let fixture: ComponentFixture<ViewContratPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewContratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
