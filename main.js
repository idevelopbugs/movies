/*  
	This is an IIFE that uses the Revealing Module Pattern. 
	All functions inside it are private and at the end of the IIFE
	we return public functions that refer to the private ones.
	This way we gain control of what goes in and what goes out.

	Note: Everything runs in console, and is not connected to any html
*/

const movieDb = (function(){
    const movies = [
    {
        title: 'The Lobster',
        year: 2015,
        genres: ['Comedy', 'Drama', 'Sci-Fi'],
        ratings: [5, 4, 5, 5]
    },
    {
        title: 'Nyckeln till frihet',
        year: 1995,
        genres: ['Crime', 'Drama'],
        ratings: [8, 5]
    },
    {
        title: 'The Shining',
        year: 1980,
        genres: ['Horror', 'Drama'],
        ratings: [2, 4, 7, 4]
    },
    {
        title: 'The Dark Knight',
        year: 2008,
        genres: ['Action', 'Crime', 'Drama'],
        ratings: [6, 4]
    },
    {
        title: 'Inception',
        year: 2010,
        genres: ['Action', 'Sci-Fi'],
        ratings: [5, 9, 4]
    },
    {
        title: 'Interstellar',
        year: 2014,
        genres: ['Drama', 'Sci-Fi'],
        ratings: [7, 9, 5, 10]
    },
    {
        title: 'Alien',
        year: 1979,
        genres: ['Sci-Fi'],
        ratings: [8, 9, 7, 5]
    },
    {
        title: 'The Wolverine',
        year: 2017,
        genres: ['Action', 'Drama', 'Sci-Fi'],
        ratings: [5, 9, 4]
    },
    {
        title: 'Junction 48',
        year: 2017,
        genres: ['Action', 'Crime', 'Drama'],
        ratings: [8, 4, 6, 10, 7, 4, 5]
    },
    {
        title: 'The Last Word',
        year: 2017,
        genres: ['Comedy'],
        ratings: [7, 8, 10]
    },
    {
        title: 'Prevenge',
        year: 2016,
        genres: ['Comedy', 'Horror'],
        ratings: [5, 9, 4]
    },
    {
        title: 'The non rated movie',
        year: 2017,
        genres: ['Comedy'],
        ratings: []
    }
    ];

    const movieArr = [];

    // Maps the movies and pushes them to an empty array
    function getMovies(){
        movies.map((movies) => {
        	//sends every ratingarray to the avgRating function
        	movies.ratings = avgRating(movies.ratings);
    	    movieArr.push(movies.title, movies.year, movies.genres, movies.ratings);
        	return movies;
        });
        return movieArr;   
    }
	
    // Takes the ratingsarray as a param, then maps and reduces it to the average number with one decimal.
    function avgRating(array){
    	if (array.length != 0) {
	        return array
	            .map((a) => a / array.length)
	            .reduce((a, b) => a + b).toFixed(1);
        }     	
    }

    // Filters array for the movie and adds the rating.
    function rateMovie(movie, rating){
        let obj = movies.filter(m => m.title === movie);
        obj[0].ratings.push(rating);
    }

    // Filters the array by year set in param, then returns it.
    function getMoviesThisYear(year){
        return movies
            .filter(m => m.year === year)
            .map((movies) => {
                return `
                        ${movies.title}
                        ${movies.year}
                        ${movies.genres}
                        ${movies.ratings}

                       `
                });                                       
    }

 	// Filters movies by genre using 'some' function to match paramvalue on genres array.
    function getMoviesByGenre(genre, genre2, genre3){
        return movies
            .filter(m => m.genres.some((val) => val == genre || val == genre2 || val == genre3))
            .map((movies) => {
                return `
                        ${movies.title}
                        ${movies.year}
                        ${movies.genres}
                        ${movies.ratings}

                       `
                });             	              
    }

    // Using a constructor function to create the movie object. 
	function MovieConst(title, year, genres, ratings){
	  this.title = title;              
	  this.year = year;     
	  this.genres = [genres];
	  this.ratings = [ratings]; 
	}

	// This function shoves the params into our new movie object, 
	// then pushes it into the moviearray.
	function addMovie(title, year, genres, ratings){
		let newMovie = new MovieConst(title, year, genres, ratings);
		movies.push(newMovie);
	}

	// Filters movies without a rating then gets the movie with highest rating using reduce to compare ratings.
	function getTopRatedMovie(){
		return movies
			.filter( (a) => a.ratings != undefined)
			.reduce( (a, b) => a.ratings > b.ratings ? a : b);
	}

	function getWorstRatedMovie(){
		return movies
		.filter( (a) => a.ratings != undefined)
		.reduce( (a, b) => a.ratings < b.ratings ? a : b);
	}

    //Public functions
    return {
    	createMovie: addMovie,
        getArray: getMovies,
        rate: rateMovie,
        byYear: getMoviesThisYear,
        byGenre: getMoviesByGenre,      
        byTopRated: getTopRatedMovie,
        byWorstRated: getWorstRatedMovie
    }

})();
//initiates


movieDb.getArray();
console.log(movieDb.byYear(2017).toString());
//movieDb.rate('Interstellar', 10);
//movieDb.createMovie('Smurfarna: Den försvunna byn', 2017, 'Comedy', 10);


//movieDb.getArray();
//console.log(movieDb.byGenre('Horror', 'Sci-Fi').toString());

//console.log(movieDb.byTopRated());
//console.log(movieDb.byWorstRated());


