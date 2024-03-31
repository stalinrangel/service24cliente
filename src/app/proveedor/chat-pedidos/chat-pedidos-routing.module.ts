import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPedidosPage } from './chat-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPedidosPageRoutingModule {}
