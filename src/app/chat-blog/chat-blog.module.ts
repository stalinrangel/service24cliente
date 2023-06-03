import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatBlogPageRoutingModule } from './chat-blog-routing.module';

import { ChatBlogPage } from './chat-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBlogPageRoutingModule
  ],
  declarations: [ChatBlogPage]
})
export class ChatBlogPageModule {}
