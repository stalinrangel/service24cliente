import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteRegisterPageRoutingModule } from './complete-register-routing.module';

import { CompleteRegisterPage } from './complete-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteRegisterPageRoutingModule, ReactiveFormsModule,TranslateModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CompleteRegisterPage]
})
export class CompleteRegisterPageModule {}
