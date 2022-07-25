import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAYPERIOD } from '../constants';

@Injectable({ providedIn: 'root' })
export class ContextService {
  private isDayValid = new BehaviorSubject<boolean>(true);
  public isDayValid$ = this.isDayValid.asObservable();

  private isMorningValid = true;
  private isEveningValid = true;

  constructor() {}

  setIsDayPeriodValid(period: string, valid: boolean) {
    if (period === DAYPERIOD.Morning) {
      this.isMorningValid = valid;
    }
    if (period === DAYPERIOD.Evening) {
      this.isEveningValid = valid;
    }

    this.isDayValid.next(this.isMorningValid && this.isEveningValid);
  }
}
