import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageAlertPage } from './language-alert.page';

describe('LanguageAlertPage', () => {
  let component: LanguageAlertPage;
  let fixture: ComponentFixture<LanguageAlertPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LanguageAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
