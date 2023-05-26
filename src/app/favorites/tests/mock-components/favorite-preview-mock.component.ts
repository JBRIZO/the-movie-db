import { Component, Input } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

@Component({
  selector: 'app-favorite-preview',
  template: '<div>Mock</div>',
})
export class MockFavoritesPreviewComponent {
  @Input() movie!: IMovie;

  constructor() {}
}
