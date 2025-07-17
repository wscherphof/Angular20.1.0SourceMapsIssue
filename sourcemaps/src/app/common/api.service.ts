import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatBaseUrl(baseUrl: string): string {
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      return `https://${baseUrl}`;
    }
    return baseUrl;
  }

  get<T>(baseUrl: string): (endpoint: string, params?: any) => Observable<T> {
    baseUrl = this.formatBaseUrl(baseUrl);
    return (endpoint: string, params?: any) => {
      return this.http.get<T>(`${baseUrl}/${endpoint}`, { params });
    };
  }

  post<T>(
    baseUrl: string
  ): (endpoint: string, body: any, headers?: HttpHeaders) => Observable<T> {
    baseUrl = this.formatBaseUrl(baseUrl);
    return (endpoint: string, body: any, headers?: HttpHeaders) => {
      return this.http.post<T>(`${baseUrl}/${endpoint}`, body, { headers });
    };
  }

  put<T>(
    baseUrl: string
  ): (endpoint: string, body: any, headers?: HttpHeaders) => Observable<T> {
    baseUrl = this.formatBaseUrl(baseUrl);
    return (endpoint: string, body: any, headers?: HttpHeaders) => {
      return this.http.put<T>(`${baseUrl}/${endpoint}`, body, { headers });
    };
  }

  delete<T>(
    baseUrl: string
  ): (endpoint: string, headers?: HttpHeaders) => Observable<T> {
    baseUrl = this.formatBaseUrl(baseUrl);
    return (endpoint: string, headers?: HttpHeaders) => {
      return this.http.delete<T>(`${baseUrl}/${endpoint}`, { headers });
    };
  }
}
