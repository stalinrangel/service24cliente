import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProveedorPageRoutingModule } from './register-proveedor-routing.module';

import { RegisterProveedorPage } from './register-proveedor.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterProveedorPageRoutingModule,ReactiveFormsModule,TranslateModule
  ],
  declarations: [RegisterProveedorPage]
})
export class RegisterProveedorPageModule {}
