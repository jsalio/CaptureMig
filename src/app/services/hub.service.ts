import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  
    /**
     * Gets the HubConnection
     *
     * @returns  A HubConnection
     * @memberof HubService
     */
    public subscribeToAssignment(): HubConnection {
      return new HubConnectionBuilder()
      .withUrl(`${environment.proDoCaptureSignalRApiUrl}/assignment`)
      .build();
  }

  public subscribeToBatchChanges(): HubConnection {
      return new HubConnectionBuilder()
      .withUrl(`${environment.proDoCaptureSignalRApiUrl}/batches`)
      .build();
  }

  public subscribeToSession(): HubConnection {
      return new HubConnectionBuilder()
      .withUrl(`${environment.proDoCaptureSignalRApiUrl}/session`)
      .build();
  }
}
