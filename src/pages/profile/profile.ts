import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  currentUser: any;
  name: string = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider,
    public menu: MenuController
    ) {
      this.currentUser = JSON.parse(this.services.currentUser)
      this.name = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.menu.enable(true);
  }

}
