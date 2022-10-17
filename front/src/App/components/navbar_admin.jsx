import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { accountService } from "../../_services/account.service";

/**NavBar this is displayed when
 * an Admin is connected
 */
const NavBarAdmin = () => {
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
                <Link className="nav-link text-white" to="/admin"
                  >Manage applications</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile"
                  >Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white button" onClick={() => {accountService.logout(); this.props.setConnected(false)}} to="/connexion"
                  >Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </header>
    );
  }

  export default NavBarAdmin;