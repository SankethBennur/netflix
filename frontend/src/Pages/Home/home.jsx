import Featured from "../../Components/Featured/Featured";
import Lists from "../../Components/List/Lists.jsx";
import Navbar from "../../Components/Navbar/Navbar";
import "./home.scss";
import { useState, useEffect } from "react";
import axios from '../../axios.js';

function Home({type}) {
     const [lists, setLists] = useState([]);
     const [genre, setGenre] = useState(null);
     
     useEffect(() => {
          async function getRandomLists(){
               try {
                    const res = await axios.get(
                         `list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
                         }`,
                         {
                              headers: {   // fetch header from HTTP Request message packet
                                   token:
                                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmFmZDdlZWI3MjdmYTI1MGFmMDg5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTcyMDM3MywiZXhwIjoxNjQwMTUyMzczfQ.VpNNF2Dis7Ce0i45s-zqAYWgabBNzPHJzc9jEifGljI"
                                        // "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                              },
                         }
                    );
                    console.log(res.data)
                    setLists(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          getRandomLists();
     }, [type, genre]);
     
     return (
          <div className="home">
               {/* Header */}
               <Navbar />

               {/* Body */}
               <Featured type={type} />

               {lists.map((listObj) => (
                    <Lists list={listObj} />
               ))}

          </div>
     )
}

export default Home
