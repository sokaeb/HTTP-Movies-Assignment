import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

const initialMovieDetails = {
    title: "",
    director: "",
    metascore: ""
};

function UpdateMovie(props){
    const [ movieDetails, setMovieDetails ] = useState(initialMovieDetails)
    const { id } = useParams();
    const history = useHistory();

    const inputChange = evt => {
        setMovieDetails({
            ...movieDetails,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios  
        .put(`http://localhost:5000/api/movies/${id}`, movieDetails)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Update Movie Details</h2>
            <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value=""
                        onChange={inputChange}
                        type="text" 
                        placeholder="movie title"
                    />
            
                    <input 
                        name="director"
                        value=""
                        onChange={inputChange}
                        type="text"
                        placeholder="director" 
                    />
 
                    <input 
                        name="metascore"
                        value=""
                        onChange={inputChange}
                        type="text"
                        placeholder="metascore" 
                    />
             
                <button className="update-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;