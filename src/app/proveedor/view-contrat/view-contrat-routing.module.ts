import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewContratPage } from './view-contrat.page';

const routes: Routes = [
  {
    path: '',
    component: ViewContratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewContratPageRoutingModule {}
