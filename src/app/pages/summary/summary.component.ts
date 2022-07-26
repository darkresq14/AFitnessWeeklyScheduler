import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/components/activity/activity.service';
import { DAYPERIOD, WEEKDAYS } from 'src/app/constants';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  listOfActivities = [];
  totalKCal = 0;
  totalDurationInMinutes = 0;
  totalDuration = '';
  activitySubscription: Subscription;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activitySubscription =
      this.activityService.activitiesChanged.subscribe(() => {
        this.initPage();
      });
  }

  initPage() {
    this.listOfActivities = [];
    for (let day in WEEKDAYS) {
      for (let period in DAYPERIOD) {
        const newActivity = this.activityService.getActivityByDayAndPeriod(
          WEEKDAYS[day],
          DAYPERIOD[period]
        );
        if (newActivity && newActivity.fromTime && newActivity.toTime) {
          this.listOfActivities.push({
            day: newActivity.day,
            timeOfDay: newActivity.timeOfDay,
            activityType: newActivity.activityType,
            fromTime: newActivity.fromTime,
            toTime: newActivity.toTime,
            duration: this.calcDurationInMinutes(
              newActivity.fromTime,
              newActivity.toTime
            ),
            kCal: this.calcKCal(
              newActivity.activityType,
              newActivity.fromTime,
              newActivity.toTime
            ),
          });
          this.totalKCal += this.calcKCal(
            newActivity.activityType,
            newActivity.fromTime,
            newActivity.toTime
          );
          this.totalDurationInMinutes += this.calcDurationInMinutes(
            newActivity.fromTime,
            newActivity.toTime
          );
        } else {
          this.listOfActivities.push({
            day: WEEKDAYS[day],
            timeOfDay: DAYPERIOD[period],
            activityType: 'No Activity',
            fromTime: '-',
            toTime: '-',
            duration: '-',
            kCal: '-',
          });
        }
      }
    }
    this.totalDuration = this.calcDuration(this.totalDurationInMinutes);
  }

  calcDurationInMinutes(fromTime: string, toTime: string) {
    const fromDate = new Date(`2022-01-01T${fromTime}`);
    const toDate = new Date(`2022-01-01T${toTime}`);
    const duration = toDate.getTime() - fromDate.getTime();
    const durationInMinutes = Math.round(duration / 60000);
    return durationInMinutes;
  }

  calcDuration(durationInMinutes: number) {
    const nrOfHours = Math.floor(durationInMinutes / 60);
    const nrOfMinutes = durationInMinutes % 60;
    return `${nrOfHours < 10 ? '0' + nrOfHours : nrOfHours}:${
      nrOfMinutes < 10 ? '0' + nrOfMinutes : nrOfMinutes
    }`;
  }

  calcKCal(activityType: string, fromTime: string, toTime: string) {
    const durationInMinutes = this.calcDurationInMinutes(fromTime, toTime);
    const kCal = durationInMinutes * this.activityService.getKCal(activityType);
    return kCal;
  }

  ngOnDestroy(): void {
    this.activitySubscription.unsubscribe();
  }
}
