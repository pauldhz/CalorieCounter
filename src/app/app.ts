import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FoodView} from './food/view/foodView';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calorie-counter');
}
