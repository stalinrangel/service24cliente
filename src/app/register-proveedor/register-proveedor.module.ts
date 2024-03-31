import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProveedorPageRoutingModule } from './register-proveedor-routing.module';

import { RegisterProveedorPage } from './register-proveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterProveedorPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [RegisterProveedorPage]
})
export class RegisterProveedorPageModule {}
