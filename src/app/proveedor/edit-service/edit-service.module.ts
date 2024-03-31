import { CUSTOM_ELEMENTS_SCHEMA, NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditServicePageRoutingModule } from './edit-service-routing.module';

import { EditServicePage } from './edit-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditServicePageRoutingModule,
    ReactiveFormsModule],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditServicePage),
        multi: true
     }],
  declarations: [EditServicePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditServicePageModule {}
