import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaminoPage } from './camino.page';

const routes: Routes = [
  {
    path: '',
    component: CaminoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaminoPageRoutingModule {}
