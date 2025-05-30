import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AutoName} from '../models/auto-name'
import {ChartMetric} from '../models/ChartMetric'
import {OcrEngine} from '../enums/ocr-engine.enum'
import {CacheData} from '../models/cache'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) {
  }

  /**
   * Performs the request to get a suggested name for a new batch
   *
   * @returns {Promise<string>} The suggested name
   * @memberof ConfigurationsService
   */
  getSuggestedName(workflowId: number): Promise<string> {

    return this.http.get(`${environment.proDoCaptureApiUrl}/configuration/workflow/${workflowId}/batch/suggested-name`)
      .toPromise()
      .then(suggestedName => {
        return suggestedName as string;
      });
  }

  /**
   * Performs the request to get all auto name variables
   *
   * @returns {Promise<Array<AutoName>>} The suggested name
   * @memberof ConfigurationsService
   */
  getAutoNameVariables(): Promise<Array<AutoName>> {

    return this.http.get(`${environment.proDoCaptureApiUrl}/configuration/auto-name/variables`)
      .toPromise()
      .then(data => {
        return data as Array<AutoName>;
      });
  }

  updateCacheData() {
    return this.http.get(`${environment.proDoCaptureApiUrl}/configuration/temp-files/reset`)
      .toPromise();
  }

  getOcrEngineLicenses(): Promise<any[]|undefined> {
    return this.http.get<any[]>(`${environment.proDoCaptureApiUrl}/configuration/pdf-searchable/license`)
      .toPromise();
  }

  storeOcrEngineLicenses(request:any): Promise<any> {
    return this.http.post(`${environment.proDoCaptureApiUrl}/configuration/pdf-searchable/license`, request)
      .toPromise();
  }


  canUseOcrEngine(ocrEngine: OcrEngine): Promise<boolean| undefined> {
    return this.http.get<boolean>(`${environment.proDoCaptureApiUrl}/configuration/pdf-searchable/${ocrEngine}`)
      .toPromise();
  }

  /**
   * Determines if a given language is supported by capture webapp
   *
   * @param {any} language
   * @returns {boolean}
   * @memberof ConfigurationsService
   */
  isSupportedLanguage(language:any): boolean {
    const supportedLanguages = {
      'en': 'en',
      'es': 'es'
    };

    return supportedLanguages.hasOwnProperty(language);
  }

  /**
   *
   */
  retrieveChartMetrics(): Promise<Array<ChartMetric>|undefined> {
    return this.http.get<Array<ChartMetric>>(`${environment.proDoCaptureApiUrl}/configuration/reports-parameters`)
      .toPromise()
  }

  saveEditedMetricValue(currentChartKey: number, currentChartKeyValue: number): Promise<any> {
    return this.http.put(`${environment.proDoCaptureApiUrl}/configuration/save-chart-setting/${currentChartKey}/${currentChartKeyValue}`, undefined)
      .toPromise();
  }

  getAllCacheContent = ():Promise<Array<CacheData>|undefined> => {
    return this.http.get<Array<CacheData>>(`${environment.proDoCaptureApiUrl}/configuration/get-all-cache-content`)
    .toPromise();
  }

  removeCacheContent = (key:string):Promise<boolean|undefined> => {
    return this.http.delete<boolean>(`${environment.proDoCaptureApiUrl}/configuration/cache-content/${key}`)
    .toPromise();
  }

  getCacheContent = (key:string):Promise<CacheData|undefined> => {
    return this.http.get<CacheData>(`${environment.proDoCaptureApiUrl}/configuration/cache-content/${key}`)
    .toPromise();
  }

  cleanCache = ():Promise<boolean| undefined> => {
    return this.http.delete<boolean>(`${environment.proDoCaptureApiUrl}/configuration/cache-content`)
    .toPromise();
  }
}

