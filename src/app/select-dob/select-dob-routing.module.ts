import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDobPage } from './select-dob.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDobPageRoutingModule {}
