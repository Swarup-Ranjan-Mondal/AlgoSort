import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionListComponent } from './components/option-list/option-list.component';
import { BallComponent } from './components/ball/ball.component';
import { BallsDisplayComponent } from './components/balls-display/balls-display.component';
import { BarsDisplayComponent } from './components/bars-display/bars-display.component';
import { PartitionWallComponent } from './components/partition-wall/partition-wall.component';
import { BarComponent } from './components/bar/bar.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionListComponent,
    BallComponent,
    BallsDisplayComponent,
    BarsDisplayComponent,
    PartitionWallComponent,
    BarComponent,
    HamburgerComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
