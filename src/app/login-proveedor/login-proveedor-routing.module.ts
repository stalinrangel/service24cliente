import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginProveedorPage } from './login-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: LoginProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginProveedorPageRoutingModule {}
