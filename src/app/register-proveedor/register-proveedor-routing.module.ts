import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterProveedorPage } from './register-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterProveedorPageRoutingModule {}
