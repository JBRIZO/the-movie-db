import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { clearSearch, searchStart, searchSuccess } from './search.actions';
import { SearchActionTypes } from './search.types';

describe('Specific Search Actions', () => {
  describe('Details', () => {
    it('should  search start', () => {
      const query = {
        page: 1,
        query: 'query',
      };
      const action = searchStart({ payload: query });
      expect(action.type).toEqual(SearchActionTypes.SEARCH_START);
      expect(action.payload).toEqual(query);
    });

    it('should  search success', () => {
      const query = {
        page: 1,
        query: 'query',
      };
      const action = searchSuccess({ payload: mockMoviesResponse });
      expect(action.type).toEqual(SearchActionTypes.SEARCH_SUCCESS);
      expect(action.payload).toEqual(mockMoviesResponse);
    });

    it('should clear search', () => {
      const action = clearSearch();
      expect(action.type).toEqual(SearchActionTypes.CLEAR_SEARCH);
    });
  });
});
