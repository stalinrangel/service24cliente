import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactModalPageRoutingModule } from './contact-modal-routing.module';

import { ContactModalPage } from './contact-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactModalPageRoutingModule
  ],
  declarations: [ContactModalPage]
})
export class ContactModalPageModule {}
