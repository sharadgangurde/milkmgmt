import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, MenuController, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

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
  public showPassword: boolean = false;
  loginForm: FormGroup;
  userName: string;
  password: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController,
    public services: ServicesProvider,
    public alertCtrl: AlertController,
    public toast: ToastProvider,
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
  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  login(){
    this.services.getLogin(this.loginForm.value);
    
    this.services.isLoggedIn.subscribe(state => {
      console.log("Auth state: " + state);
      if (state) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.toast.presentToast('Invalid Credentials!')
        //this.showAlert();
      }
    });
  }
  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Sorry!',
  //     subTitle: 'Invalid username or password',
  //     buttons: ['Try again..!']
  //   });
  //   alert.present();
  // }
  gotoRegister(){
  this.navCtrl.push(RegisterPage);
  }

}
