export default {
  saveFavorite(fave) {
    const favoriteStr = JSON.stringify(fave);
    localStorage.setItem('favoriteProduct', favoriteStr);
  },
  getFavorite() {
    return JSON.parse(localStorage.getItem('favoriteProduct'));
  },
};
