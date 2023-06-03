import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmInfoPage } from './confirm-info.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmInfoPageRoutingModule {}
