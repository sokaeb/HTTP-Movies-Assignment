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

const UpdateMovie = (props) => {
    const [ movieDetails, setMovieDetails ] = useState(initialMovieDetails)
    const { id } = useParams();
    const history = useHistory();

    const inputChange = evt => {
        setMovieDetails({
            ...movieDetails,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        axios  
        .put(`http://localhost:5000/api/movies/${id}`, movieDetails)
        .then(res => {
            setMovieDetails(res.data);
            history.push(`/`);
        })
        .catch(err => {
            console.log(err)
        });
    };

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
        })
    })

    return (
        <div>
            <h2>Update Movie Details</h2>
            <form onSubmit={handleSubmit}>
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
                        name="actors"
                        value={movieDetails.stars}
                        onChange={inputChange}
                        type="text"
                        placeholder="actors" 
                    />
             
                <button className="update-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;