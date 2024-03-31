import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaminoPageRoutingModule } from './camino-routing.module';

import { CaminoPage } from './camino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaminoPageRoutingModule
  ],
  declarations: [CaminoPage]
})
export class CaminoPageModule {}
