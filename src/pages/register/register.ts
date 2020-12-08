import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ToastProvider } from '../../providers/toast/toast';
import { ValidationProvider } from '../../providers/validation/validation';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  submitted = false;
  registrationForm: FormGroup;
  validation_messages: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    public services: ServicesProvider,
    public toastCtrl: ToastProvider,
    public validation: ValidationProvider
    ) {
     // Create the form and define fields and validators.
     this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, this.equalto('password')]]
  });
  this.validation_messages = this.validation.validationMessages();
  }
  // get f() { return this.registrationForm.controls; }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[field_name]==input
    if(!isValid)
      return { 'equalto': {isValid} }
    else
      return null;
    };
  }
  
  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }
  register() {
   if (this.registrationForm.invalid) {
      return;
    } 
    this.services.setRegistrationData(this.registrationForm.value);
    this.toastCtrl.presentToast('Successfully Registered');
    this.navCtrl.setRoot(LoginPage)
    //this.showAlert()
  }
  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     subTitle: 'Successfully Registered!!',
  //     buttons: [
  //       {
  //       text: 'OK',
  //       handler: () => {
  //         this.navCtrl.setRoot(LoginPage)
  //       }
  //     },
  //   ]
  //   });
  //   alert.present();
  // }

}
