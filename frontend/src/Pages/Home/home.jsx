import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(async () => {
    const getRandomLists = async () => {
      try {
        const res = await axios.
          get(`https://us-central1-nf-clone-server-app.cloudfunctions.net/api/api/lists${type ? "?type=" + type : ""}${
              genre ? "&genre=" + genre : ""
            }`,
            {
              headers: {
                'Content-Type': 'application/json',
                token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              },
            }
          ).then((response) => {
            console.log("response");
            console.log(response);
            setLists(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    await getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
