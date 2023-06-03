import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonesRegisterPage } from './zones-register.page';

const routes: Routes = [
  {
    path: '',
    component: ZonesRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesRegisterPageRoutingModule {}
