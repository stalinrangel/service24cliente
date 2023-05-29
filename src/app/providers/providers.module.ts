import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidersPageRoutingModule } from './providers-routing.module';

import { ProvidersPage } from './providers.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidersPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProvidersPage]
})
export class ProvidersPageModule {}
