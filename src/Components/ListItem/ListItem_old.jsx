import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import "./listitem.scss"
import { useState } from 'react'

export default function ListItem({index}) {
     const [isHovered, setIsHovered] = useState(false);

     const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

     return (
          <div className="listItem"
               // style={{ left: isHovered && index * 225 - 60 + index * 2.5 }}
               onMouseEnter={function(){setIsHovered(true)}}
               onMouseLeave={function(){setIsHovered(false)}}
          >

          {/* <div className="listItem">           */}
               <img src="https://2l7g9kgsh281akevs49v281d-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/john-wick-2-guns.jpg" alt="" />
               
               {isHovered && (
                    <>
                    <video src={trailer} autoPlay={true} loop />

                    <div className="titleOptions">

                         <div className="icons">
                              <PlayArrow />
                              <Add />
                              <ThumbUpAltOutlined />
                              <ThumbDownAltOutlined />
                         </div>

                         <div className="itemDetails">
                              <span>120 mins</span>
                              <span className="ageLimit">+16</span>
                              <span>2019</span>
                         </div>

                         <div className="description">
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, doloribus deleniti minima impedit nostrum tempora voluptatem mollitia!
                         </div>

                         <div className="genre">Action</div>

                    </div>

                    </>
               )}

          </div>
     )
}
