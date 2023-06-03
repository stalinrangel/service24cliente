import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeinitServicePage } from './seinit-service.page';

const routes: Routes = [
  {
    path: '',
    component: SeinitServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeinitServicePageRoutingModule {}
