import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACTIVITY_OPTIONS, DAYPERIOD, WEEKDAYS } from 'src/app/constants';
import { ContextService } from 'src/app/helpers/context.service';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  @Input() activityPeriod: DAYPERIOD;
  @ViewChild('optionInput', { static: false }) optionInput: ElementRef;
  activity: Activity;
  activityForm: FormGroup;
  isSubmitted = false;

  formSubscription: Subscription;

  activityDay: WEEKDAYS;
  activityOptions = ACTIVITY_OPTIONS;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private context: ContextService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.context.setIsDayPeriodValid(this.activityPeriod, true);

    this.route.params.subscribe((params: Params) => {
      this.activityDay = params['day'];
      this.initForm();
    });

    this.formSubscription = this.activityForm.valueChanges.subscribe(
      (value) => {
        if (
          value.activityType === ACTIVITY_OPTIONS.NoActivity &&
          this.activityType.touched
        ) {
          this.optionInput.nativeElement.blur();
          this.activityForm.reset(
            { activityType: ACTIVITY_OPTIONS.NoActivity },
            { emitEvent: false }
          );
          this.saveActivity();
          this.context.setIsDayPeriodValid(this.activityPeriod, true);
        }

        if (this.activityForm.valid) {
          this.saveActivity();
          this.context.setIsDayPeriodValid(this.activityPeriod, true);
        } else {
          this.context.setIsDayPeriodValid(this.activityPeriod, false);
        }
      }
    );
  }

  private initForm() {
    let activityType = ACTIVITY_OPTIONS.NoActivity;
    let fromTime = null;
    let toTime = null;

    this.activityForm = new FormGroup(
      {
        activityType: new FormControl(activityType),
        fromTime: new FormControl(fromTime),
        toTime: new FormControl(toTime),
      },
      {
        validators: [
          this.timeValidator,
          this.noActivityWithTimeValidator,
          this.timeRequiredIfActivityValidator,
        ],
      }
    );

    this.activity = this.activityService.getActivityByDayAndPeriod(
      this.activityDay,
      this.activityPeriod
    );

    if (this.activity) {
      this.activityForm.patchValue({
        activityType: this.activity.activityType,
        fromTime: this.activity.fromTime,
        toTime: this.activity.toTime,
      });
      this.activityForm.markAllAsTouched();
    }
  }

  get activityType() {
    return this.activityForm.get('activityType');
  }

  get fromTime() {
    return this.activityForm.get('fromTime');
  }

  get toTime() {
    return this.activityForm.get('toTime');
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

  noActivityWithTimeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const activityType = control.get('activityType').value;
    const fromTime = control.get('fromTime').value;
    const toTime = control.get('toTime').value;

    if (activityType === ACTIVITY_OPTIONS.NoActivity && (fromTime || toTime)) {
      return { noActivityWithTime: true };
    }
    return null;
  };

  timeRequiredIfActivityValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const activityType = control.get('activityType').value;
    const fromTime = control.get('fromTime').value;
    const toTime = control.get('toTime').value;
    if (
      activityType !== ACTIVITY_OPTIONS.NoActivity &&
      (!fromTime || !toTime)
    ) {
      return { timeRequiredIfActivity: true };
    }
    return null;
  };

  saveActivity() {
    const newActivity = new Activity(
      this.activityDay,
      this.activityPeriod,
      this.activityType.value,
      this.fromTime.value,
      this.toTime.value
    );
    this.activityService.updateActivity(
      this.activityDay,
      this.activityPeriod,
      newActivity
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.activityForm.value);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
