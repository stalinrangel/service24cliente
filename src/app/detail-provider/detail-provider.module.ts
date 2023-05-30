import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProviderPageRoutingModule } from './detail-provider-routing.module';

import { DetailProviderPage } from './detail-provider.page';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTimePipeModule } from 'src/pipe/relative-time.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProviderPageRoutingModule,
    TranslateModule,
    RelativeTimePipeModule
  ],
  declarations: [DetailProviderPage]
})
export class DetailProviderPageModule {}
