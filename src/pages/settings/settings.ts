import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public menu: MenuController
    ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.menu.enable(true);
  }
  gotoProfile() {
    this.navCtrl.push(ProfilePage);
  }
  logout() {
   localStorage.removeItem('currentUser');
   this.navCtrl.push(WelcomePage);
   this.showAlert()
  }
  showLogoutAlert() {
    const alert = this.alertCtrl.create({
      subTitle: 'Are you want to logout?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.logout()
          } 
        },
        {
          text: 'CANCEL',
          handler: () => {
            null;
          }
        }
      ]
    });
    alert.present();
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      subTitle: 'Your are successfully loggedOut!',
      buttons: ['OK']
    });
    alert.present();
  }
}
