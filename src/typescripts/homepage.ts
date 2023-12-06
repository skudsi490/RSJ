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

    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.insertAdjacentElement('afterend', welcomeMessage);
    }

      
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
            });
        }

        function logoutUser(): void {
            localStorage.removeItem('currentUserData');
            window.location.href = '/pages/Login.html'; 
        }

    fetchCategoryMovies('trending', 'trending/movie/day');
    fetchCategoryMovies('top-rated', 'movie/top_rated');
    fetchCategoryMovies('popular-series', 'tv/popular');
});

function fetchCategoryMovies(containerId: string, endpoint: string): void {
    const apiKey: string = '617e353f14d2859c113fd73123a1765b';
    const url: string = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;

    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data: any = JSON.parse(xhr.responseText);
            displayMovies(containerId, data.results);
        } else {
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = () => {
        console.error('Network error');
    };
    xhr.send();
}


function displayMovies(containerId: string, movies: any[]): void {
    const moviesContainer: HTMLElement | null = document.getElementById(containerId);
    if (!moviesContainer) return;

    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard: HTMLElement = document.createElement('div');
        movieCard.className = 'movie-card';

        const movieImage: HTMLImageElement = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`;
        movieImage.alt = movie.title || movie.name;
        movieImage.onerror = () => console.error("Image failed to load:", movieImage.src);

        const movieTitle: HTMLElement = document.createElement('h3');
        movieTitle.textContent = movie.title || movie.name;

        const addToFavoritesBtn: HTMLButtonElement = document.createElement('button');
        addToFavoritesBtn.textContent = 'Add to Favorites';
        addToFavoritesBtn.onclick = () => addToFavorites(movie);

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(addToFavoritesBtn);

        moviesContainer.appendChild(movieCard);
    });
}

function addToFavorites(movie: any): void {
    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some(favMovie => favMovie.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
