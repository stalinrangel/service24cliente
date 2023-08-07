import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFilterPageRoutingModule } from './search-filter-routing.module';

import { SearchFilterPage } from './search-filter.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonRatingStarsModule } from 'ion-rating-stars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFilterPageRoutingModule,
    TranslateModule,
    IonRatingStarsModule
  ],
  declarations: [SearchFilterPage]
})
export class SearchFilterPageModule {}
