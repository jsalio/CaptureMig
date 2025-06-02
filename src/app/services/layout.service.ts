import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Module } from '../enums/module.enum';
import { BatchMetadata } from '../models/batch-metadata';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private batchData = new Subject<BatchMetadata>();
    private batchMetadataVisibility = new Subject<boolean>();
    private batchPages = new Subject<number>();
    private batchDocuments = new Subject<number>();
    private currentModule = new Subject<Module>();

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    emitBatchData(data: BatchMetadata) {
        this.batchData.next(data);
    }

    emitModule(data: Module) {
        this.currentModule.next(data);
    }

    getModule() {
        return this.currentModule;
      }

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    emitBatchPages(pages: number) {
        this.batchPages.next(pages);
    }

        /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    emitBatchDocuments(documents: number) {
        this.batchDocuments.next(documents);
    }

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    setBatchMetadataVisibility(visibility: boolean) {
        this.batchMetadataVisibility.next(visibility);
    }

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    getBatchMetadataVisibility() {
        return this.batchMetadataVisibility;
    }

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    getBatchPages() {
        return this.batchPages;
    }

    /**
     * Exposes the click's event for the Pending Batch List's button.
     * @returns a Subject for subscribing to the event of Pending Batch List's button.
     * @memberof LayoutService
     */
    getBatchDocuments() {
        return this.batchDocuments;
    }

    /**
     * Exposes emitting the click's event for the Pending Batch List's button.
     * @memberof LayoutService
     */
    getBatchData() {
        return this.batchData;
    }
}
