import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonesServicePage } from './zones-service.page';

const routes: Routes = [
  {
    path: '',
    component: ZonesServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesServicePageRoutingModule {}
