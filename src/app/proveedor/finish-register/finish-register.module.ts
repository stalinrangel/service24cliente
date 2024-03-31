import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishRegisterPageRoutingModule } from './finish-register-routing.module';

import { FinishRegisterPage } from './finish-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishRegisterPageRoutingModule
  ],
  declarations: [FinishRegisterPage]
})
export class FinishRegisterPageModule {}
