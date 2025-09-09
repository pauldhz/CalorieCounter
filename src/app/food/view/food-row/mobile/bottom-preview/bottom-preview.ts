import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-bottom-preview',
  imports: [
    NgClass
  ],
  templateUrl: './bottom-preview.html',
  styleUrls: ['./bottom-preview.scss'],
})
export class BottomPreview {

  display = input.required<boolean>();

  isCollapsed = input.required<boolean>();

  togglePreview = output<void>();

  toggle() {
    this.togglePreview.emit();
  }

}
