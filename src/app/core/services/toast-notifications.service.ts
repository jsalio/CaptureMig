import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

export interface ToastNotification {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {
  constructor(private toastr: ToastrService) {}

  show(notification: ToastNotification, type: ToastType): void {
    switch (type) {
      case ToastType.Success:
        this.toastr.success(notification.message, notification.title);
        break;
      case ToastType.Error:
        this.toastr.error(notification.message, notification.title);
        break;
      case ToastType.Warning:
        this.toastr.warning(notification.message, notification.title);
        break;
      case ToastType.Info:
        this.toastr.info(notification.message, notification.title);
        break;
    }
  }
} 