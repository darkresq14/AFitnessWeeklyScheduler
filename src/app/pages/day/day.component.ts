import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DAYPERIOD, WEEKDAYS } from 'src/app/constants';
import { ContextService } from 'src/app/helpers/context.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnDestroy {
  id: number;
  contextSubscription: Subscription;
  isDayValid = true;

  morning = DAYPERIOD.Morning;
  evening = DAYPERIOD.Evening;

  constructor(
    private route: ActivatedRoute,
    private context: ContextService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['day'];
      if (!(this.id in WEEKDAYS)) {
        this.router.navigate(['/404']);
      }
    });

    this.contextSubscription = this.context.isDayValid$.subscribe(
      (isDayValid) => {
        this.isDayValid = isDayValid;
      }
    );
  }

  ngOnDestroy(): void {
    this.contextSubscription.unsubscribe();
  }
}
