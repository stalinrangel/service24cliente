import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguageAlertPageRoutingModule } from './language-alert-routing.module';

import { LanguageAlertPage } from './language-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageAlertPageRoutingModule
  ],
  declarations: [LanguageAlertPage]
})
export class LanguageAlertPageModule {}
