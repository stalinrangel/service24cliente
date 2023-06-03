import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPedidosPageRoutingModule } from './chat-pedidos-routing.module';

import { ChatPedidosPage } from './chat-pedidos.page';
import { RelativeTimePipeModule } from 'src/pipe/relative-time.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPedidosPageRoutingModule,
    RelativeTimePipeModule
  ],
  declarations: [ChatPedidosPage]
})
export class ChatPedidosPageModule {}
