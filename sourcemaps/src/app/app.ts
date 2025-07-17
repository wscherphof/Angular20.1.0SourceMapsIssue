import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeocodeService } from './common/geocode.service';
import { WeatherService } from './common/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sourcemaps');
  city = signal<string | undefined>(undefined);
  weather = signal<any | undefined>(undefined);

  constructor(
    private geocodeService: GeocodeService,
    private weatherService: WeatherService
  ) {
    effect(() => {
      const cityName = this.city();

      if (!cityName) {
        return;
      }

      this.geocodeService.lookupCity(cityName).subscribe((locations) => {
        if (locations && locations.length > 0) {
          const { lat, lon } = locations[0];
          this.weatherService.getForecast(lat, lon).subscribe((forecast) => {
            this.weather.set(forecast);
          });
        }
      });
    });
  }

  updateCity(newCity: string) {
    if (newCity.trim()) {
      this.city.set(newCity);
    }
  }
}
