import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProfilePageRoutingModule } from './info-profile-routing.module';

import { InfoProfilePage } from './info-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProfilePageRoutingModule
  ],
  declarations: [InfoProfilePage]
})
export class InfoProfilePageModule {}
