import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewContratPageRoutingModule } from './view-contrat-routing.module';

import { ViewContratPage } from './view-contrat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewContratPageRoutingModule
  ],
  declarations: [ViewContratPage]
})
export class ViewContratPageModule {}
