import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import "./featured.scss"

export default function Featured({type}) {
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
               <img width="100%" src="https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2021/10/11175620/squid-game-merch-netflix-hero-1600x900.jpg" alt="" />
               
               {/* Logo and Description */}
               <div className="info">
                    <img src="https://logosarchive.com/wp-content/uploads/2021/10/Squid-Game-logo.png" alt="" />

                    <span className="desc">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat sit magnam iure cumque natus quae cupiditate molestias accusamus alias tempora. Laboriosam possimus numquam ullam omnis aliquam perferendis delectus, accusantium reprehenderit.
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
