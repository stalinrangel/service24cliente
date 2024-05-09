import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoportePage } from './soporte.page';

describe('SoportePage', () => {
  let component: SoportePage;
  let fixture: ComponentFixture<SoportePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SoportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
