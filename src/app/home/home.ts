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

  loading = signal(false);

  housingService = inject(HousingService);
  housingLocations: HousingLocationInfo[] = [];
  filteredHousingLocations: WritableSignal<HousingLocationInfo[]> = signal([]);

  textChanged = new Subject<string>;
  subscription = new Subscription;

  constructor() {
    this.housingLocations = this.housingService.getAllHousingLocations();
    this.filteredHousingLocations.set(this.housingLocations);

    this.subscription = this.textChanged.pipe(debounceTime(this.filterDebounceTimeMs)).subscribe((val) => {
      if (this.loading()) {
        this.filterResults(val);
        this.loading.set(false);
      }
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
      this.filterResults(text);
      this.loading.set(false);
    } else {
      this.textChanged.next(text);
      this.loading.set(true);
    }
  }
}
