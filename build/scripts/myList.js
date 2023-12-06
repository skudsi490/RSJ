"use strict";
document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesContainer = document.getElementById('favorites');
    if (!favoritesContainer)
        return;
    favoritesContainer.innerHTML = '';
    favorites.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`;
        movieImage.alt = movie.title || movie.name;
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title || movie.name;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Favorites';
        removeButton.onclick = () => removeFromFavorites(index);
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(removeButton);
        favoritesContainer.appendChild(movieCard);
    });
}
function removeFromFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}
