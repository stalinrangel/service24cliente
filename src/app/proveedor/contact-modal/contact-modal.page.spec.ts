import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactModalPage } from './contact-modal.page';

describe('ContactModalPage', () => {
  let component: ContactModalPage;
  let fixture: ComponentFixture<ContactModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
