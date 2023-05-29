import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificationPage } from './calification.page';

describe('CalificationPage', () => {
  let component: CalificationPage;
  let fixture: ComponentFixture<CalificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
