import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmInfoPageRoutingModule } from './confirm-info-routing.module';

import { ConfirmInfoPage } from './confirm-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfirmInfoPage]
})
export class ConfirmInfoPageModule {}
