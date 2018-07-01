import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {ShareServiceProvider} from '../../providers/share-service/share-service';
/**
 * Generated class for the ViewCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-cart',
  templateUrl: 'view-cart.html',
})
export class ViewCartPage {
  beers:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private shareService: ShareServiceProvider,
  private events: Events) {
  }

  ionViewDidLoad() {
    this.beers = this.shareService.getItems();
  }

  removeFromCart(beer) {
    let index = this.beers.findIndex(b => b.id == beer.id);
    this.beers.splice(index, 1);
    this.shareService.setItems(this.beers);
    this.events.publish("removeItemFromCart", beer);
  } 
}
