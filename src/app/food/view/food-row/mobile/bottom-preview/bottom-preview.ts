import {Component, input} from '@angular/core';

@Component({
  selector: 'app-bottom-preview',
  imports: [],
  templateUrl: './bottom-preview.html',
  styleUrls: ['./bottom-preview.scss'],
})
export class BottomPreview {

  display = input.required<boolean>();

}
