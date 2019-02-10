import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.page.html',
  styleUrls: ['./epic.page.scss'],
})
export class EpicPage implements OnInit {

  list = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get<any[]>('EPIC/api/natural/images', null).subscribe(result => {
      console.log(result);
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

}
