import { Injectable } from '@angular/core';
import { CacheStorageService } from './cache-storage.service';

/**
 * Type of the skippable modal
 */
export type SkipModalType =
  'OpenBatchScanMessageSkip' |
  'OpenBatchQaMessageSkip' |
  'OpenBatchIndexMessageSkip'|
  'OpenBatchInBatchControlMessageSkip'|
  'ResetNotificationSkip'|
  '';

/**
 * Options for the skippable modal
 */
export type SkippableModalOptions = {
  OpenBatchScanMessageSkip: boolean,
  OpenBatchQaMessageSkip: boolean,
  OpenBatchIndexMessageSkip: boolean,
  OpenBatchInBatchControlMessageSkip: boolean,
  ResetNotificationSkip:boolean
};

@Injectable({
  providedIn: 'root'
})
export class SkippableOptionService {
  private modalSkipCookieName = 'ModalSkipCookieStore';

  constructor(private readonly chacheStore: CacheStorageService) {
   }

     /**
   *  Indicates if the modal should be skipped
   *
   * @param key
   * @returns
   */
  public isSkippable(key: string): boolean {
    const localStorageItem = this.chacheStore.get<SkippableModalOptions| {}>(this.modalSkipCookieName, {});
    return localStorageItem == null ? false : localStorageItem[key];
  }

  /***
   * Sets the skippable modal
   */
  public setSkippable(key: SkipModalType, value: boolean) {
    this.chacheStore.updateValue<SkippableModalOptions| {}>(this.modalSkipCookieName, { [key]: value });
  }

  resetSkipOption = () => {
    this.chacheStore.destroy(this.modalSkipCookieName)
  }
}
