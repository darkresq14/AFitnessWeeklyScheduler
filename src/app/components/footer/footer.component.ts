import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LINKS } from 'src/app/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  activeUrl: string = '/Day/Monday';
  prevUrl: string = 'Summary';
  nextUrl: string = 'Tuesday';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('day')) {
          this.activeUrl = event.urlAfterRedirects.split('/')[2];
        } else {
          this.activeUrl = event.urlAfterRedirects.split('/')[1];
        }
        const indexOfactive = LINKS.indexOf(this.activeUrl);
        if (indexOfactive === 0) {
          this.prevUrl = LINKS[LINKS.length - 1];
          this.nextUrl = LINKS[indexOfactive + 1];
        } else if (indexOfactive === LINKS.length - 1) {
          this.prevUrl = LINKS[indexOfactive - 1];
          this.nextUrl = LINKS[0];
        } else {
          this.prevUrl = LINKS[indexOfactive - 1];
          this.nextUrl = LINKS[indexOfactive + 1];
        }
      });
  }
}
