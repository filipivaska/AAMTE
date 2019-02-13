import { DataService } from 'src/app/shared/services/data.service';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicGestureConfig } from './shared/directives/hammer.directive';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingService } from './shared/services/loading.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    HttpClient,
    FileTransfer,
    FileTransferObject,
    File,
    LoadingService,
    Geolocation,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
