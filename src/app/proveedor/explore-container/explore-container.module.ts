import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerPageRoutingModule } from './explore-container-routing.module';

import { ExploreContainerPage } from './explore-container.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerPageRoutingModule
  ],
  declarations: [ExploreContainerPage]
})
export class ExploreContainerPageModule {}
