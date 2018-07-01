import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {ShareServiceProvider} from '../../providers/share-service/share-service';
import {ViewCartPage} from '../view-cart/view-cart';


/**
 * Generated class for the BeerCraftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beer-craft',
  templateUrl: 'beer-craft.html',
})
export class BeerCraftPage {
  filteredBeers: any = [];
  beers: any = [];
  cartItems: any = [];
  searchInput:string = '';
  currentPage: number = 0;
  itemsPerPage = 30;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private apiProvider: ApiProvider, private shareService: ShareServiceProvider,
    private events: Events) {
    this.events.subscribe("removeItemFromCart", (beer) => {
      this.cartItems = this.shareService.getItems();
    });       
  }

  ionViewDidLoad() {
    this.apiProvider.getBeers().then(data => {
      this.beers = data;
      this.beers.map(beer => {
        if (beer.abv.length == 0) {
          beer.abv = 0;
        } else {
          beer.abv = +beer.abv;
        }
      });
      this.beers.sort((a, b) => a.abv - b.abv);
      this.pushFirstElements();
    });
  }

  pushFirstElements() {
    this.filteredBeers = [];
    for (let i = 0; (i < this.itemsPerPage) && (i < this.beers.length); i++) {
      this.filteredBeers.push(this.beers[i]);
    }
    this.currentPage = 1;
  }

  onInput(event) {
    this.beers = this.beers.filter(beer => {
      let searchName = beer.name.toLowerCase().indexOf(this.searchInput) > -1;
      let searchStlye = beer.style.toLowerCase().indexOf(this.searchInput) > -1
      return searchName || searchStlye;
    });
    this.pushFirstElements();
  }

  onClear(event) {
    this.searchInput = "";
    this.filteredBeers = this.beers;
    this.ionViewDidLoad();
  }

  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let startPos = this.currentPage * this.itemsPerPage + 1;
        let stopPos = startPos + this.itemsPerPage;
        for (let i = startPos; i < stopPos; i++) {
          this.filteredBeers.push( this.beers[i] );
        }
        this.currentPage++;
        resolve();
      }, 500);
    });
  }

  sortByDecending() {
    this.beers.sort((a,b) => b.abv-a.abv);
    this.pushFirstElements();
  }

  sortByAcending() {
    this.beers.sort((a,b) => a.abv - b.abv);
    this.pushFirstElements();
  }


  addToCart(beer) {
    beer.showRemove = true;
    this.cartItems.push(beer);
  }


  navivigateToCartPage() {
    this.shareService.setItems(this.cartItems);
    this.navCtrl.push(ViewCartPage);
  }
}
