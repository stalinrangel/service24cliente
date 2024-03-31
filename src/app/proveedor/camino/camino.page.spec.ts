import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaminoPage } from './camino.page';

describe('CaminoPage', () => {
  let component: CaminoPage;
  let fixture: ComponentFixture<CaminoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaminoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
