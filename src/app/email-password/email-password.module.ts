import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmailPasswordPageRoutingModule } from './email-password-routing.module';

import { EmailPasswordPage } from './email-password.page';

const routes: Routes = [
  {
    path: '',
    component: EmailPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailPasswordPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EmailPasswordPage]
})
export class EmailPasswordPageModule {}
