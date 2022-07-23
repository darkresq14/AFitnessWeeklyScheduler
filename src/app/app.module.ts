import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DayComponent } from './pages/day/day.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { ActivityComponent } from './components/activity/activity.component';
import { EnumToArrayPipe } from './helpers/enum-to-array.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DayComponent,
    SummaryComponent,
    ActivityComponent,
    EnumToArrayPipe,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
