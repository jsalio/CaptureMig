import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthService } from '../../services/auth.service';
// import { ToastNotificationsService } from '../services/toast-notifications.service';
import { ToastType,ToastNotificationService } from '../../services/toast-notification.service';
// import { ToastNotificationsService } from '../../services/toast-notifications.service';
// import { CurrentUserService } from '../services/current-user.service';
// import { AuthService } from '../services/auth.service';
// import { ToastNotificationsService, ToastType } from '../services/toast-notifications.service';

let refreshingToken = false;

export const httpInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const currentUserService = inject(CurrentUserService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const translateService = inject(TranslateService);
  const toastService = inject(ToastNotificationService);

  const user = currentUserService.currentUser;

  let modifiedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  // Agregar token de autorización si el usuario está logueado
  if (!request.headers.has('Authorization') && currentUserService.isLogged) {
    modifiedRequest = modifiedRequest.clone({
      setHeaders: {
        Authorization: `bearer ${user?.token}`
      }
    });
  }

  // Validar token y manejar expiración
  if (user && currentUserService.isLogged) {
    if (moment(user.tokenExpirationDate).isBefore(moment())) {
      displayToast('ExpiredSessionTitle', 'ExpiredSessionMessage', ToastType.Warning);
      authService.logout(user.username);
      router.navigate(['/login']);
      return throwError(() => new Error('Session expired'));
    }

    if (!refreshingToken) {
      refreshingToken = true;
      authService.validateToken()
        .then((result) => {
          refreshingToken = false;
          const userData = currentUserService.currentUser;
          if (userData) {
            userData.token = result.token;
            userData.tokenExpirationDate = result.tokenExpirationDate;
            currentUserService.saveUserProfile(userData);
          }
        })
        .catch((err) => {
          refreshingToken = false;
          if (err.status === 401) {
            logoutUser('ExpiredSessionTitle', 'ExpiredSessionMessage', user.username);
          }
        });
    }
  }

  return next(modifiedRequest).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 && currentUserService.isLogged) {
          logoutUser('ExpiredSessionTitle', 'ExpiredSessionMessage', user?.username || '');
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Manejo centralizado de errores
      let errorMessage = 'Ha ocurrido un error';
      
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      // Aquí puedes agregar lógica adicional para manejar diferentes tipos de errores
      // Por ejemplo, redirigir a una página de error, mostrar notificaciones, etc.

      return throwError(() => error);
    })
  );

  function logoutUser(title: string, body: string, username: string) {
    displayToast(title, body, ToastType.Error);
    authService.logout(username);
    router.navigate(['/login']);
  }

  function displayToast(title: string, message: string, toastType: ToastType): void {
    translateService.get([message, title]).subscribe(translation => {
      toastService.show({
        title: translation[title],
        message: translation[message],
        options:{}
      }, toastType);
    });
  }
}; 