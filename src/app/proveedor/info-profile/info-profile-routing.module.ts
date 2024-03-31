import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoProfilePage } from './info-profile.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProfilePageRoutingModule {}
