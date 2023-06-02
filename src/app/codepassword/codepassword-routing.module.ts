import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodepasswordPage } from './codepassword.page';

const routes: Routes = [
  {
    path: '',
    component: CodepasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodepasswordPageRoutingModule {}
