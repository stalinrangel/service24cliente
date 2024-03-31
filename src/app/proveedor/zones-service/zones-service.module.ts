import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonesServicePageRoutingModule } from './zones-service-routing.module';

import { ZonesServicePage } from './zones-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZonesServicePageRoutingModule
  ],
  declarations: [ZonesServicePage]
})
export class ZonesServicePageModule {}
