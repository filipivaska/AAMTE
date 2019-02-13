import { LoadingService } from './../shared/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { EpicItem } from './models/epic-item.model';
import * as dl from 'cordova-plugin-android-downloadmanager';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.page.html',
  styleUrls: ['./epic.page.scss'],
  providers: [FileTransfer]
})
export class EpicPage implements OnInit {

  list: EpicItem[];
  fileTransfer: FileTransferObject = this.transfer.create();
  fired = false;
  date: string;
  selectedType = 'enhanced';

  constructor(private dataService: DataService,
    private transfer: FileTransfer,
    private file: File,
    private loadingService: LoadingService) { }

  ngOnInit() {
    const today = new Date();
    this.date = '2018-12-30';
    this.selectionChanged();
  }

  selectionChanged(): void {
    this.dataService.get<any[]>(`https://epic.gsfc.nasa.gov/api/${this.selectedType}/date/${this.date}`, true).subscribe(result => {
      this.list = [];
      result.forEach(item => {
        const year = item.date.slice(0, 4);
        const month = item.date.slice(5, 7);
        const day = item.date.slice(8, 10);
        this.list.push({
          Url: `https://epic.gsfc.nasa.gov/archive/${this.selectedType}/${year}/${month}/${day}/jpg/${item.image}.jpg`,
          Coordinates: item.centroid_coordinates,
          Date: new Date(item.date)
        });
        this.loadingService.dismiss();
      });
    });
  }

  downloadImage(url: string) {
    /*console.log(url);
    this.fired = true;
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.jpg').then((entry) => {
    console.log('download complete: ' + entry.toURL());
      }, (error) => {
    // handle error
  });
  const req = {
    uri: url,
    title: 'Testfile',
    description: 'a test file',
    mimeType: 'application/image',
    visibleInDownloadsUi: true,
    notificationVisibility: 0,

    destinationInExternalFilesDir: {
      dirType: 'DIRECTORY_MUSIC',
      subPath: ''
    }
  };
    console.log(dl);
    const dl2 = dl.__proto__;
    console.log(dl2);
    dl2.enqueue(req, console.info);*/
  }

}
