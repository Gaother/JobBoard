import React from "react";
import axios from 'axios';
import "../css/profile.css";
import Popup from '../components/popup';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.ListofAdv = this.ListofAdv.bind(this);
    this.state = {
        input: "label",
        firstName: "first name",
        lastName: "last name",
        email: "email utilisateur",
        phone: "phone",
        password: "",
        drapeau: false,
        popup: false,
        idToSubmit: [],
        data: null
    };
  }

    componentDidMount() {
        this.getprofile();
        this.getadv();
    }
    /** Get the data of the user
     * The data are write as information 
     * to the user
     */
    getprofile() {
        return new Promise((resolve, reject) => {
            axios
                .post("http://127.0.0.1:5000/get_profile", {"token" : localStorage.getItem('token')})
                .then((response) => {resolve(response.data)
                    this.setState({firstName : response.data.firstName})
                    this.setState({lastName : response.data.lastName})
                    this.setState({email : response.data.email})
                    this.setState({phone : response.data.phone})
                })
            })
    }

    /** Get the data of the applications
     * The data are write as information 
     * to the user
     */
    getadv() {
        return new Promise((resolve, reject) => {
            axios
                .post("http://127.0.0.1:5000/get_adv", {"token" : localStorage.getItem('token')})
                .then((response) => {resolve(response.data)
                  this.setState({ data: response.data })
                })
            })
    }

    /** Change the form inputs from button to 
     * writable input to let the user
     * write the new value of  
     * @param {int} id
     */
    changeInputs(id){
        let div = document.getElementById("div"+id)
        let profile = document.getElementById("profile")
        this.state.idToSubmit.push(id)
        document.getElementById(id).remove()

        let input = document.createElement('input')
        input.id = "input"+id
        input.type = "text"
        input.placeholder = "new "+id
        input.className = "btn btn-dark"

        let button = document.createElement("button")
        button.id = "submitbtn"
        button.innerHTML = "Save changes"
        button.onclick = () => this.submit();
        button.className="btn btn-dark"
        

        div.appendChild(input)
        input.focus()
        if (!this.state.drapeau){
            profile.appendChild(button)  
            this.setState({drapeau : true})
        }
    }

    /**Called when the user click on the SUBMIT button 
     * Call the back to change the value of some variable 
     * in the dataBase
    */
    submit() {
        var itemsToSubmit = {}
        var dataToSubmit = []
        this.state.idToSubmit.forEach(id => {
            if (document.getElementById("input"+id).value === ""){
                this.setState({popup : true})
                this.setState({popupText : "There is still empty fields !"})
                return
            }
            itemsToSubmit[id] = document.getElementById("input"+id).value
        })
        
        dataToSubmit = [localStorage.getItem("token"), itemsToSubmit]
        return new Promise((resolve, reject) => {
            axios.post("http://127.0.0.1:5000/change_value", dataToSubmit)
                .then((response) => {resolve(response.data)
                    this.getprofile();
                    this.getadv();
                    this.setState({popup : true})
                    this.setState({popupText : "Everything is up to date now !"})
                })
            })
    }
    /**Called when to display (or not) 
     * a Popup to the user
     */
    changePopup=(value)=>{
        this.setState({popup : value})
    }


    /** Return and display the list of 
     * applications returned by the back in the fonction
     * getadv()  
     */
    ListofAdv = () => {
        if (this.state.data != null) {
          const listofAdv = this.state.data.map((adv) => {
            return (
            <div className="card" key={adv.id}>
                <div className="card-body border">
                    <h1 className="card-title">{adv.title} </h1>
                    <div className="row">
                    <div className="col-4">
                        <p>{adv.compagnies}</p>
                    </div>
                    <div className="col-8">
                        <p>{adv.type} </p>
                    </div>
                    </div>
                </div>
            </div>  
            )
          })        
    
          return <div>{listofAdv}</div>;
        }
      }
      
 /**Render function 
   */
  render() {
    return (
        <div className="Profile">

            <Popup id="popup" trigger={this.state.popup} setTrigger={(value)=>this.changePopup(value)}>
                        <p>{this.state.popupText}</p>
            </Popup>

            <div id="profile">
                <div className='affichage'>
                    <h1>Profile</h1>
                    <div id="divfirstName" className="caseProfile">
                        <label className="label label-dark" id="labelfirstName">{this.state.firstName}</label>
                        <button className="btn btn-dark" id="firstName" onClick={() => this.changeInputs("firstName")}>Change your first name</button>
                    </div>

                    <div id="divlastName" className="caseProfile">
                        <label id="labellastName">{this.state.lastName}</label>
                        <button className="btn btn-dark" id="lastName" onClick={() => this.changeInputs("lastName")}>Change Last Name</button>
                    </div>

                    <div id="divphone" className="caseProfile">
                        <label id="labelphone">{this.state.phone}</label>
                        <button className="btn btn-dark" id="phone" onClick={() => this.changeInputs("phone")}>Change Phone Number</button>
                    </div>

                    <div id="divemail" className="caseProfile">
                        <label id="labelemail">{this.state.email}</label>
                    </div>
                </div>
            </div>

        <hr></hr>

            <div id="addv" className="affichage">
                <h1>Jobs you postuled to</h1>
                <this.ListofAdv />
            </div>

        </div>
    )
  }
}

export { Profile };