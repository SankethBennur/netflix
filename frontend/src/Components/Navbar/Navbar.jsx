import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
     const [isScrolled, setIsScrolled] = useState(false);
     
     window.onscroll = function(){
          setIsScrolled(window.pageYOffset === 0? false : true);
          return(function(){
               window.onscroll = null;
          });
     };
     
     console.log(isScrolled);

     return (
          <div className= {isScrolled? "navbar scrolled":"navbar"}>  {/* Changing the className based on a condition, Smart. */}
               <div className="container">
                    <div className="left">
                         <img src="https://pngimg.com/uploads/netflix/netflix_PNG8.png" alt="" />

                    <Link to="/" className="linkTag">
                    <span>Home</span>
                    </Link>

                    <Link to="/movies" className="linkTag">
                    <span>Movies</span>
                    </Link>

                    <Link to="/series" className="linkTag">
                    <span>TV Shows</span>
                    </Link>

                    <Link className="linkTag">
                    <span>Trending</span>
                    </Link>

                    <Link className="linkTag">
                    <span>My List</span>
                    </Link>

                    </div>

                    <div className="right">
                         <Search className="icon"/>
                         <span>KIDS</span>
                         <Notifications className="icon"/>
                         <img src="https://data.whicdn.com/images/346206863/original.jpg" alt="" />
                         
                         <div className="profileDropDown">
                              <ArrowDropDown className="icon"/>
                              <div className="options">
                                   <span>Settings</span>
                                   <span>Logout</span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Navbar