import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";


/**NavBar this is displayed when
 * a non connected user is using the 
 * website
 */
const NavBarOther = () => {
    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="container-fluid">
         <Link className="navbar-brand text-white" to="/">Jobboard</Link>
         <button
           className="navbar-toggler navbar-light"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav"
           aria-controls="navbarNav"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
           <ul className="navbar-nav">
             <li className="nav-item">
               <Link className="nav-link text-white"to="/connexion"
                 >Log In</Link>
             </li>
           </ul>
         </div>
       </div>
     </nav>
       </header>
    );
  }
  
  export default NavBarOther;