import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.menu.enable(false);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }

  register(){
  this.navCtrl.push(RegisterPage);
  }

}
