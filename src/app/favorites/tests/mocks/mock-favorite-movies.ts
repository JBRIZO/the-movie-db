import { IFavoriteMoviesResponse } from '../../interfaces/favorite-list-response.interface';

export const mockFavoriteMovies: IFavoriteMoviesResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      adult: false,
      backdrop_path: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
      genre_ids: [27, 53],
      id: 663712,
      original_language: 'en',
      original_title: 'Terrifier 2',
      overview:
        "After being resurrected by a sinister entity, Art the Clown returns to Miles County where he must hunt down and destroy a teenage girl and her younger brother on Halloween night.  As the body count rises, the siblings fight to stay alive while uncovering the true nature of Art's evil intent.",
      popularity: 3803.184,
      poster_path: '/b6IRp6Pl2Fsq37r9jFhGoLtaqHm.jpg',
      release_date: '2022-10-06',
      title: 'Terrifier 2',
      video: false,
      vote_average: 7,
      vote_count: 563,
    },
    {
      adult: false,
      backdrop_path: '/8sMmAmN2x7mBiNKEX2o0aOTozEB.jpg',
      genre_ids: [28, 12, 878],
      id: 505642,
      original_language: 'en',
      original_title: 'Black Panther: Wakanda Forever',
      overview:
        'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
      popularity: 3281.982,
      poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      release_date: '2022-11-09',
      title: 'Black Panther: Wakanda Forever',
      video: false,
      vote_average: 7.6,
      vote_count: 347,
    },
  ],
};
