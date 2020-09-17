import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useParams, useHistory } from "react-router-dom";

function MovieList({ movies }) {
  const history = useHistory();
  
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }

      <div className="add-button"  onClick={() => history.push("/add-movie")}>
        Add New Movie
      </div>
    </div>
  );
}

export default MovieList;
