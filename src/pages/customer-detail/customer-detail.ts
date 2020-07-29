import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'View Bill',
          role: 'view-bill',
          handler: () => {
            //console.log('Destructive clicked');
          }
        },{
          //icon: 'mail',
          text: 'Message',
          handler: () => {
            //console.log('Archive clicked');
          }
        },{
          text: 'Call',
          role: 'call',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },{
          text: 'Edit',
          role: 'edit',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },{
          text: 'Delete',
          role: 'delete',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
