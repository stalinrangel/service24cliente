import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTrackingPage } from './detail-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTrackingPageRoutingModule {}
