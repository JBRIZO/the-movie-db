export const mockLoadingState = {
  popular: true,
  topRated: true,
  playingNow: false,
  upcoming: false,
};

export const mockErrorsState = {
  popular: 'errorPopular',
  topRated: 'errorTopRated',
  playingNow: 'errorPlayingNow',
  upcoming: 'errorUpcomint',
};

export const mockIdsState = {
  popular: [1, 2, 3],
  topRated: [4, 5, 6],
  playingNow: [7, 8, 9],
  upcoming: [10, 11, 12],
};

export const mockMetaState = {
  popular: {
    page: 1,
    total_results: 2,
    total_pages: 3,
  },
  topRated: {
    page: 4,
    total_results: 5,
    total_pages: 6,
  },
  playingNow: {
    page: 7,
    total_results: 8,
    total_pages: 9,
  },
  upcoming: {
    page: 10,
    total_results: 11,
    total_pages: 12,
  },
};
