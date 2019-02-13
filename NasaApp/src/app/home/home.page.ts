import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Rover } from './models/rover.model';
import { all } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  rovers = {
    Curiosity: 'Curiosity',
    Opportunity: 'Opportunity',
    Spirit: 'Spirit'
  };

  opportunityDescription: string;
  curiosityDescription: string;
  spiritDescription: string;

  roverList = [
    this.rovers.Curiosity,
    this.rovers.Opportunity,
    this.rovers.Spirit];

  selectedRover: Rover;
  selectedDescription: string;
  selectedRoverName: string;
  selectedCamera = 'all';
  date: string;
  apiBaseUrl = 'https://mars-photos.herokuapp.com/api/v1/rovers/';

  constructor(private dataService: DataService) {
    this.initTexts();
    const today = new Date();
    this.date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
  }

  roverSelected(): void {
    this.dataService.get<any>(`${this.apiBaseUrl}${this.selectedRoverName}/latest_photos`, true)
    .subscribe(result => {
      this.selectedRover = new Rover();
      this.selectedRover.Name = this.selectedRoverName;
      this.selectedRover.SolCount = result.latest_photos[0].rover.max_sol;
      this.selectedRover.LaunchDate = result.latest_photos[0].rover.launch_date;
      this.selectedRover.LandingDate = result.latest_photos[0].rover.landing_date;
      this.selectedRover.Cameras = result.latest_photos[0].rover.cameras;
      this.selectedRover.TotalPhotos = result.latest_photos[0].rover.total_photos;
      this.selectedRover.Photos = result.latest_photos.slice(0, 20);
      if (this.selectedRover.Name === this.rovers.Curiosity) {
        this.selectedRover.Description = this.curiosityDescription;
      }
      if (this.selectedRover.Name === this.rovers.Opportunity) {
        this.selectedRover.Description = this.opportunityDescription;
      }
      if (this.selectedRover.Name === this.rovers.Spirit) {
        this.selectedRover.Description = this.spiritDescription;
      }
    });
  }

  cameraSelected(): void {
    if (this.selectedCamera === 'all') {
      this.roverSelected();
    }
  }

  dateChanged(): void {
    this.dataService.get<any>(`${this.apiBaseUrl}${this.selectedRoverName}/photos/?earth_date=${this.date}&camera=${this.selectedCamera}`, true)
    .subscribe(result => {
      this.selectedRover.Photos = result.photos.splice(0, 20);
    });
  }

  initTexts(): void {
    // tslint:disable-next-line:max-line-length
    this.opportunityDescription = `Opportunity (angl. "príležitosť", oficiálne: MER-B) je kozmická sonda, ktorej hlavná časť je druhým z dvoch vozidiel misie Mars Exploration Rover americkej NASA. Bola to najdlhšie fungujúca sonda na povrchu Marsu a zároveň sonda, ktorá prekonala najväčšiu vzdialenosť na povrchu iného kozmického telesa ako je Zem. Opportunity pristála na Marse 25. januára 2004 v pristávacom module.`;
    // tslint:disable-next-line:max-line-length
    this.spiritDescription = `Spirit (oficiálne: MER-A) je jedným z dvoch vozidiel misie Mars Exploration Rover americkej NASA. Spirit pristál na Marse 4. januára 2004 o 04:35 UTC. Jeho dvojča Opportunity úspešne pristálo na druhej strane Marsu 25. januára 2004.`;
    // tslint:disable-next-line:max-line-length
    this.curiosityDescription = `Mars Science Laboratory (MSL), od roku 2009 nazývané aj Curiosity, je vozidlo americkej NASA určené pre prieskum povrchu Marsu. MSL je doteraz najkomplexnejšou a najväčšou kozmickou sondou vyslanou na planétu Mars. Povezie viac vedeckých prístrojov ako ktorákoľvek iná misia na Mars predtým, a to vrátane nástrojov a vybavenia, ktoré na mieste umožnia analýzu práškov vyvŕtaných z hornín. Bude skúmať aj možnosť mikrobiálneho života v minulosti alebo prítomnosti Marsu. Prístroje pre vozidlo poskytnú vedecké organizácie Spojených štátov, Kanady, Nemecka, Francúzska, Ruska a Španielska.`;
  }

}
