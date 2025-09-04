import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FoodView} from './food/view/foodView';
import {Header} from './header/header';
import {AnalyticsService} from './analytics/analytics-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calorie-counter');
  constructor(private _analytics: AnalyticsService) {}
}
