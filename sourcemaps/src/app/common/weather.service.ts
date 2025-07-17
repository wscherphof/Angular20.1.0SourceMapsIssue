import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1';

  constructor(private apiService: ApiService) {}

  private get<T>(endpoint: string, params?: any): Observable<T> {
    return this.apiService.get<T>(this.baseUrl)(endpoint, params);
  }

  getForecast(latitude: number, longitude: number): Observable<any> {
    const endpoint = `forecast`;
    const params = {
      latitude,
      longitude,
      hourly: 'temperature_2m',
    };
    return this.get<any>(endpoint, params);
  }
}
