import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {

  private currentWorkingBatch = new Subject<boolean>();

    public emitFullScreenMode(value: boolean) {
        this.currentWorkingBatch.next(value);
    }

    public fullScreenMode() {
        return this.currentWorkingBatch;
    }
}
