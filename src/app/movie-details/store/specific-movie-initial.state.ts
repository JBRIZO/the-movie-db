export const detailsInitialState = {
  loading: false,
  errors: null,
  result: null,
};

export const reviewsInitialState = {
  loading: false,
  errors: null,
  result: [],
};

export const recommendedInitialState = {
  loading: false,
  errors: null,
  result: {
    page: 1,
    total_results: 0,
    total_pages: 0,
    ids: [],
  },
};

export const similarInitialState = {
  loading: false,
  errors: null,
  result: {
    page: 1,
    total_results: 0,
    total_pages: 0,
    ids: [],
  },
};
