import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatSupportPageRoutingModule } from './chat-support-routing.module';

import { ChatSupportPage } from './chat-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatSupportPageRoutingModule
  ],
  declarations: [ChatSupportPage]
})
export class ChatSupportPageModule {}
