export enum FavoriteActionTypes {
  LOAD_FAVORITES = '[Favorites FavoritesResolver] LOAD_USER_FAVORITES',
  LOAD_FAVORITES_SUCESS = '[FavoritesEffects loadFavorites$] LOAD_USER_FAVORITES_SUCCESS',
  LOAD_FAVORITES_FAILURE = '[FavoritesEffects loadFavorites$] LOAD_FAVORITES_FAILURE',
  DELETE_FAVORITE = '[Favorites favorites-preview] DELETE_USER_FAVORITE',
  DELETE_FAVORITE_SUCCESS = '[FavoritesEffects deleteFavorite$] DELETE_FAVORITE_SUCCESS',
  DELETE_FAVORITE_FAILURE = '[FavoritesEffects deleteFavorite$] DELETE_FAVORITE_FAILURE',
  ADD_FAVORITE = '[Favorites detail_page] ADD_FAVORITE',
  ADD_FAVORITE_SUCCESS = '[FavoritesEffects addFavorite$] ADD_FAVORITE_SUCCESS',
  ADD_FAVORITE_FAILURE = '[FavoritesEffects addFavorites$] ADD_FAVORITES_FAILURE',
}
