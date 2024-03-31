import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificationPageRoutingModule } from './calification-routing.module';

import { CalificationPage } from './calification.page';
import { IonRatingStarsModule } from 'ion-rating-stars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificationPageRoutingModule,
    IonRatingStarsModule
  ],
  declarations: [CalificationPage]
})
export class CalificationPageModule {}
