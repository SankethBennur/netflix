import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="fantasy">Fantasy</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link
            to={{pathname:"/watch", movie: content}}
            className="linkTag"
            style={{ textDecoration: 'none' }}
          >
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
