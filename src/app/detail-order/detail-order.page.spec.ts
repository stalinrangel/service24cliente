import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailOrderPage } from './detail-order.page';

describe('DetailOrderPage', () => {
  let component: DetailOrderPage;
  let fixture: ComponentFixture<DetailOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
