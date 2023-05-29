import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageAlertPage } from './language-alert.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageAlertPageRoutingModule {}
