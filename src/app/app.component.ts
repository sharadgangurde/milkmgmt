import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { ServicesProvider } from '../providers/services/services';
import { SettingsPage } from '../pages/settings/settings';
//import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: any;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public services:ServicesProvider, 
    public splashScreen: SplashScreen,
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      {title: 'Settings', component: SettingsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#002f80');
      this.splashScreen.hide();
     var currentUser = JSON.parse(this.services.currentUser);
      this.user = currentUser.firstName;
      console.log(currentUser.firstName)
    });
    this.services.isLoggedIn.subscribe(state => {
      console.log("Auth state: " + state);
      if (state) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = WelcomePage;
      }
    });
  }
  // gotoProfile() {
  //   this.nav.push(ProfilePage);
  // }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
