import { Injectable } from '@angular/core';
import { BasicOperationResponse } from '../../interface/basic-operation-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Volume } from '../../interface/volume';
import { VolumeConsumeDetails } from '../../models/VolumeDetails';

@Injectable({
  providedIn: 'root'
})
export class ApiVolumeService {

  
  constructor(private http: HttpClient) { }

  /**
   * Gets all the storage volumes from the repository through the web API.
   * @returns {Promise<Array<Volume>>}
   * @memberof VolumeService
   */
  getAllVolumes(): Promise<BasicOperationResponse<Array<Volume>>> {
    return this.http.get<BasicOperationResponse<Array<Volume>>>(`${environment.proDoCaptureApiUrl}/volume`).
      toPromise();
  }

  storeVolume(request) {
    return this.http.post<Volume>(`${environment.proDoCaptureApiUrl}/volume`, request).
      toPromise();
  }

  getVolumesConsumeSpace(): Promise<Array<VolumeConsumeDetails>> {
    return this.http.get<Array<VolumeConsumeDetails>>(`${environment.proDoCaptureApiUrl}/volume//volume-consume`).
      toPromise();
  }
}
