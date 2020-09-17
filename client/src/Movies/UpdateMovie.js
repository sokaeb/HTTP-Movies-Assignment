import React, { useEffect, useState } from "react";
import axios from "axios";
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
    const { setMovieList, movieList } = props;

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
            // console.log('res', res)
            // console.log('movie deets', movieDetails)
            // console.log('movieList should be array', movieList)
            setMovieList(movieList.map((item) => {
                if(item.id == id) {
                    return movieDetails
                } else {
                    return item
                }
            }))
            history.push("/");
        })
        .catch(err => {
            console.log(err)
        });
    };


    // this makes the movieDetails form populate with the original movie details
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovieDetails(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

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
                        name="stars"
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