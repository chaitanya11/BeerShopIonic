import { Injectable } from '@angular/core';

/*
  Generated class for the ShareServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareServiceProvider {
  items: any;

  constructor() {
    this.items = [];
  }

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }
}