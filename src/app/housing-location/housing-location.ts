import { Component, input } from "@angular/core";
import { HousingLocationInfo } from "../housinglocation";
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: "app-housing-location",
  styleUrl: "./housing-location.css",
  templateUrl: "./housing-location.html",
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
}
