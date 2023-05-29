import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceFormPage } from './service-form.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceFormPageRoutingModule {}
