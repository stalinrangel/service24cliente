import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPedidosPage } from './chat-pedidos.page';

describe('ChatPedidosPage', () => {
  let component: ChatPedidosPage;
  let fixture: ComponentFixture<ChatPedidosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
