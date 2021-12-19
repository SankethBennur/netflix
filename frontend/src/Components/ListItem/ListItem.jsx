import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import "./listitem.scss"
import { useState, useEffect } from 'react'
import axios from "../../axios.js"
import { Link } from "react-router-dom";

export default function ListItem({index, item}) {  // the list items fetched are list of object ids
     const [isHovered, setIsHovered] = useState(false);
     const [movie, setMovie] = useState({});

     useEffect(() => {
          async function getMovie(){
               try {
                    const res = await axios.get("/movie/find/" + item, {
                         // headers: {
                         //      token:
                         //           // ""
                         //           "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                         //           // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmFmZDdlZWI3MjdmYTI1MGFmMDg5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTY2OTc1NSwiZXhwIjoxNjQwMTAxNzU1fQ.I4cz2h3EUQAPo1-cOiK2WdoYi3jcPnFW2XcB5FTfA28"
                         // },
                    });
                    setMovie(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          getMovie();
     }, [item]);

     const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"

     
     return (
          <Link to={{pathname:"/watch", movie: movie}}>
               {/* in the to property of Link, we pass an object */}
               <div className="listItem"
                    onMouseEnter={function(){setIsHovered(true)}}
                    onMouseLeave={function(){setIsHovered(false)}}>

                    <img src={movie.imgThumbnail} alt="" />

                    {isHovered && (
                         <>
                         <div className="titleOptions">
                              <div className="genre">{movie.title}</div>
          
                              <div className="icons">
                                   <PlayArrow />
                                   <Add />
                                   <ThumbUpAltOutlined />
                                   <ThumbDownAltOutlined />
                              </div>
          
                              <div className="itemDetails">
                                   <span>120 mins</span>
                                   <span className="ageLimit">+{movie.ageLimit}</span>
                                   <span>{movie.year}</span>
                              </div>
          
                              <div className="description">
                                   {movie.desc}
                              </div>
          
          
                         </div>
                         
                         <video src={movie.trailer} autoPlay={true} loop />
                         </>
                    )}

               </div>
          </Link>
     );
}
