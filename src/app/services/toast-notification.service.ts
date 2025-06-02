import { Injectable } from '@angular/core';
import { ToastModel } from '../models/toast-model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  private methods = [];
  defaultTime = 3000;
  constructor(private toastr: ToastrService) {
    this.methods = [
      this.showSuccess.bind(this),
      this.showInfo.bind(this),
      this.showWarning.bind(this),
      this.showError.bind(this),
      this.showCustom.bind(this)
    ];
  }

  /**
   * Performs the action to show a message through a toast component with given characteristics
   *
   * @param {ToastModel} toast toast main information
   * @param {ToastType} type type of notification
   * @memberof ToastNotificationsService
   */
  show(toast: ToastModel, type: ToastType, durationTime?: number) {
    toast.options = {
      positionClass: 'toast-bottom-left',
      closeButton: true,
      timeOut: durationTime === undefined ? this.defaultTime : durationTime
    };
    this.toastr.toastrConfig.maxOpened = 1;
    this.toastr.toastrConfig.preventDuplicates = true;
    this.methods[type](toast);
  }

  private showSuccess(toast: ToastModel) {
    this.toastr.success(toast.message, toast.title, toast.options);
  }

  private showError(toast: ToastModel) {
    this.toastr.error(toast.message, toast.title, toast.options);
  }

  private showWarning(toast: ToastModel) {
    this.toastr.warning(toast.message, toast.title, toast.options);
  }

  private showInfo(toast: ToastModel) {
    this.toastr.info(toast.message, toast.title, toast.options);
  }

  private showCustom(toast: ToastModel) {
    this.toastr.show(toast.message, toast.title, toast.options);
  }

}
/**
 * Represents toast message types
 *
 * @export
 * @enum {number}
 */
export enum ToastType {
  Success = 0,
  Info,
  Warning,
  Error,
  Custom
}
