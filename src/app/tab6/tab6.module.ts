import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab6PageRoutingModule } from './tab6-routing.module';

import { Tab6Page } from './tab6.page';
import { ExploreContainerComponent } from '../explore-container-proveedor/explore-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab6PageRoutingModule,
    ExploreContainerComponent,
    ReactiveFormsModule
  ],
  declarations: [Tab6Page],
})
export class Tab6PageModule {}
