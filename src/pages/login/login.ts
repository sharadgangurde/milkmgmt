import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.enable(false);
  }
  login(){
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  gotoRegister(){
  this.navCtrl.push(RegisterPage);
  }

}
