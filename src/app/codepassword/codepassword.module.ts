import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodepasswordPageRoutingModule } from './codepassword-routing.module';

import { CodepasswordPage } from './codepassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodepasswordPageRoutingModule
  ],
  declarations: [CodepasswordPage]
})
export class CodepasswordPageModule {}
