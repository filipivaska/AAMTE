import { GoogleMaps, GoogleMap, LatLng, CameraPosition, MarkerOptions } from '@ionic-native/google-maps/ngx';
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
    private googleMaps: GoogleMaps) { }

  ngOnInit() {
    const today = new Date();
    this.date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
    this.geoloc.getCurrentPosition().then(result => {
      this.position = result;
      this.moveMap();
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create('map');
  }

  moveMap() {
    const position: LatLng = {
      lat: this.position.coords.latitude,
      lng: this.position.coords.longitude,
      toUrlValue: null,
      equals: null,
    };
    const options: CameraPosition<any> = {
      target: position,
      tilt: 15,
      zoom: 16
    };
    this.map.moveCamera(options);
    const markers: MarkerOptions = {
      position: position,
      title: 'Akutálna poloha'
    };
    this.map.addMarker(markers);
  }

}
