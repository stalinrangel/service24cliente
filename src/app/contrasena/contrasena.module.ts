import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasenaPageRoutingModule } from './contrasena-routing.module';

import { ContrasenaPage } from './contrasena.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasenaPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ContrasenaPage]
})
export class ContrasenaPageModule {}
