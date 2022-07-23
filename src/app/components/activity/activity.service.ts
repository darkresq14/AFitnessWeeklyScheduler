import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DAYPERIOD, WEEKDAYS } from 'src/app/constants';
import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private activities: Activity[] = [];

  activitiesChanged = new Subject<Activity[]>();

  constructor() {}

  triggerActivitiesChanged() {
    this.activitiesChanged.next(this.activities.slice());
  }

  getActivities() {
    return this.activities.slice();
  }

  getActivityByDayAndPeriod(day: WEEKDAYS, period: DAYPERIOD) {
    console.log('Getting day and period: ', day, period);
    console.log('All activities: ', this.activities);
    return this.activities.find(
      (activity) => activity.day === day && activity.timeOfDay === period
    );
  }

  updateActivity(day: WEEKDAYS, period: DAYPERIOD, activity: Activity) {
    const activityIndex = this.activities.findIndex(
      (a) => a.day === day && a.timeOfDay === period
    );

    if (activityIndex > -1) {
      this.activities[activityIndex] = activity;
    } else {
      this.activities.push(activity);
    }
    console.log('Updated activity: ', activity.activityType);
    console.log('All activities: ', this.activities);
    this.triggerActivitiesChanged();
  }
}
