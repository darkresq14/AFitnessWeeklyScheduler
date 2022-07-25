import { Component, OnInit } from '@angular/core';
import { ActivityService } from './components/activity/activity.service';
import { LocalService } from './helpers/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AFitnessWeeklyScheduler';

  constructor(
    private local: LocalService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    const newActivities = JSON.parse(this.local.getData('activities'));
    if (newActivities) {
      this.activityService.setActivities(newActivities);
    }
  }
}
