import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodepasswordPage } from './codepassword.page';

describe('CodepasswordPage', () => {
  let component: CodepasswordPage;
  let fixture: ComponentFixture<CodepasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CodepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
