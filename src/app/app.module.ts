import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AddCustomerPage } from '../pages/add-customer/add-customer';
import { CustomerDetailPage } from '../pages/customer-detail/customer-detail';
import { ServicesProvider } from '../providers/services/services';
import { IonicStorageModule } from '@ionic/storage';
import { SettingsPage } from '../pages/settings/settings';
import { ViewRecordPage } from '../pages/view-record/view-record';
import { PaymentDetailsPage } from '../pages/payment-details/payment-details';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CallNumber } from '@ionic-native/call-number';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage, 
    LoginPage,
    AddCustomerPage,
    CustomerDetailPage,
    SettingsPage,
    ViewRecordPage,
    PaymentDetailsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['localstorage', 'indexeddb', 'sqlite', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    AddCustomerPage,
    CustomerDetailPage,
    SettingsPage,
    ViewRecordPage,
    PaymentDetailsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SocialSharing,
    CallNumber,
    File,
    FileOpener,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
