import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './about.component.html',
})
export class About {

}
