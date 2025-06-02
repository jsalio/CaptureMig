import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile';

import { BehaviorSubject, interval, Subscription } from 'rxjs';

import { DocumentTypeForm } from '../interface/document-type-form';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  TOKEN_KEY = 'accessToken';
  PRODOCTIVITY_FORMS = 'prodoctivityForms';
  PRODOCTIVITY_DOCUMENT_TYPES = 'prodoctivityDocumentTypes';

  private countdownSubscription: Subscription;
  countdownSubject = new BehaviorSubject<string>('00:00:00');

  constructor(private http: HttpClient) {
    this.startCountdown();
  }

  /**
   * Determines if the current user is logged
   *
   * @readonly
   * @type {boolean}
   * @memberof CurrentUserService
   */
  public get isLogged(): boolean {
    const userProfile = this.currentUser;
    return !(userProfile === null || userProfile === undefined);
  }

  /**
   * Obtain the information for the current user that is logged in.
   *
   * @readonly
   * @type {UserProfile}
   * @memberof CurrentUserService
   */
  public get currentUser(): UserProfile {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY)) as UserProfile;
  }

  startCountdown() {
    this.countdownSubscription = interval(1000)
    .subscribe((remaindSecond) => {
      var remainTime = this.calcularTiempoRestante(moment(this.currentUser.tokenExpirationDate).toDate());
      this.countdownSubject.next(remainTime);
    })
  }
  

  calcularTiempoRestante(fechaFin: Date, fechaInicio: Date = new Date()): string {
    // Asegurarse de que fechaFin sea una fecha futura
    if (fechaFin.getTime() < fechaInicio.getTime()) {
      return '00:00:00'; // Retornar 0 si la fecha final ya pasó
    }
    
    // Calcular diferencia en milisegundos
    const diferenciaMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();
    
    // Convertir milisegundos a segundos, minutos y horas
    const segundosTotales: number = Math.floor(diferenciaMilisegundos / 1000);
    
    const horas: number = Math.floor(segundosTotales / 3600);
    const minutos: number = Math.floor((segundosTotales % 3600) / 60);
    const segundos: number = Math.floor(segundosTotales % 60);
    
    // Formatear el resultado en hh:mm:ss
    const horasStr: string = horas < 10 ? `0${horas}` : `${horas}`;
    const minutosStr: string = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const segundosStr: string = segundos < 10 ? `0${segundos}` : `${segundos}`;
    
    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }
  

  validateToken(): Promise<UserProfile> {
    return this.http.get<UserProfile>(`${environment.proDoCaptureApiUrl}/sessions/refresh`).toPromise();
  }

  saveUserProfile(userInformation: UserProfile) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userInformation));
  }

  public getCurrentPermission(canDeletePage: boolean, canAccessToDelete): boolean {
    return (canDeletePage && canAccessToDelete) ? false : true;
  }

  public getCurrentUserRoles(): string[] {
    const currentUser = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    return currentUser.roles;
  }

  public saveProdoctivityFormsLocal(forms) {
    localStorage.setItem(this.PRODOCTIVITY_FORMS, JSON.stringify(forms));
  }

  public getProdoctivityForms(): DocumentTypeForm[] {
    const forms = JSON.parse(localStorage.getItem(this.PRODOCTIVITY_FORMS));
    return forms as DocumentTypeForm[];
  }

  public saveProdoctivityDocumentTypesLocal(documentTypes) {
    localStorage.setItem(this.PRODOCTIVITY_DOCUMENT_TYPES, JSON.stringify(documentTypes));
  }

  public getProdoctivityDocumentTypes(): any[] {
    const documentTypes = JSON.parse(localStorage.getItem(this.PRODOCTIVITY_DOCUMENT_TYPES));
    return documentTypes as any[];
  }
}
