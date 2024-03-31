import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreContainerPage } from './explore-container.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreContainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreContainerPageRoutingModule {}
