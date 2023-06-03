import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBlogPageRoutingModule } from './list-blog-routing.module';

import { ListBlogPage } from './list-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBlogPageRoutingModule
  ],
  declarations: [ListBlogPage]
})
export class ListBlogPageModule {}
