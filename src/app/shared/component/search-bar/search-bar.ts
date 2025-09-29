import {Component, input, OnInit, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBar implements OnInit {

  placeholder = input('Barre de recherche');
  searchControl = new FormControl('');

  search = output<string>();

  get hasValue(): boolean {
    return !!this.searchControl.value;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(50), distinctUntilChanged())
      .subscribe(value => {
        this.search.emit(value || '');
      });
  }

  clear(input: HTMLInputElement): void {
    this.searchControl.setValue('');
    // Replacer le focus pour enchaîner la saisie
    queueMicrotask(() => input.focus());
  }
}
