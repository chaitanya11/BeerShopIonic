import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BeerCraftPage} from '../pages/beer-craft/beer-craft';
import { ApiProvider } from '../providers/api/api';
import { ShareServiceProvider } from '../providers/share-service/share-service';
import {ViewCartPage} from '../pages/view-cart/view-cart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BeerCraftPage,
    ViewCartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BeerCraftPage,
    ViewCartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    ShareServiceProvider
  ]
})
export class AppModule {}
