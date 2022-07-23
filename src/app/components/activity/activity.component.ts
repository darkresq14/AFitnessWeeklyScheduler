import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACTIVITY_OPTIONS, DAYPERIOD, WEEKDAYS } from 'src/app/constants';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  @Input() activityPeriod: DAYPERIOD;
  activity: Activity;
  activityForm: FormGroup;
  isSubmitted = false;

  formSubscription: Subscription;
  activitySubscription: Subscription;

  activityDay: WEEKDAYS;
  activityOptions = ACTIVITY_OPTIONS;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.activityDay = params['day'];
      this.initForm();
      console.log('Activity onInit: ', this.activityDay, this.activityPeriod);
      console.log('Activity: ', this.activity);
    });

    this.formSubscription = this.activityForm.valueChanges.subscribe(
      (value) => {
        // if (this.activityForm.valid) {
        const newActivity = new Activity(
          this.activityDay,
          this.activityPeriod,
          value.activityType,
          value.fromTime,
          value.toTime
        );
        this.activityService.updateActivity(
          this.activityDay,
          this.activityPeriod,
          newActivity
        );
        // }
        console.log('Value Changed', value.activityType);
      }
    );

    // this.activitySubscription =
    //   this.activityService.activitiesChanged.subscribe((activities) => {
    //     this.activity = activities.find(
    //       (activity) =>
    //         activity.day === this.activityDay &&
    //         activity.timeOfDay === this.activityPeriod
    //     );
    //     this.initForm();
    //     console.log('Activity Changed');
    //   });
  }

  private initForm() {
    this.activity = this.activityService.getActivityByDayAndPeriod(
      this.activityDay,
      this.activityPeriod
    );

    let activityType = ACTIVITY_OPTIONS.NoActivity;
    let fromTime = null;
    let toTime = null;

    if (this.activity) {
      activityType = this.activity.activityType;
      fromTime = this.activity.fromTime;
      toTime = this.activity.toTime;
    }

    this.activityForm = new FormGroup(
      {
        activityType: new FormControl(activityType, Validators.required),
        fromTime: new FormControl(fromTime, Validators.required),
        toTime: new FormControl(toTime, Validators.required),
      },
      { validators: this.timeValidator }
    );
  }

  timeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const fromTime = control.get('fromTime').value;
    const toTime = control.get('toTime').value;

    if (fromTime && toTime) {
      if (fromTime >= toTime) {
        return { invalidTime: true };
      }
    }
    return null;
  };

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.activityForm.value);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    // this.activitySubscription.unsubscribe();
    console.log('Destroyed');
  }
}
