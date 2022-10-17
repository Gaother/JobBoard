import React from "react";
import { Link } from "react-router-dom";
import "../css/formulaire.css";
import axios from "axios";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.ListofJob = this.ListofJob.bind(this);
    this.ListofUser = this.ListofUser.bind(this);
    this.ListofComp = this.ListofComp.bind(this);
    this.AddJob = this.AddJob.bind(this);
    this.remove = this.remove.bind(this);
    this.state = {
      isAdmin: false,
      count: 2,
      message: null,
      update: null,
    };
  }
  /** function work when component is mount
   */
  componentDidMount() {
    this.verify();
    this.getjob();
    this.getcomp();
    this.getuser();
  }

/**function to verify the token 
   */
 verify() {
  return new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:5000/verify", {
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        resolve(response.data);
        this.setState({ isAdmin: response.data.isAdmin });
        this.setState({ isConnected: true });
      })
      .catch((error) => {
        resolve(error);
      });
  });
}





  /** Fetch all job data from the databases
   */
  getjob() {
    const url = "http://127.0.0.1:5000/getjobAd";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data });
      });
  }
  /** Fetch all user data from the databases
  */
  getuser() {
    const url = "http://127.0.0.1:5000/getuser";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ user: data });
      });
  }
  /** Fetch all companies data from the databases
   */
  getcomp() {
    const url = "http://127.0.0.1:5000/getcomp";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ comp: data });
      });
  }
  /** Display all job data with button remove and update
   */
  ListofJob() {
    if (this.state.data != null) {
      const jobs = this.state.data.map((job) => {
        return (
          <tbody key={job.id}>
            <tr id={job.id}>
              <td>{job.title}</td>
              <td>{job.compagnies}</td>
              <td>{job.date}</td>
              <td>
                <button
                  aria-expanded="false"
                  data-toggle="collapse"
                  data-target={"#up_" + job.id}
                  className = "btn btn-dark"
                >
                  Update
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => this.remove(0, job.id)}>Remove</button>
              </td>
            </tr>
            <tr id={"up_" + job.id} className="collapse">
              <td>
                <div className="row">
                  <label htmlFor="id">Id</label>
                  <input
                    type="text"
                    id={"up_id" + job.id}
                    name="title"
                    disabled
                    defaultValue={job.id}
                  />

                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id={"up_title" + job.id}
                    name="title"
                    defaultValue={job.title}
                  />

                  <label htmlFor="compagnies">Compagnies</label>
                  <input
                    type="text"
                    id={"up_compagnies" + job.id}
                    name="compagnies"
                    defaultValue={job.compagnies}
                  />

                  <label htmlFor="compagnies">City</label>
                  <input
                    type="text"
                    id={"up_city" + job.id}
                    name="city"
                    defaultValue={job.city}
                  />

                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id={"up_type" + job.id}
                    name="type"
                    defaultValue={job.type}
                  />

                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    id={"up_date" + job.id}
                    name="date"
                    defaultValue={job.date}
                  />

                  <label htmlFor="title">Description</label>
                  <textarea
                    id={"up_description" + job.id}
                    name="description"
                    defaultValue={job.description}
                  />

                  <label htmlFor="salary">Salary</label>
                  <input
                    type="text"
                    id={"up_salary" + job.id}
                    name="salary"
                    defaultValue={job.salary}
                  />

                  <button
                    className="mt-2 btn btn-dark"
                    onClick={() => this.SendUpdate(0, job.id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        );
      });

      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Compagnies</th>
              <th scope="col">Date </th>
              <th scope="col">Update</th>
              <th scope="col">Remove </th>
            </tr>
          </thead>
          {jobs}
        </table>
      );
    }
  }
  /**Display all user data with button remove and update
   */
  ListofUser() {
    if (this.state.user != null) {
      const jobs = this.state.user.map((user) => {
        return (
          <tbody key={user.id}>
            <tr id={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.date}</td>
              <td>
                <button
                  aria-expanded="false"
                  data-toggle="collapse"
                  data-target={"#us_" + user.id}
                  className = "btn btn-dark"
                >
                  Update
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => this.remove(1, user.id)}>Remove</button>
              </td>
            </tr>
            <tr id={"us_" + user.id} className="collapse">
              <td>
                <div className="row">
                  <label htmlFor="id">Id</label>
                  <input
                    type="text"
                    id={"us_id" + user.id}
                    name="title"
                    disabled
                    defaultValue={user.id}
                  />

                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id={"us_firstName" + user.id}
                    name="firstName"
                    defaultValue={user.firstName}
                  />

                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id={"us_lastName" + user.id}
                    name="lastName"
                    defaultValue={user.lastName}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id={"us_email" + user.id}
                    name="email"
                    defaultValue={user.email}
                  />

                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id={"us_phone" + user.id}
                    name="phone"
                    defaultValue={user.phone}
                  />

                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    id={"us_date" + user.id}
                    name="date"
                    defaultValue={user.date}
                  />

                  <button
                    className="mt-2 btn btn-dark"
                    onClick={() => this.SendUpdate(1, user.id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        );
      });

      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col"> First name</th>
              <th scope="col"> Last name</th>
              <th scope="col">Email </th>
              <th scope="col"> Phone</th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          {jobs}
        </table>
      );
    }
  }
  /**Display all companies data with button remove and update
   */
  ListofComp() {
    if (this.state.comp != null) {
      const jobs = this.state.comp.map((comp) => {
        return (
          <tbody key={comp.id}>
            <tr id={comp.id}>
              <td>{comp.name}</td>
              <td>{comp.city}</td>
              <td>{comp.sector}</td>
              <td>{comp.link}</td>
              <td>
                <button
                  aria-expanded="false"
                  data-toggle="collapse"
                  data-target={"#com_" + comp.id}
                  className = "btn btn-dark"
                >
                  Update
                </button>
              </td>
              <td>
                <button className = "btn btn-danger" onClick={() => this.remove(2, comp.id)}>Remove</button>
              </td>
            </tr>
            <tr id={"com_" + comp.id} className="collapse">
              <td>
                <div className="row">
                  <label htmlFor="id">Id</label>
                  <input
                    type="text"
                    id={"com_id" + comp.id}
                    name="id"
                    disabled
                    defaultValue={comp.id}
                  />

                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id={"com_name" + comp.id}
                    name="name"
                    defaultValue={comp.name}
                  />

                  <label htmlFor="sector">Sector </label>
                  <input
                    type="text"
                    id={"com_sector" + comp.id}
                    name="sector"
                    defaultValue={comp.sector}
                  />

                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id={"com_city" + comp.id}
                    name="city"
                    defaultValue={comp.city}
                  />

                  <label htmlFor="link">Link</label>
                  <input
                    type="text"
                    id={"com_link" + comp.id}
                    name="link"
                    defaultValue={comp.link}
                  />

                  <button
                    className="mt-2 btn btn-dark"
                    onClick={() => this.SendUpdate(2, comp.id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        );
      });

      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">Sector </th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          {jobs}
        </table>
      );
    }
  }
  /** Get all data in input file to create a new job 
   */
  AddJob() {
    var title = document.getElementById("title").value;
    var compagnies = document.getElementById("compagnies").value;
    var city = document.getElementById("city").value;
    var type = document.getElementById("type").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("description").value;
    var salary = document.getElementById("salary").value;

    var data = {
      title: title,
      compagnies: compagnies,
      city: city,
      type: type,
      date: date,
      description: description,
      salary: salary,
    };

    const url = "http://127.0.0.1:5000/addjob";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },

      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.getjob();
      });
  }
  /** Send the data update to the back 
   * @param  {int} who
   * @param  {int} who_id
   */
  SendUpdate(who, who_id) {
    switch (who) {
      case 0:
        var id = document.getElementById("up_id" + who_id).value;
        var title = document.getElementById("up_title" + who_id).value;
        var compagnies = document.getElementById(
          "up_compagnies" + who_id
        ).value;
        var city = document.getElementById("up_city" + who_id).value;
        var type = document.getElementById("up_type" + who_id).value;
        var date = document.getElementById("up_date" + who_id).value;
        var description = document.getElementById(
          "up_description" + who_id
        ).value;
        var salary = document.getElementById("up_salary" + who_id).value;

        var data = {
          token: localStorage.getItem("token"),
          who: who,
          id: id,
          title: title,
          compagnies: compagnies,
          city: city,
          type: type,
          date: date,
          description: description,
          salary: salary,
        };
        break;
      case 1:
        id = document.getElementById("us_id" + who_id).value;
        var firstName = document.getElementById("us_firstName" + who_id).value;
        var lastName = document.getElementById("us_lastName" + who_id).value;
        var email = document.getElementById("us_email" + who_id).value;
        var phone = document.getElementById("us_phone" + who_id).value;
        date = document.getElementById("us_date" + who_id).value;

        data = {
          token: localStorage.getItem("token"),
          who: who,
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          date: date,
        };
        break;
      case 2:
        id = document.getElementById("com_id" + who_id).value;
        var name = document.getElementById("com_name" + who_id).value;
        var sector = document.getElementById("com_sector" + who_id).value;
        city = document.getElementById("com_city" + who_id).value;
        var link = document.getElementById("com_link" + who_id).value;

        data = {
          token: localStorage.getItem("token"),
          who: who,
          id: id,
          name: name,
          sector: sector,
          city: city,
          link: link,
        };
        break;
      default:
        console.log("error");
    }

    const url = "http://127.0.0.1:5000/upjob";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },

      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.getjob();
        this.getcomp();
        this.getuser();
      });
  }
  /**send id to the back to remove a user, job or compagnies
   * @param  {int} type
   * @param  {int} id
   */
  remove(type, id) {
    var data = { type: type, id: id };

    const url = "http://127.0.0.1:5000/remjob";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: localStorage.getItem("token"),
      },

      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
        this.getjob();
        this.getcomp();
        this.getuser();
      });
  }
  /**Render function 
   */
  render() {
    if(this.state.isAdmin){
    return (
      
      <main>
        <Link
          className="btn btn-secondary mt-2 mb-2"
          role="button"
          aria-expanded="false"
          data-toggle="collapse"
          data-target="#create"
        >
          New
        </Link>

        <div id="create" className="collapse">
          <div className="row">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="compagnies">Compagnies</label>
            <input type="text" id="compagnies" name="compagnies" />
            <label htmlFor="compagnies">City</label>
            <input type="text" id="city" name="city" />
            <label htmlFor="type">Type</label>
            <input type="text" id="type" name="type" />
            <label htmlFor="date">Date</label>
            <input type="text" id="date" name="date" />
            <label htmlFor="title">Description</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="salary">Salary</label>
            <input type="text" id="salary" name="salary" />
            <button className="btn btn-dark" onClick={this.AddJob}>
              Create
            </button>
          </div>
        </div>
        <h3>Jobs</h3>

        <this.ListofJob />

        <h3>User</h3>

        <this.ListofUser />

        <h3>Compagnies</h3>

        <this.ListofComp />
      </main>
    );}
    else{
      return(
        <main>
        <h1 className="text-center">403</h1>
        <h1 className="text-center">Forbiden</h1>
        </main>
      )
    }
  }
}

export { Admin };
