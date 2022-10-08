import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import Youtube from "react-youtube";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function App() {
  const [ApiData, setApiData] = useState([]);
  const [Search, setSearch] = useState("");
  const [CoverOnlyMovie, setCoverOnlyMovie] = useState([]);
  const [trailerOn, SettrailerOn] = useState(false);

  const API = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const fetchData = async (SearchKey) => {
    const type = SearchKey ? "search" : "discover";
    const data = await axios.get(
      `${API}/${type}/movie?api_key=84818027e746d999c36172430cbdea57&query=${SearchKey}`
    );
    setApiData(data.data.results);
    selectedMovie(data.data.results[0]);
  };

  const fetchMovieYoutube = async (id) => {
    const { data } = await axios.get(
      `${API}/movie/${id}?api_key=84818027e746d999c36172430cbdea57&append_to_response=videos`
    );
    return data;
  };

  const selectedMovie = async (movie) => {
    const data = await fetchMovieYoutube(movie.id);
    console.log(data);
    setCoverOnlyMovie(data);
    window.scrollTo(0, 0)
  };

  const Trailers = (trueOrFalse) => {
    var trailer
    if(trueOrFalse){
       trailer = CoverOnlyMovie.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
    } else {
      trailer = CoverOnlyMovie.videos.results[0]
    }

    return (
      <Modal isOpen={trailerOn} className={"modal-xl"}>
        <ModalHeader>
          <h3>Trailer</h3>
        </ModalHeader>
        <ModalBody>
          <Youtube
            videoId={trailer.key}
            containerClassName={"container__trailer_youtube"}
            opts={{
              width: "100%",
              height: "500px",
              playerVars: {
                controls: 0,
                autoplay: 1
              }
            }}
           
          />
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => SettrailerOn(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  useEffect(() => {
    fetchData(Search);
  }, [Search]);

  const MoviesDesploy = () =>
    ApiData.map((movies) => (
      <Card key={movies.id} movies={movies} selectedMovie={selectedMovie} />
    ));

  const SearchDefautl = (e) => {
    e.preventDefault();
    fetchData(Search);
  };

  return (
    <div className="App">
      <div className={"Search_container"}>
        <div className="titleApp">MyVersionCuevana</div>
        <form onSubmit={SearchDefautl}>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search!°"
          />
          <button type="Submit"> Search </button>
        </form>
      </div>
      <div
        className={"Cover"}
        style={{
          backgroundImage: `url('${IMAGE_PATH}${CoverOnlyMovie.backdrop_path}')`,
        }}
      >
        <div className={"Cover_container"}>
          {CoverOnlyMovie.videos && trailerOn ? Trailers() : null}
          <button onClick={() => SettrailerOn(true)}>Play Trailer</button>
          <h1>{CoverOnlyMovie.title}</h1>
          {CoverOnlyMovie.overview ? <p>{CoverOnlyMovie.overview}</p> : null}
        </div>
      </div>
      <div className={"container"}>{MoviesDesploy()}</div>
    </div>
  );
}

export default App;
