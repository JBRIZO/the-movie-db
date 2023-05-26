export interface ISpecificMovieState<T> {
  loading: boolean;
  errors: string | null;
  result: T | null;
}
