import { MovieState } from 'src/app/store/movies/movies.entity';
import { FavoriteState } from '../../store/favorites.reducer';

export const mockMovieState: MovieState = {
  ids: [1, 2],
  entities: {
    '1': {
      adult: false,
      backdrop_path: '/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      genre_ids: [28, 14, 878],
      id: 1,
      original_language: 'en',
      original_title: 'Black Adam',
      overview:
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
      popularity: 4430.63,
      poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
      release_date: '2022-10-19',
      title: 'Black Adam',
      video: false,
      vote_average: 6.9,
      vote_count: 1114,
    },
    '2': {
      adult: false,
      backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
      genre_ids: [28, 12, 878],
      id: 2,
      original_language: 'en',
      original_title: 'Black Panther: Wakanda Forever',
      overview:
        'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
      popularity: 3728.879,
      poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      release_date: '2022-11-09',
      title: 'Black Panther: Wakanda Forever',
      video: false,
      vote_average: 7.5,
      vote_count: 667,
    },
  },
};

export const mockFavoriteState: FavoriteState = {
  meta: { page: 1, total_pages: 1, total_results: 2 },
  loaded: true,
  favorites: [1, 2],
};
