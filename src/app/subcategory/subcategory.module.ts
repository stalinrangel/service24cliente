import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoryPageRoutingModule } from './subcategory-routing.module';

import { SubcategoryPage } from './subcategory.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoryPageRoutingModule,
    TranslateModule
  ],
  declarations: [SubcategoryPage]
})
export class SubcategoryPageModule {}
