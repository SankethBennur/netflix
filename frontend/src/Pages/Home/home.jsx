import Featured from "../../Components/Featured/Featured";
import Lists from "../../Components/List/Lists.jsx";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import { useState, useEffect } from "react";
import axios from '../../axios.js';

function Home({user, type}) {   // Home is being 'filtered' with type property and also being used for Movies and TV Shows page

     const [lists, setLists] = useState([]);
     const [genre, setGenre] = useState(null);
     
     useEffect(() => {   // when landing on Home page, verify the query in the URL
          async function getRandomLists(){
               try {   // Aggregate Items
                    const res = await axios.get(
                         `list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                         {
                              // headers: {   // fetch header from HTTP Request message packet
                              //      token:
                              //           ""
                              //           // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmFmZDdlZWI3MjdmYTI1MGFmMDg5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTcyMDM3MywiZXhwIjoxNjQwMTUyMzczfQ.VpNNF2Dis7Ce0i45s-zqAYWgabBNzPHJzc9jEifGljI"
                              //           // "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                              // },
                         }
                    );
                    // console.log(res.data)
                    setLists(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          getRandomLists();
     }, [type, genre]);

     // console.log(user);
     
     return (
          <div className="home">
               {/* Header */}
               <Navbar user={user}/>  {/* Pass Property user to allow guest into home page */}

               {/* Body */}
               <Featured type={type} setGenre={setGenre} />  {/* No need to call useEffect Hook, we can set Featured based on selected 'type' */}

               {lists.map((listObj) => (
                    <Lists list={listObj} />
               ))}

          </div>
     )
}

export default Home
