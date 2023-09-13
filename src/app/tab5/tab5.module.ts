import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { ChatSupportPageRoutingModule } from '../chat-support/chat-support-routing.module';
import { RelativeTimePipeModule } from 'src/pipe/relative-time.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    ChatSupportPageRoutingModule,
    RelativeTimePipeModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
