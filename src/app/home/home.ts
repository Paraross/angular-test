import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing';

@Component({
  imports: [HousingLocation],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  housingService: HousingService = inject(HousingService);
  housingLocations: HousingLocationInfo[] = [];
  filteredHousingLocations: HousingLocationInfo[] = [];

  constructor() {
    this.housingLocations = this.housingService.getAllHousingLocations();
    this.filteredHousingLocations = this.housingLocations;
  }

  filterResults(text: string) {
    this.filteredHousingLocations = text.length == 0
      ? this.housingLocations : this.housingLocations.filter(
        (location) => location.city.toLowerCase().includes(text.toLowerCase())
      );
  }
}
