import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonesRegisterPageRoutingModule } from './zones-register-routing.module';

import { ZonesRegisterPage } from './zones-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZonesRegisterPageRoutingModule
  ],
  declarations: [ZonesRegisterPage]
})
export class ZonesRegisterPageModule {}
