import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  // const movie = location.movie;
  const content = null;
  const movie = {
    video: "https://img-9gag-fun.9cache.com/photo/a4E0BWm_460svvp9.webm"
  };
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      {(location.movie || content)
        ? <video className="video" autoPlay progress controls src={movie.video} />
        : <p style={{display: "flex", position: "absolute", textAlign: "center"}}>
          Movie not found. Go
          <Link
            to={{ pathname: "/", movie: content }}
            className="no-movie-found"
          >
            Home
          </Link>
        </p>}
    </div>
  );
}
