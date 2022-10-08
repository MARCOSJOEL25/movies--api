import React from "react";

const Card = ({ movies, selectedMovie}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  return (
    <div className={"movies_card"} onClick={()=>selectedMovie(movies)}>
      <div>
        {" "}
        {movies.poster_path ? (
          <img
            className="movies_image"
            src={`${IMAGE_PATH}${movies.poster_path}`}
            alt=""
          />
        ) : (
          <div>NO COVER FOUNDED</div>
        )}
        <h5 className="movies_title">{movies.title}</h5>
      </div>
    </div>
  );
};

export default Card;
