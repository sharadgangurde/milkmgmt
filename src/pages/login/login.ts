import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ServicesProvider } from '../../providers/services/services';
import { FormGroup, FormControl } from '@angular/forms';

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

  loginForm: FormGroup;
  userName: string;
  password: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController,
    public services: ServicesProvider,
    public alertCtrl: AlertController
    ) {
      this.loginForm = new FormGroup({
        userName: new FormControl(),
        password: new FormControl()
     });
     //this.loginData = this.services.getLogin();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.enable(false);
  }
  login(){
    this.services.getLogin(this.loginForm.value);
    
    this.services.isLoggedIn.subscribe(state => {
      console.log("Auth state: " + state);
      if (state) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showAlert();
      }
    });
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sorry!',
      subTitle: 'Invalid username or password',
      buttons: ['Try again..!']
    });
    alert.present();
  }
  gotoRegister(){
  this.navCtrl.push(RegisterPage);
  }

}
