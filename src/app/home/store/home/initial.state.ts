export const loadingInitialState = {
  popular: false,
  topRated: false,
  playingNow: false,
  upcoming: false,
};

export const errorsInitialState = {
  popular: null,
  topRated: null,
  playingNow: null,
  upcoming: null,
};

export const idsInitialState = {
  popular: [],
  topRated: [],
  playingNow: [],
  upcoming: [],
};

export const metaInitialState = {
  popular: {
    page: 1,
    total_results: 0,
    total_pages: 0,
  },
  topRated: {
    page: 1,
    total_results: 0,
    total_pages: 0,
  },
  playingNow: {
    page: 1,
    total_results: 0,
    total_pages: 0,
  },
  upcoming: {
    page: 1,
    total_results: 0,
    total_pages: 0,
  },
};

export type HomeSections = 'popular' | 'topRated' | 'playingNow' | 'upcoming';
