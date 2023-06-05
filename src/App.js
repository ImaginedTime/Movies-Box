import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = "http://www.omdbapi.com?i=tt3896198&apikey=6cf43155";

function App() {

	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = response.json();
		data.then((res) => setMovies(res.Search));
	};

	const searchEnterKey = (e) => {
		if (e.key === 'Enter') {
			searchMovies(searchValue);
		}
	};

	useEffect(() => {
		searchMovies("batman");
	}, []);

	return (
		<div className="app">
			<h1>Movies Box</h1>
			<div className="search">
				<input
					type="text"
					placeholder='Search for movies'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={searchEnterKey}
				/>

				<img
					type='text'
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchValue)} />
			</div>


			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))};
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}

		</div>
	);
}

export default App;
