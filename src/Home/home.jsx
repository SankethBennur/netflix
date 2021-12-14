import Featured from "../Components/Featured/Featured"
import Lists from "../Components/List/Lists.jsx"
import Navbar from "../Components/Navbar/Navbar"
import "./home.scss"

function Home() {
     return (
          <div className="home">
               {/* Header */}
               <Navbar />

               {/* Body */}
               <Featured />
               <Lists />
               <Lists />
               <Lists />
               <Lists />
               <Lists />
               <Lists />
               
               {/* Footer */}
          </div>
     )
}

export default Home
