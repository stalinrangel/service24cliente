import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSupportPage } from './chat-support.page';

const routes: Routes = [
  {
    path: '',
    component: ChatSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatSupportPageRoutingModule {}
