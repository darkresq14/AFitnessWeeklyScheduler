import { ACTIVITY_OPTIONS, DAYPERIOD, WEEKDAYS } from 'src/app/constants';

// export interface IActivity {
//   day: WEEKDAYS;
//   timeOfDay: DAYPERIOD;
//   activityType: ACTIVITY_OPTIONS;
//   fromTime: Date;
//   toTime: Date;
// }

export class Activity {
  day: WEEKDAYS;
  timeOfDay: DAYPERIOD;
  activityType: ACTIVITY_OPTIONS;
  fromTime: string;
  toTime: string;

  constructor(
    day: WEEKDAYS,
    timeOfDay: DAYPERIOD,
    activityType: ACTIVITY_OPTIONS,
    fromTime: string,
    toTime: string
  ) {
    this.day = day;
    this.timeOfDay = timeOfDay;
    this.activityType = activityType;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }
}
