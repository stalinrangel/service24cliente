import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteRegisterPage } from './complete-register.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteRegisterPageRoutingModule {}
