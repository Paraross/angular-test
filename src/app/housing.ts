import { inject, Service } from "@angular/core";
import { HousingLocationInfo } from "./housinglocation";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Service()
export class HousingService {
  readonly locationsUrl = "http://localhost:3000/locations";
  readonly photosBaseUrl = "https://angular.dev/assets/images/tutorials/common";

  private httpClient = inject(HttpClient);

  getAllHousingLocations(): Observable<HousingLocationInfo[]> {
    return this.httpClient.get<HousingLocationInfo[]>(this.locationsUrl);
  }

  getHousingLocationById(id: number): Observable<HousingLocationInfo | undefined> {
    return this.httpClient.get<HousingLocationInfo | undefined>(`${this.locationsUrl}/${id}`);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Home aplication received: ${firstName} ${lastName} ${email}`);
  }
}
