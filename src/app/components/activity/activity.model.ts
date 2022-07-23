import { ACTIVITY_OPTIONS, DAYPERIOD, WEEKDAYS } from 'src/app/constants';

export interface IActivity {
  day: WEEKDAYS;
  timeOfDay: DAYPERIOD;
  activityType: ACTIVITY_OPTIONS;
  fromTime: Date;
  toTime: Date;
}
