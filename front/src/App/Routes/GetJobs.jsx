import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { accountService } from "../../_services/account.service";
import "../css/getJob.css";
import "../css/popup.css"

class GetJobs extends React.Component {
  constructor(props) {
    super(props);
    this.ListofJob = this.ListofJob.bind(this);
    this.DescriptionJob = this.DescriptionJob.bind(this);
    this.state = {
      isConnected: false,
      count: 2,
      data: null,
      dataAll: null,
      messageError:'',
      messageGood: ''
    };
  }

  componentDidMount() {
    this.getjob();
    this.verify();
  }

  changePopup=(value)=>{
    this.setState({popup : value})
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
          this.setState({ isConnected: accountService.isLogged() });
          this.setState({ popup: accountService.isLogged() });
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }
  /** function to fetch all jobs from the databases
   */
  getjob() {
    
    const url = "http://127.0.0.1:5000/getjob";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

  /** function to display all the job
   */
  ListofJob() {
    if (this.state.data != null) {
      const jobs = this.state.data.map((job) => {
        return (
          <div className="card" key={job.id}>
            <div className="card-body border">
              <h1 className="card-title">{job.title} </h1>
              <div className="row">
                <div className="col-lg-4 col-sm-12">
                  <p>{job.compagnies}</p>
                  <p>{job.city}</p>
                  <p>{job.date}</p>
                </div>
                <div className="col-lg-8 col-sm-12">
                  <div className="row">
                    <p>{job.type} </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <Link
                  className="btn btn-dark"
                  role="button"
                  aria-expanded="false"
                  data-toggle="collapse"
                  data-target={"#id_" + job.id}
                  onClick={() => this.getjobAll(job.id)}
                >
                  Learn More
                </Link>
              </div>
              <div id={"id_" + job.id} className="collapse">
                <div id="detail">
                  <div id={"title_" + job.id}></div>
                  <p>Companies : </p>
                  <div id={"compagnies_" + job.id}></div>
                  <p>Apply date : </p>
                  <div id={"date_" + job.id}></div>
                  <p>Description : </p>
                  <div id={"desc_" + job.id}></div>
                </div>
                <div>
                  <Link
                    className="btn btn-dark"
                    role="button"
                    aria-expanded="false"
                    data-toggle="collapse"
                    data-target={"#apply" + job.id}
                  >
                    Apply
                  </Link>
                </div>

                <div id={"apply" + job.id} className="collapse ">
                  {!this.state.isConnected ? (
                    <form>
                    <div className="row">
                    
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        id={"apply_first" + job.id}
                        name="first_name"
                        required
                      />

                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        id={"apply_last" + job.id}
                        name="last_name"
                        required
                      />

                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id={"apply_email" + job.id}
                        name="email"
                        required
                      />
                      <label htmlFor="phone">Phone number</label>
                      <input
                        type="tel"
                        id={"apply_phone" + job.id}
                        name="phone"
                        required
                      />
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        id={"apply_message_un" + job.id}
                        cols="30"
                        rows="10"
                      ></textarea>
                      <div className="messageError text-danger text-center">{this.state.messageError}</div>
                      <div className="messageGood text-success text-center">{this.state.messageGood}</div>
                      <Link
                        className="btn btn-dark"
                        role="button"
                        aria-expanded="false"
                        onClick={() => this.SendMessage_un(job.id)}
                      >
                        Apply to this job
                      </Link>
                      
                    </div>
                    </form>
                  ) : (
                    <div>
                    <form>
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        id={"apply_message_co" + job.id}
                        cols="30"
                        rows="10"
                      ></textarea>
                      <div className="messageError text-danger">{this.state.messageError}</div>
                      <div className="messageGood text-success text-center">{this.state.messageGood}</div>
                      <Link
                        className="btn btn-dark"
                        role="button"
                        aria-expanded="false"
                        onClick={() => this.SendMessage_co(job.id)}
                      >
                        Apply to this job
                      </Link>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      });
      var listofJob = [];
      for (let index = 0; index < this.state.count; index++) {
        listofJob.push(jobs[index]);
        if (jobs[index] === undefined) {
          document.getElementById("nextbtn").className = "invisible";
        }
      }

      return <div>{listofJob}</div>;
    }
  }
  /** function to get job detail with his id
   * @param  {int} id
   */
  getjobAll(id) {

    this.verify();
    const url = "http://127.0.0.1:5000/getjobAll";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ dataAll: data });
        this.DescriptionJob(data);
      });
  }
  /** function to display the description of job
   * @param  {json} data
   */
  DescriptionJob(data) {
    if (data != null) {
      var desc = document.getElementById("desc_" + data.id);
      if (desc != null) {
        const newDesc = document.createElement("p");
        newDesc.innerHTML = data.description;
        desc.parentNode.replaceChild(newDesc, desc);
      }
      var title = document.getElementById("title_" + data.id);
      if (title != null) {
        const newTitle = document.createElement("p");
        newTitle.innerHTML = data.title;
        title.parentNode.replaceChild(newTitle, title);
      }
      var compagnies = document.getElementById("compagnies_" + data.id);
      if (compagnies != null) {
        const newComp = document.createElement("p");
        newComp.innerHTML = data.compagnies;
        compagnies.parentNode.replaceChild(newComp, compagnies);
      }
      var date = document.getElementById("date_" + data.id);
      if (date != null) {
        const newDate = document.createElement("p");
        newDate.innerHTML = data.date;
        date.parentNode.replaceChild(newDate, date);
      }
    }
  }
  /**function to send the apply message when user is connected 
   * @param  {int} jobs_id
   */
  SendMessage_co(jobs_id) {
    var message_co = document.getElementById(
      "apply_message_co" + jobs_id
    ).value;

    var data = { id: jobs_id, message: message_co };
    if (data.id === "" || data.message === "") {
      this.setState({message : "Message is empty !"})

  }
  else {
    const url = "http://127.0.0.1:5000/apply";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        token: localStorage.getItem("token"),
      },

      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({messageGood : data.message})
    });;
  }
  }
  /**function to send the apply message when user is not connected 
   * @param  {int} jobs_id
   */
  SendMessage_un(jobs_id) {
      var data = {
      id: jobs_id,
      first_name: document.getElementById("apply_first" + jobs_id).value,
      last_name: document.getElementById("apply_last" + jobs_id).value,
      email: document.getElementById("apply_email" + jobs_id).value,
      phone: document.getElementById("apply_phone" + jobs_id).value,
      message: document.getElementById("apply_message_un" + jobs_id).value
    };
    if (data.first_name === "" || data.last_name === "" || data.email === "" || data.phone === "" ||  data.id === "" || data.message === "") {
      this.setState({message : "There is still empty fields !"})
  }
  else {
    const url = "http://127.0.0.1:5000/apply";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },

      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({messageGood : data.message})
    });
  }
  }
  /**Render function 
   */
  render() {
    return (
      <div >
        <div className="container">
        
          <this.ListofJob />
          <div className="row">
          <button
          className="btn btn-dark next"
            id="nextbtn"
            onClick={() => {
              this.setState({ count: this.state.count + 2 });
            }}
          >
            Suivant
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export { GetJobs };
