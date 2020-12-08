import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AddCustomerPage } from '../pages/add-customer/add-customer';
import { CustomerDetailPage } from '../pages/customer-detail/customer-detail';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PaymentDetailsPage } from '../pages/payment-details/payment-details';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { ViewRecordPage } from '../pages/view-record/view-record';
import { WelcomePage } from '../pages/welcome/welcome';
import { ServicesProvider } from '../providers/services/services';
import { ToastProvider } from '../providers/toast/toast';
import { ValidationProvider } from '../providers/validation/validation';
import { MyApp } from './app.component';


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
    HttpClientModule,
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
    ServicesProvider,
    ToastProvider,
    ValidationProvider,
    HttpClient,
  ]
})
export class AppModule {}
