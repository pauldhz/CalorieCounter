import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FoodView} from './food/view/foodView';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FoodView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calorieCounter');
}
