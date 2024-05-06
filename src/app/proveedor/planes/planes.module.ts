import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesPageRoutingModule } from './planes-routing.module';

import { PlanesPage } from './planes.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesPageRoutingModule, TranslateModule
  ],
  declarations: [PlanesPage]
})
export class PlanesPageModule {}
