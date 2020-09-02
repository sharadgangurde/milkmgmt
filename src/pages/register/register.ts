import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';

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
  validation_messages = {
    'firstName': [
    { type: 'required', message: 'Please enter the Name' },
    { type: 'pattern', message: 'Invalid name format' }
    ],
    'lastName': [
      { type: 'required', message: 'Please enter the lastName' },
      { type: 'pattern', message: 'Invalid name format' }
    ],
    'email': [
      { type: 'required', message: 'Please enter the email' },
      { type: 'email', message: 'Please enter valid email address' }
    ],
    'mobile': [
      { type: 'required', message: 'Please enter Mobile Number' },
      { type: 'minlength', message: 'Please enter valid mobile number' }
    ],
    'address': [
      { type: 'required', message: 'Please enter the address' }
    ],
    'password': [
      { type: 'required', message: 'Please enter the password' },
      { type: 'minlength', message: 'Enter atleast 6 digits' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Please enter the confirm Password' },
      { type: 'equalto', message: 'Password does not match' }
    ],
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    public services: ServicesProvider
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
    this.showAlert()
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Thank you!',
      subTitle: 'Your are successfully registered!',
      buttons: ['OK']
    });
    alert.present();
  }

}
