const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ba856e4a44mshb848a6e9d58ec67p139d1fjsndc348c8d4142',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

async function fetchMovies() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayMovies(result);
    } catch (error) {
        console.error(error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';
    let row;
    movies.forEach((movie, index) => {
        if (index % 4 === 0) {
            row = document.createElement('div');
            row.classList.add('movie-row');
            moviesContainer.appendChild(row);
        }
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rank">Rank: ${movie.rank}</div>
        `;
        movieElement.addEventListener('click', () => openMovieDetails(movie));
        row.appendChild(movieElement);
    });
}

function openMovieDetails(movie) {
    const movieDetails = `
        <html>
        <head>
            <title>${movie.title} - Details</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                .movie-details {
                    text-align: center;
                }
                .movie-details img {
                    width: 200px;
                    height: auto;
                    border-radius: 5px;
                }
                .movie-details h2 {
                    margin: 20px 0 10px;
                }
                .movie-details p {
                    font-size: 16px;
                    color: #333;
                }
                .movie-details .genre, .movie-details .rating, .movie-details .year {
                    margin-top: 10px;
                    font-size: 14px;
                    color: #777;
                }
                .movie-details a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .movie-details a:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="movie-details">
                <img src="${movie.big_image}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <div class="genre">Genre: ${movie.genre.join(', ')}</div>
                <div class="rating">Rating: ${movie.rating}</div>
                <div class="year">Year: ${movie.year}</div>
                <a href="${movie.imdb_link}" target="_blank">View on IMDb</a>
            </div>
        </body>
        </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(movieDetails);
    newWindow.document.close();
}

fetchMovies();
