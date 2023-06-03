import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeinitServicePageRoutingModule } from './seinit-service-routing.module';

import { SeinitServicePage } from './seinit-service.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeinitServicePageRoutingModule,
    TranslateModule
  ],
  declarations: [SeinitServicePage]
})
export class SeinitServicePageModule {}
