import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  imports: [HousingLocation],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  filterDebounceTimeMs = 1000;

  housingService = inject(HousingService);
  housingLocations: HousingLocationInfo[] = [];
  filteredHousingLocations: WritableSignal<HousingLocationInfo[]> = signal([]);

  textChanged = new Subject<string>;
  subscription = new Subscription;

  constructor() {
    this.housingLocations = this.housingService.getAllHousingLocations();
    this.filteredHousingLocations.set(this.housingLocations);

    this.subscription = this.textChanged.pipe(debounceTime(this.filterDebounceTimeMs)).subscribe((val) => {
      this.filterResults(val);
    });
  }

  filterResults(text: string) {
    this.filteredHousingLocations.set((text === ""
      ? this.housingLocations : this.housingLocations.filter(
        (location) => location.city.toLowerCase().includes(text.toLowerCase())
      )));
  }

  filterResultsDebounced(text: string) {
    if (text === "") {
      this.filteredHousingLocations.set(this.housingLocations);
    } else {
      this.textChanged.next(text);
    }
  }
}
