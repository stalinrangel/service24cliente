import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBlogPage } from './list-blog.page';

const routes: Routes = [
  {
    path: '',
    component: ListBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBlogPageRoutingModule {}
