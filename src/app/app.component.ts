import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
     firebase.initializeApp({
      apiKey: "AIzaSyDA6NSvaPs881_OZpc49lsYf447AfUbiYs",
      authDomain: "imageapp-a07cc.firebaseapp.com",
      databaseURL: "https://imageapp-a07cc.firebaseio.com",
      projectId: "imageapp-a07cc",
      storageBucket: "imageapp-a07cc.appspot.com",
      messagingSenderId: "368635738652"
    });
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

