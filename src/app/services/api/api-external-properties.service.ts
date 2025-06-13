import { Injectable } from '@angular/core';
import { ExternalProperty } from '../../models/external-property';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiExternalPropertiesService {

  constructor(private http: HttpClient) { }
  /**
 *
 * @returns {Promise<ExternalProperty[]>}
 */
  getExternalPropertiesConfiguration(): Promise<ExternalProperty[]> {
    return this.http.get<ExternalProperty[]>(`${environment.proDoCaptureApiUrl}/external-properties/`)
      .toPromise();
  }

  /**
   *
   * @returns {Promise<ExternalProperty>}
   */
  getExternalPropertyById(id: number): Promise<ExternalProperty> {
    return this.http.get<ExternalProperty>(`${environment.proDoCaptureApiUrl}/external-properties/${id}`)
      .toPromise();
  }

  /**
   *
   * @returns {Promise<ExternalProperty>}
   */
  createExternalProperty(externalProperty: ExternalProperty) {
    const resource = `${environment.proDoCaptureApiUrl}/external-properties`;
    return this.http.post<ExternalProperty[]>(resource, externalProperty)
      .toPromise();
  }

  /**
   *
   * @returns {Promise<ExternalProperty>}
   */
  updateExternalProperty(externalProperty: ExternalProperty) {
    const resource = `${environment.proDoCaptureApiUrl}/external-properties`;
    return this.http.put<ExternalProperty[]>(resource, externalProperty)
      .toPromise();
  }

  /**
 *
 * @returns {Promise<int>}
 */
  deleteExternalProperty(id: number) {
    return this.http.delete<ExternalProperty[]>(`${environment.proDoCaptureApiUrl}/external-properties/${id}`)
      .toPromise();
  }
}
