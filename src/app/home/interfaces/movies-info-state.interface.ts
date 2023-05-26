export interface IMoviesFetch<T, P> {
  popular: T | P;
  topRated: T | P;
  playingNow: T | P;
  upcoming: T | P;
}
