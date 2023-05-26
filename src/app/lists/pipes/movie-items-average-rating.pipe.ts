import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

@Pipe({
  name: 'movieItemsAverageRating',
})
export class MovieItemsAverageRatingPipe implements PipeTransform {
  transform(value: IMovie[]): unknown {
    let averageRating = 0;
    for (let movie of value) {
      averageRating += movie.vote_average;
    }
    averageRating = (averageRating / value.length) * 10;
    return averageRating.toFixed(2);
  }
}
