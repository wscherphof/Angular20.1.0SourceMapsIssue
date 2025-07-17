import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org';

  constructor(private apiService: ApiService) {}

  private get<T>(endpoint: string, params?: any): Observable<T> {
    return this.apiService.get<T>(this.baseUrl)(endpoint, params);
  }

  lookupCity(cityName: string): Observable<any> {
    const endpoint = 'search';
    const params = {
      q: cityName,
      format: 'json',
    };
    return this.get<any>(endpoint, params);
  }
}
