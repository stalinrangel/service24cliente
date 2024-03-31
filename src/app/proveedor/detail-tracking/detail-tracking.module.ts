import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailTrackingPageRoutingModule } from './detail-tracking-routing.module';

import { DetailTrackingPage } from './detail-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTrackingPageRoutingModule
  ],
  declarations: [DetailTrackingPage]
})
export class DetailTrackingPageModule {}
