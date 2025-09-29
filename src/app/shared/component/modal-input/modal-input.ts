import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal-input',
  standalone: true,
  templateUrl: './modal-input.html',
  styleUrls: ['./modal-input.scss']
})
export class ModalInput {

  isOpen = input.required<boolean>();

  closed = output<void>();

  close() {
    this.closed.emit();
  }
}
