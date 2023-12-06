"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const currentUserDataString = localStorage.getItem('currentUserData');
    let userName = 'Guest';
    if (currentUserDataString) {
        const currentUserData = JSON.parse(currentUserDataString);
        const { fname, lname } = currentUserData;
        userName = `${fname} ${lname}`;
    }
    const welcomeMessage = document.createElement('p');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.textContent = `Welcome back ${userName}. What would you like to watch today?`;
    document.body.insertBefore(welcomeMessage, document.body.firstChild);
    fetchCategoryMovies('trending', 'trending/movie/day');
    fetchCategoryMovies('top-rated', 'movie/top_rated');
    fetchCategoryMovies('popular-series', 'tv/popular');
});
function fetchCategoryMovies(containerId, endpoint) {
    const apiKey = '617e353f14d2859c113fd73123a1765b';
    const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayMovies(containerId, data.results);
        }
        else {
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = () => {
        console.error('Network error');
    };
    xhr.send();
}
function displayMovies(containerId, movies) {
    const moviesContainer = document.getElementById(containerId);
    if (!moviesContainer)
        return;
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`;
        movieImage.alt = movie.title || movie.name;
        movieImage.onerror = () => console.error("Image failed to load:", movieImage.src);
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title || movie.name;
        const addToFavoritesBtn = document.createElement('button');
        addToFavoritesBtn.textContent = 'Add to Favorites';
        addToFavoritesBtn.onclick = () => addToFavorites(movie);
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(addToFavoritesBtn);
        moviesContainer.appendChild(movieCard);
    });
}
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some(favMovie => favMovie.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
