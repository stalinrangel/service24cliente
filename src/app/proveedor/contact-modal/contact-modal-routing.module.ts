import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactModalPage } from './contact-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContactModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactModalPageRoutingModule {}
