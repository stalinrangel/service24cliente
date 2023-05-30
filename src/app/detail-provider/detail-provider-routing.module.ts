import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProviderPage } from './detail-provider.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProviderPageRoutingModule {}
