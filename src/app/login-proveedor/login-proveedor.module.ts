import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LoginProveedorPageRoutingModule } from './login-proveedor-routing.module';

import { LoginProveedorPage } from './login-proveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginProveedorPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LoginProveedorPage]
})
export class LoginProveedorPageModule {}
