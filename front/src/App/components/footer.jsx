import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
/** Footer of the website
 */
const Footer = () => {
  return (
    <footer className=" foot text-center text-lg-start bg-dark mt-auto">
      <section className="">
        <div className="container text-center text-lg-start lg-5 text-white">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About :</h6>
              <p>
                <Link to="/about" className="text-reset">
                Cookie policy
                </Link>
              </p>
              <p>
                <Link to="/about" className="text-reset">
                Legal information and credits
                </Link>
              </p>
              <p>
                <Link to="/about" className="text-reset">
                Privacy Policy
                </Link>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links :</h6>
              <p>
                <Link to="/" className="text-reset">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/connexion" className="text-reset">
                  Log In
                </Link>
              </p>
              <p>
                <Link to="/inscription" className="text-reset">
                  Register
                </Link>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact :</h6>
              <p>
                <i>Address</i>
              </p>
              <p>
                <i>Mail adress</i>
              </p>
              <p>
                <i>Phone number</i> 
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
