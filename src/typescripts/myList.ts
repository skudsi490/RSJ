document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});

function displayFavorites(): void {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesContainer: HTMLElement | null = document.getElementById('favorites');
    if (!favoritesContainer) return;

    favoritesContainer.innerHTML = '';

    favorites.forEach((movie, index) => {
        const movieCard: HTMLElement = document.createElement('div');
        movieCard.className = 'movie-card';

        const movieImage: HTMLImageElement = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`;
        movieImage.alt = movie.title || movie.name;

        const movieTitle: HTMLElement = document.createElement('h3');
        movieTitle.textContent = movie.title || movie.name;

        const removeButton: HTMLButtonElement = document.createElement('button');
        removeButton.textContent = 'Remove from Favorites';
        removeButton.onclick = () => removeFromFavorites(index);

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(removeButton);

        favoritesContainer.appendChild(movieCard);
    });
}

function removeFromFavorites(index: number): void {
    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.splice(index, 1); // Removes the movie at the specified index
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Refresh the display
}
