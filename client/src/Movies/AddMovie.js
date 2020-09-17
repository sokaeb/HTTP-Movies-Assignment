import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const initialMovieDetails = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const AddMovie = (props) => {
    const [ movieDetails, setMovieDetails ] = useState(initialMovieDetails)
    const history = useHistory();
    const { id } = useParams();
    const { setMovieList } = props;

    const inputChange = evt => {
        setMovieDetails({
            ...movieDetails,
            [evt.target.name]: evt.target.value
        });
    };

    const postNewMovie = (e) => {
        e.preventDefault();
        const newMovie = {
            id: movieDetails.id,
            title: movieDetails.title,
            director: movieDetails.director,
            metascore: movieDetails.metascore,
            stars: movieDetails.stars
        }

        axios
        .post(`http://localhost:5000/api/movies`, newMovie)
        .then(res => {
            console.log(res)
            setMovieList(res.data);
            history.push("/");
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={postNewMovie}>
                    <input
                        name="title"
                        value={movieDetails.title}
                        onChange={inputChange}
                        type="text" 
                        placeholder="movie title"
                    />
            
                    <input 
                        name="director"
                        value={movieDetails.director}
                        onChange={inputChange}
                        type="text"
                        placeholder="director" 
                    />
 
                    <input 
                        name="metascore"
                        value={movieDetails.metascore}
                        onChange={inputChange}
                        type="text"
                        placeholder="metascore" 
                    />

                    <input 
                        name="stars"
                        value={movieDetails.stars}
                        onChange={inputChange}
                        type="text"
                        placeholder="actors" 
                    />
             
                <button className="add-button">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;