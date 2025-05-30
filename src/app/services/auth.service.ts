import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import {HubService} from './hub.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HubConnection, HubConnectionState} from '@microsoft/signalr'
import {UserProfile} from '../models/user-profile'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hubConnection: HubConnection;

  constructor(
    private http: HttpClient,
    private hubService: HubService
  ) {
    this.hubConnection = this.hubService.subscribeToSession();
    this.hubConnection.start();
  }

  /**
   * Performs the authentication action for establishing a new session
   *
   * @param {string} username username registered in ProDoctivity
   * @param {string} password password for the given username
   * @returns {Promise<UserProfile>} The userProfile info
   * @memberof AuthService
   */
  authenticate(username: string, password: string): Promise<UserProfile| undefined> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    };

    const requestOptions = { headers: new HttpHeaders(headerDict) };
    return this.http.post<UserProfile>(`${environment.proDoCaptureApiUrl}/sessions`, {}, requestOptions)
      .toPromise();
  }

  validateToken(): Promise<UserProfile| undefined> {
    return this.http.get<UserProfile>(`${environment.proDoCaptureApiUrl}/sessions/refresh`).toPromise();
  }

  /**
   * Performs logout in the current established session
   *
   * @memberof AuthService
   */
  logout(username?: string): void {

    if (username === '' || username === undefined) {
      this.cleanSessionStorage()
      return;
    }
    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.invoke('logUser', username).then();
    }

    this.http.delete(`${environment.proDoCaptureApiUrl}/sessions/logout/${username}`).toPromise().then(() => {
      this.cleanSessionStorage()
    }).catch(() => {
      this.cleanSessionStorage()
    });
  }

  retrieveTimeBeforeExpireInMinutesFormatTime = () => {
    const timeBeforeExpire = localStorage.getItem('timeBeforeExpire');
    if (timeBeforeExpire === null) {
      return '00:00';
    }
    const minutes = Math.floor(Number(timeBeforeExpire) / 60);
    const seconds = Number(timeBeforeExpire) % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  cleanSessionStorage = () => {
    const language = localStorage.getItem('language');
    localStorage.clear();
    if (typeof(language) == 'string'){
      localStorage.setItem('language', language);
    } else {
      localStorage.setItem('language', 'es');
    }

  }
}
