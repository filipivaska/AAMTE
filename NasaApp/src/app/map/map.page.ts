import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps/ngx';
import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  date: string;
  position: Geoposition;
  imageUrl: string;
  map: GoogleMap;

  @ViewChild('map') mapElement: ElementRef;

  constructor(private geoloc: Geolocation,
    private dataService: DataService,
    private googleMaps: GoogleMaps) { }

  ngOnInit() {
    const today = new Date();
    this.date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
    this.geoloc.getCurrentPosition().then(result => {
      console.log(result);
      this.position = result;
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create('map');
  }

}
