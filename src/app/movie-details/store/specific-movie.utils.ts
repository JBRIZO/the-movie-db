import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';

export class SpecificMovieUtils {
  static handleResult(response: IMoviesReponse, initialResults: number[]) {
    const { results, ...meta } = response;
    const uniqueIds = new Set([
      ...response.results.map(result => result.id, ...initialResults),
    ]);
    const ids = Array.from(uniqueIds);
    return { ...meta, ids };
  }
}
