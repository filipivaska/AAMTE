import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.page.html',
  styleUrls: ['./epic.page.scss'],
  providers: [FileTransfer]
})
export class EpicPage implements OnInit {

  list = [];
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private dataService: DataService,
    private transfer: FileTransfer) { }

  ngOnInit() {
    this.dataService.get<any[]>('EPIC/api/natural/images', null).subscribe(result => {
      result.forEach(item => {
        const year = item.date.slice(0, 4);
        const month = item.date.slice(5, 7);
        const day = item.date.slice(8, 10);
        this.list.push({
          url: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${item.image}.jpg`
        });
      });
    });
  }

  downloadImage(url: string) {
    console.log(url);
    this.fileTransfer.download(url, 'file.jpg').then((entry) => {
    console.log('download complete: ' + entry.toURL());
  }, (error) => {
    // handle error
  });
  }

}
