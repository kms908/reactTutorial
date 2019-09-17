import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
    // Render: componentWillMount() -> render() -> componentDidMount()
    // Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> component

    state = {}

    componentDidMount(){        
        this._getMovies();
    }

    _renderMovies = () => {
        return this.state.movies.map((movie) => {
            return <Movie 
                title={movie.title_english} 
                poster={movie.medium_cover_image} 
                key={movie.id} 
                genres={movie.genres}
                synopsis={movie.synopsis}
            />
        })
    }

    _getMovies = async () => {
        const movies = await this._callApi();
        console.log(movies);
        this.setState({
            movies: movies
        })
    }

    _callApi = () => {
        return fetch('/api/v2/list_movies.json?sort_by=rating')
        .then(response => response.json())
        .then(json => json.data.movies)
        .catch(err => console.log(err))
    }

    render() {
        const {movies} = this.state;
        return (
            <div className={movies ? "App" : "App--loading"}>
                {movies ? this._renderMovies() : 'Loading'}
            </div>
        )
    }
}

export default App;
