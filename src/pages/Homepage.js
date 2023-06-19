import React from "react";
import { auth } from "../firebaseConfig";
import MainNav from "../components/MainNav";
import StartScuttle from "../components/StartScuttle";
import "./Homepage.css"


function Homepage() {

  

 

  const handleLogout = () => {
    auth
      .signOut()
  }
    

  return (
    <div className="homepage-container">
     <MainNav />
     <StartScuttle />
     <button
                    className="btn btn-secondary btn-md"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
    </div>
  );
}

export default Homepage;