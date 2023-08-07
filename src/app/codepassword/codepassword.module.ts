import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CodepasswordPageRoutingModule } from './codepassword-routing.module';

import { CodepasswordPage } from './codepassword.page';

const routes: Routes = [
  {
    path: '',
    component: CodepasswordPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodepasswordPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CodepasswordPage]
})
export class CodepasswordPageModule {}
