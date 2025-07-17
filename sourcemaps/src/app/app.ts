import { Component, signal } from '@angular/core';
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
  city = 'Amsterdam';
  weatherReport: any = null;

  constructor(
    private geocodeService: GeocodeService,
    private weatherService: WeatherService
  ) {}

  fetchWeather() {
    this.geocodeService.lookupCity(this.city).subscribe((locations) => {
      if (locations && locations.length > 0) {
        const { lat, lon } = locations[0];
        this.weatherService.getForecast(lat, lon).subscribe((forecast) => {
          this.weatherReport = forecast;
        });
      }
    });
  }
}
