import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraPreviewPage } from './camera-preview.page';

describe('CameraPreviewPage', () => {
  let component: CameraPreviewPage;
  let fixture: ComponentFixture<CameraPreviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CameraPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
