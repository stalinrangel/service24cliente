import { CUSTOM_ELEMENTS_SCHEMA, NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule, ReactiveFormsModule],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditProfilePage),
        multi: true
      }
    ],
  declarations: [EditProfilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfilePageModule {}
