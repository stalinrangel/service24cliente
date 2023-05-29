import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificationPageRoutingModule } from './calification-routing.module';

import { CalificationPage } from './calification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificationPageRoutingModule
  ],
  declarations: [CalificationPage]
})
export class CalificationPageModule {}
