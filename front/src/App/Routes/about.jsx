import React from "react";

class About extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Publisher</h1>
            <p>Sportelli Paolo</p>
            <p>
              <a href="mailto:trusgnach.arthur@gmail.com">
                paolo.sportelli@epitech.eu
              </a>
            </p>
            <p>Trusgnach Arthur</p>
            <p>
              <a href="mailto:trusgnach.arthur@gmail.com">
                arthur.trusgnach@epitech.eu
              </a>
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Host</h1>
            <p>For the moment it's local host</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">
             Processing of personal data and use of cookies.
            </h1>
            <p>
            The site uses localstorage to store data essential to the good functioning of the site.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export { About };
