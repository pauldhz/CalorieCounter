import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.scss'
})
export class Tag {

  tagName = input.required<string>();
  selected = input<boolean>(false);

  tagClicked = output<string>();

  onTagClick() {
    this.tagClicked.emit(this.tagName());
  }

}
