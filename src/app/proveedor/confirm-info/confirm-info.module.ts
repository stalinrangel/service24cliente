import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmInfoPageRoutingModule } from './confirm-info-routing.module';

import { ConfirmInfoPage } from './confirm-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmInfoPageRoutingModule
  ],
  declarations: [ConfirmInfoPage]
})
export class ConfirmInfoPageModule {}
