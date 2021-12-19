import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import "./featured.scss"
import axios from "../../axios.js";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Featured({type, setGenre}) {
     const [content, setContent] = useState({});

     useEffect(() => {
          async function getRandomContent(){
               try {
                    const res = await axios.get(`/movie/random?type=${type}`, {
                         // headers: {
                         //      token:
                         //           // ""
                         //           "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                         //           // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmFmZDdlZWI3MjdmYTI1MGFmMDg5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTY2OTc1NSwiZXhwIjoxNjQwMTAxNzU1fQ.I4cz2h3EUQAPo1-cOiK2WdoYi3jcPnFW2XcB5FTfA28"
                         // },
                    });
                    setContent(res.data[0]);
               }
               catch(err){
                    console.log(err);
               }
          };
          getRandomContent();
     }, [type]);
     

     return (
          <div className="featured">
               {type && (
                    <div className="category">
                         <span> {type === "movies" ? "Movies" : "TV Shows"} </span>
                         <select name="genre" id="genre" onChange={(e)=>setGenre(e.target.value)}>
                              <option>Genre</option>
                              <option value="action">Action</option>
                              <option value="fantasy">Fantasy</option>
                              <option value="comedy">Comedy</option>
                              <option value="horror">Horror</option>
                              <option value="thriller">Thriller</option>
                         </select>
                    </div>
               )}

               {/* Title Cover Image */}
               <img width="100%" src={content.img} alt="" />
               
               {/* Logo and Description */}
               <div className="info">
                    <img src={content.imgTitle} alt="" />

                    <span className="desc">{content.desc}
                    </span>

                    <div className="buttons">
                         <Link to={{pathname:"/watch", movie: content}} className="linkTag" >
                         {/* <Link> */}
                              <button className="play">
                                   <PlayArrow />
                                   <span>Play</span>
                              </button>
                         </Link>
                              <button className="moreInfo">
                                   <InfoOutlined />
                                   <span>More Info</span>
                              </button>
                    </div>
               </div>
          </div>
     )
}
