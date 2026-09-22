import { Service } from "@angular/core";
import { HousingLocationInfo } from "./housinglocation";

@Service()
export class HousingService {
  readonly locationsUrl = "http://localhost:3000/locations";
  readonly photosBaseUrl = "https://angular.dev/assets/images/tutorials/common";

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.locationsUrl);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.locationsUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Home aplication received: ${firstName} ${lastName} ${email}`);
  }
}
