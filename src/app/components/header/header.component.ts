import { Component, OnInit } from '@angular/core';
import { WEEKDAYS } from '../../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  links = WEEKDAYS;

  constructor() {}

  ngOnInit(): void {}
}
