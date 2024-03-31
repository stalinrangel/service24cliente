import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPasswordPageRoutingModule } from './chat-password-routing.module';

import { ChatPasswordPage } from './chat-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPasswordPageRoutingModule
  ],
  declarations: [ChatPasswordPage]
})
export class ChatPasswordPageModule {}
