import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DAYPERIOD, WEEKDAYS } from 'src/app/constants';
import { IActivity } from './activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private activities: IActivity[] = [];

  activitiesChanged = new Subject<IActivity[]>();

  constructor() {}

  triggerActivitiesChanged() {
    this.activitiesChanged.next(this.activities.slice());
  }

  getActivities() {
    return this.activities.slice();
  }

  getActivityByDayAndPeriod(day: WEEKDAYS, period: DAYPERIOD) {
    return this.activities.find(
      (activity) => activity.day === day && activity.timeOfDay === period
    );
  }
}
