import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPedidosPageRoutingModule } from './chat-pedidos-routing.module';

import { ChatPedidosPage } from './chat-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPedidosPageRoutingModule
  ],
  declarations: [ChatPedidosPage]
})
export class ChatPedidosPageModule {}
