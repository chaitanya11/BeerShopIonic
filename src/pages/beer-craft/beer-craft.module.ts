import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerCraftPage } from './beer-craft';

@NgModule({
  declarations: [
    BeerCraftPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerCraftPage),
  ],
})
export class BeerCraftPageModule {}
