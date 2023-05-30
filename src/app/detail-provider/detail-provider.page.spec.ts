import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProviderPage } from './detail-provider.page';

describe('DetailProviderPage', () => {
  let component: DetailProviderPage;
  let fixture: ComponentFixture<DetailProviderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
