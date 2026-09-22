import { Component, inject, signal, WritableSignal } from "@angular/core";
import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing";
import { debounceTime, Subject, Subscription } from "rxjs";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  imports: [HousingLocation, MatProgressSpinner],
  selector: "app-home",
  styleUrl: "./home.css",
  templateUrl: "./home.html",
})
export class Home {
  filterDebounceTimeMs = 1000;

  loading = signal(false);

  housingService = inject(HousingService);
  housingLocations: HousingLocationInfo[] = [];
  filteredHousingLocations: WritableSignal<HousingLocationInfo[]> = signal([]);

  textChanged = new Subject<string>();
  subscription = new Subscription();

  constructor() {
    this.housingService.getAllHousingLocations().subscribe((locations: HousingLocationInfo[]) => {
      this.housingLocations = locations;
      this.filteredHousingLocations.set(locations);
    });

    this.subscription = this.textChanged
      .pipe(debounceTime(this.filterDebounceTimeMs))
      .subscribe((val) => {
        if (this.loading()) {
          this.filterResults(val);
          this.loading.set(false);
        }
      });
  }

  filterResults(text: string) {
    this.filteredHousingLocations.set(
      text === ""
        ? this.housingLocations
        : this.housingLocations.filter((location) =>
            location.city.toLowerCase().includes(text.toLowerCase()),
          ),
    );
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
