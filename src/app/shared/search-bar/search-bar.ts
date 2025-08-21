import {Component, input, OnInit, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html'
})
export class SearchBar implements OnInit {

  placeholder = input('Barre de recherche');
  searchControl = new FormControl('');

  search = output<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(50), distinctUntilChanged())
      .subscribe(value => {
        this.search.emit(value || '');
      });
  }

}
