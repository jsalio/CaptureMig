import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComposedBarcodeConfiguration } from '../../models/composed-barcode-configuration';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiComposeBarcodeConfigurationService {

  constructor(private http: HttpClient) { }

  /**
   * Stores a list of composed barcode configuration into the system.
   * @returns {Promise<any>}
   * @memberof ComposedBarcodeConfigurationService
   */
  storeConfigurations(configurations: ComposedBarcodeConfiguration): Promise<any> {
    return this.http.post<any>(`${environment.proDoCaptureApiUrl}/documents-splitter`, configurations).
      toPromise();
  }

  updateConfigurations(configurations: ComposedBarcodeConfiguration): Promise<any> {
    return this.http.put<any>(`${environment.proDoCaptureApiUrl}/documents-splitter/composed-barcode`, configurations).
      toPromise();
  }

  getComposedBarcodeConfiguration(id: number): Promise<ComposedBarcodeConfiguration> {
    return this.http.get<ComposedBarcodeConfiguration>(`${environment.proDoCaptureApiUrl}/documents-splitter/composed-barcode/${id}`).
      toPromise();
  }

  getBarcodeFormats(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.proDoCaptureApiUrl}/documents-splitter/barcode-formats`).
      toPromise();
  }

  /**
   * Get all the composed barcode configurations
   * @returns {Promise<any>}
   * @memberof ComposedBarcodeConfigurationService
   */
  getComposedBarcodeConfigurations(): Promise<ComposedBarcodeConfiguration[]> {
    return this.http.get<ComposedBarcodeConfiguration[]>(`${environment.proDoCaptureApiUrl}/documents-splitter/composed-barcode`).
      toPromise();
  }

  deleteComposedBarcodeConfiguration(id: number): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.proDoCaptureApiUrl}/documents-splitter/composed-barcode/${id}`).
      toPromise();
  }
}
