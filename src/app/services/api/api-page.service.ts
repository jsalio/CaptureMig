import { DeletePageInfo, RestorePageRequest } from '../../models/restorePage';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../models/page';
import { PageCreateModel } from '../../models/create-page-model';
import { RotateOrientation } from '../../enums/rotate-orientation.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPageService {

  constructor(private readonly http: HttpClient) { }


  generateShortGuidWithTimestam = (): string => {
    const timestamp = Date.now().toString(36); // Base 36 para hacerlo más corto
    const random = Math.random().toString(36).substr(2, 5); // 5 caracteres aleatorios
    return `${timestamp}-${random}`;
  }

  /**
   * Peforms the creation of a given Batch's pages
   *
   * @param {PageCreateModel} page data that needs to be created
   * @returns The data of the batch created
   * @memberof PagesService
   */
  createPageAsync(page: PageCreateModel[], batchId: number, documentId?: number) {
    return this.http.post(`${environment.proDoCaptureApiCoreUrl}/pages/${batchId}`, { pages: page, documentId: documentId, batchId: batchId })
      .toPromise();
  }

  retryCreatePageAsync(page: PageCreateModel[], batchId: number, documentId?: number) {
    return this.http.post(`${environment.proDoCaptureApiCoreUrl}/pages/${batchId}/retry`,
      { pages: page, documentId: documentId, batchId: batchId })
      .toPromise();
  }

  createPage(page: PageCreateModel[], batchId: number, documentId?: number) {
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/add-pages-to-batch/${documentId}/async`,
      page)
      .toPromise();
  }

  storePageToRecognizeOnline(page: PageCreateModel[], documentId: number) {
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/store/${documentId}/recognize`, page)
      .toPromise();
  }

  createLocalPageOnDisk(page: PageCreateModel[]) {
    return this.http.post(`${environment.proDoCaptureLocalApiUrl}/pages/on-disk`, page)
      .toPromise();
  }

  createMultiPage(page: any, documentId?: number) {
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/multiples/${documentId}`, page)
      .toPromise();
  }

  getComposedBarcodeConfigurationBase64Image(id: number): Promise<string> {
    return this.http.get<string>(`${environment.proDoCaptureApiUrl}/pages/system-documents/barcode/${id}`).
      toPromise();
  }

  exists(pageId: number) {
    return this.http.get(`${environment.proDoCaptureApiUrl}/pages/${pageId}/exists`)
      .toPromise();
  }

  extractBarcodes(imageBase64String: string) {
    const request = { base64String: imageBase64String };
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/barcode`, request)
      .toPromise();
  }

  /**
   * Peforms the creation of a given Batch's pages
   *
   * @param {PageCreateModel} page data that needs to be created
   * @returns The data of the batch created
   * @memberof PagesService
   */
  storePagesOnLocal(page: PageCreateModel[]): Promise<Page[]> {
    return this.http.post<Page[]>(`${environment.proDoCaptureLocalApiUrl}/pages`, page)
      .toPromise();
  }

  updatePageOnlineOnLocal(request: any, pageId: number): Promise<any> {
    return this.http.put<any>(`${environment.proDoCaptureLocalApiUrl}/pages/${pageId}`, request)
      .toPromise();
  }

  importPagesOnLocal(page: PageCreateModel[]): Promise<Page[]> {
    return this.http.post<Page[]>(`${environment.proDoCaptureLocalApiUrl}/pages/import`, page)
      .toPromise();
  }

  /**
   * Peforms the creation of a given page's metadata
   *
   * @param {PageCreateModel} page data that needs to be created
   * @returns The data of the batch created
   * @memberof PagesService
   */
  createPageMetadata(page: PageCreateModel[], documentId?: number): any {
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/metadata/${documentId}`, page)
      .toPromise();
  }

  /**
   * This method is used for getting the document image that belongs to a document.
   * @param {number} pageId Page requested's identification.
   * @returns {string} The ProDocapture API's URL that will be use for passing it to the viewer
   * @memberof PagesService
   */
  getImage(pageId: number, version?: number): string {
    const randomNumber: number = Math.floor(Math.random() * 1000) + 1;
    return `${environment.proDoCaptureApiUrl}/pages/${pageId}/image/${randomNumber}/jpg?${this.generateShortGuidWithTimestam()}`;
  }

  getImageDynamsoftTempById(imageId): string {
    return `"http://127.0.0.1:18622/dwt/dwt_trial_14100828/img?id=${imageId}&index=0&t=1539674113432`;
  }

  getThumbnailImageDynamsoftTempById(pageId: number, version?: number): string {
    return `${environment.proDoCaptureApiUrl}/pages/${pageId}/image/${version}/jpg`;
  }

  getThumbnailImage(pageId: number, version?: number): string {
    const date = new Date().getTime();
    const randomNumber: number = Math.floor(Math.random() * 1000) + 1;
    return `${environment.proDoCaptureApiUrl}/pages/${pageId}/thumbnail/image/${randomNumber}/async/jpg?${this.generateShortGuidWithTimestam()}`;
  }

  /**
   * This method is used for getting the document image that belongs to a document.
   * @param {number} pageId Page requested's identification.
   * @returns {string} The ProDocapture API's URL that will be use for passing it to the viewer
   * @memberof PagesService
   */
  getImageFromLocal(request): string {
    // tslint:disable-next-line:max-line-length
    return `${environment.proDoCaptureLocalApiUrl}/pages/${request.batchId}/${request.pageId}/image/${request.order}/${request.version}/jpg`;
  }

  getThumbnailImageFromLocal(request): string {
    const date = new Date().getTime();
    // tslint:disable-next-line:max-line-length
    return `${environment.proDoCaptureLocalApiUrl}/pages/${request.batchId}/${request.pageId}/thumbnail/image/${request.order}/${request.version}/jpg?${date}`;
  }

  /**
   * This method is used for rotate a page.
   * @param {number} pageId Page requested's identification.
   * @returns {string} The ProDocapture API's URL that will be use for passing it to the viewer
   * @memberof PagesService
   */
  rotatePage(pageId: number, rotateOrientation: RotateOrientation, rotationQuantity: number): Promise<Page> {
    return this.http.put<Page>(`${environment.proDoCaptureApiUrl}/pages/${pageId}/rotate-page`,
      { pageId, rotateOrientation, rotationQuantity })
      .toPromise();
  }

  rotatePageOnLocal(pageId: number, rotateOrientation: RotateOrientation, rotationQuantity: number): Promise<Page> {
    return this.http.put<Page>(`${environment.proDoCaptureLocalApiUrl}/pages/${pageId}/rotate`,
      { pageId, rotateOrientation, rotationQuantity })
      .toPromise();
  }

  /**
   * This method is used for move pages to a new order on his container.
   * @param {number[]} pagesIds Page requested's identification.
   * @returns {string} The ProDocapture API's URL that will be use for passing it to the viewer
   * @memberof PagesService
   */
  movePages(pagesToReorder): Promise<Page[]> {
    return this.http.put<Page[]>(`${environment.proDoCaptureApiUrl}/pages/reorder-pages`, pagesToReorder)
      .toPromise();
  }

  movePagesOnLocal(pagesToReorder): Promise<Page[]> {
    return this.http.put<Page[]>(`${environment.proDoCaptureLocalApiUrl}/pages/reorder`, pagesToReorder)
      .toPromise();
  }

  getBatchPagesOnLocal(batchId: number): Promise<any[]> {
    return this.http.get<any[]>(`${environment.proDoCaptureLocalApiUrl}/pages/${batchId}`).toPromise();
  }

  /**
   * Performs the delete page action for a batch
   * @param {*} number
   * @returns {*}
   * @memberof PagesService
   */
  deletePage(pagesToDelete: number[], batchId: number, message: string, userName: string) {
    const deletePageRequest = {
      batchId: batchId,
      pages: pagesToDelete,
      message: message,
      userName: userName
    }
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/delete/${batchId}`, deletePageRequest)
      .toPromise();
  }

  /**
   * Performs the delete page action for a batch
   * @param {*} number
   * @returns {*}
   * @memberof PagesService
   */
  deletePageMetadata(pagesToDelete: number[], batchId: number) {
    return this.http.post(`${environment.proDoCaptureApiUrl}/pages/delete-metadata/${batchId}`, pagesToDelete)
      .toPromise();
  }

  /**
   * Performs the delete page action for a batch
   * @param {*} number
   * @returns {*}
   * @memberof PagesService
   */
  deletePageOnLocal(pagesId: number[]) {
    const pagesIdQueryString = this.buildPagesIdQueryString(pagesId);
    return this.http.delete(`${environment.proDoCaptureLocalApiUrl}/pages${pagesIdQueryString}`)
      .toPromise();
  }

  private buildPagesIdQueryString(pagesId: Array<number>): string {
    let queryParams = '?';
    for (let index = 0; index < pagesId.length; index++) {
      queryParams += `pagesId=${pagesId[index]}&`;
    }
    return queryParams.slice(0, (queryParams.length - 1));
  }

  /**
   * Performs the replace of a page action for a batch
   * @param {*} number
   * @param {PageCreateModel} page data that needs to be created
   * @returns {*}
   * @memberof PagesService
   */
  replacePage(pageToDelete: number, page: PageCreateModel[], batchId: number): Promise<any> {
    return this.http.put<any>(`${environment.proDoCaptureApiUrl}/pages/${pageToDelete}/${batchId}/image/jpg`, page)
      .toPromise();
  }

  /**
   * Performs the replace of a page action for a batch
   * @param {*} number
   * @param {PageCreateModel} page data that needs to be created
   * @returns {*}
   * @memberof PagesService
   */
  replacePageOnLocal(batchId: number, documentId: number, order: number, page: PageCreateModel): Promise<Page> {
    return this.http.put<Page>(`${environment.proDoCaptureLocalApiUrl}/pages/${batchId}/${documentId}/image/${order}/jpg`, page)
      .toPromise();
  }

  /**
   * Perform action for retrieve pages marked as delete pages for a document
   *
   * @param documentId current document id
   * @param batchId current batch id
   * @returns  Array of pages
   */
  retrieveMarkedAsDeletePages(documentId: number, batchId: number): Promise<Array<DeletePageInfo>> {
    return this.http.get<Array<DeletePageInfo>>(`${environment.proDoCaptureApiUrl}/pages/marked-as-delete/${batchId}/${documentId}`)
      .toPromise();
  }
  recoveryPage(request: RestorePageRequest): Promise<any> {
    return this.http.put<any>(`${environment.proDoCaptureApiUrl}/pages/restore`, request)
      .toPromise();
  }
}
