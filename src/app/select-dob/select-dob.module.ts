import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDobPageRoutingModule } from './select-dob-routing.module';

import { SelectDobPage } from './select-dob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDobPageRoutingModule
  ],
  declarations: [SelectDobPage]
})
export class SelectDobPageModule {}
