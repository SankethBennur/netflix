import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import "./featured.scss"
import axios from "../../axios.js";
import { useEffect, useState } from "react";

export default function Featured({type}) {
     const [content, setContent] = useState({});

     useEffect(() => {
          async function getRandomContent(){
               try {
                    const res = await axios.get(`/movie/random?type=${type}`, {
                         headers: {
                              token:
                                   // "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                                   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmFmZDdlZWI3MjdmYTI1MGFmMDg5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTY2OTc1NSwiZXhwIjoxNjQwMTAxNzU1fQ.I4cz2h3EUQAPo1-cOiK2WdoYi3jcPnFW2XcB5FTfA28"
                         },
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
                         <select name="genre" id="genre">
                              <option>Genre</option>
                              <option value="action">Action</option>
                              <option value="adventure">Adventure</option>
                              <option value="drama">Drama</option>
                              <option value="crime">Crime</option>
                              <option value="horror">Horror</option>
                              <option value="romance">Romance</option>
                              <option value="scifi">Sci-fi</option>
                              <option value="thriller">Thriller</option>
                              <option value="animation">Animation</option>
                              <option value="documentaries">Documentaries</option>
                         </select>
                    </div>
               )}

               {/* Title Cover Image */}
               <img width="100%" src={content.img} alt="" />
               
               {/* Logo and Description */}
               <div className="info">
                    <img src={content.imgTitle} alt="" />

                    <span className="desc">
                    Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.
                    </span>

                    <div className="buttons">
                         <button className="play">
                              <PlayArrow />
                              <span>Play</span>
                         </button>
                         <button className="moreInfo">
                              <InfoOutlined />
                              <span>More Info</span>
                         </button>
                    </div>
               </div>
          </div>
     )
}
