import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListReposPage } from './list-repos.page';

const routes: Routes = [
  {
    path: '',
    component: ListReposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListReposPageRoutingModule {}
