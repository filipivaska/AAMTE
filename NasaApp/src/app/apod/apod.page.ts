import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ImageModel } from './models/image.model';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.page.html',
  styleUrls: ['./apod.page.scss'],
})
export class ApodPage implements OnInit {

  selectedImage: ImageModel;
  date: string;

  constructor(private dataService: DataService,
    public loadingService: LoadingService) { }

  ngOnInit() {
    const today = new Date();
    this.loadingService.present();
    this.date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
    this.dataService.get<ImageModel>(`planetary/apod`).subscribe(result => {
      this.selectedImage = result;
      this.loadingService.dismiss();
    });
  }

  dateChanged(): void {
    this.loadingService.present();
    this.dataService.get<ImageModel>(`https://api.nasa.gov/planetary/apod?date=${this.date}&api_key=${environment.api_key}`, true)
    .subscribe(result => {
      this.selectedImage = result;
      this.loadingService.dismiss();
    });
  }

}
