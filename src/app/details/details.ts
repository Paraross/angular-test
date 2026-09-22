import { Component, inject, signal, WritableSignal } from "@angular/core";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-details",
  styleUrl: "./details.css",
  templateUrl: "./details.html",
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: WritableSignal<HousingLocationInfo | undefined> = signal(undefined);

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);

    this.housingService.getHousingLocationById(housingLocationId).then((location) => {
      this.housingLocation.set(location);
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
    );
  }
}
