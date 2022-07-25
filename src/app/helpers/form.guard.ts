import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DayComponent } from '../pages/day/day.component';

@Injectable({ providedIn: 'root' })
export class FormGuard implements CanDeactivate<DayComponent> {
  canDeactivate(
    component: DayComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isDayValid) {
      return true;
    } else {
      return confirm(
        'Invalid activities will not be saved. Are you sure you want to leave this page?'
      );
    }
  }
}
