import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieVideos } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovieDetails(id);
        const videos = await getMovieVideos(id);

        setMovie(movieData);

        const trailerVideo =
          videos.find(
            (vid) =>
              vid.type === "Trailer" && vid.site === "YouTube"
          ) ||
          videos.find((vid) => vid.site === "YouTube");

        setTrailer(trailerVideo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    
  <div className="movie-details">

    {/* 🎬 Trailer */}
    {trailer ? (
      <div className="trailer-section">
        <div className="trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    ) : (
      <p>No trailer available 🎬</p>
    )}

    {/* 🎥 Movie Info */}
    <div className="movie-info">
      <h1>{movie.title}</h1>

      <div className="movie-meta">
        <span className="rating">⭐ {movie.vote_average}</span>
        <span>{movie.release_date}</span>
      </div>

      <p>{movie.overview}</p>
    </div>

  </div>
);
}

export default MovieDetails;