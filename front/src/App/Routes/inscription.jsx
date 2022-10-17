import React from "react";
import axios from 'axios';
import "../css/formulaire.css";
import "../css/popup.css";
import Popup from '../components/popup';
import { accountService } from '../../_services/account.service';


class Inscription extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            body: '',
            email: '',
            passwrd: '',
            messError: ''
        };
    }

    changePopup = (value) => {
        if(!value && localStorage.getItem("token")){
            window.location.href = "/connexion";
        }
        this.setState({ popup: value })
    }

    /** submit the form data and send to the back
     */
    submit() {
        const dataToSubmit = {
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            passwrd: document.getElementById("passwrd").value,
        }
        if (dataToSubmit.first_name === "" || dataToSubmit.last_name === "" || dataToSubmit.phone === "" || dataToSubmit.email === "" || dataToSubmit.passwrd === "") {
            this.setState({ popup: true })
            this.setState({ popupText: "There is still empty fields" })
        }
        else {
            return new Promise((resolve, reject) => {
                axios
                    .post("http://127.0.0.1:5000/adduser", dataToSubmit)
                    .then((response) => { resolve(response.data)
                        this.props.setConnected(accountService.isLogged())
                        accountService.saveToken(response.data.token)
                        this.setState({popup : true})
                        this.setState({popupText : response.data.message})
                        
                     })
                    .catch(error => {
                        this.setState({messError : error.response.data.message})
                    })
            })
        }
    };
    /** render the register form
     */
    render() {
        return (
            <form className="inscription">
                <Popup id="popup" trigger={this.state.popup} setTrigger={(value)=>this.changePopup(value)}>
                        <p>{this.state.popupText}</p>
                    </Popup>
                <div className="messageError text-danger">{this.state.messError}</div>
                <div className="formulaire">
                    <div className="caseFormulaire">
                        <label htmlFor="first_name">First name</label>
                        <input autoFocus required id="first_name" name="first_name" type="text"></input>
                    </div>
                    <div className="caseFormulaire">
                        <label htmlFor="last_name">Last name</label>
                        <input required id="last_name" name="last_name" type="text"></input>
                    </div>
                    <div className="caseFormulaire">
                        <label htmlFor="email">Email</label>
                        <input required id="email" name="email" type="email"></input>
                    </div>
                    <div className="caseFormulaire">
                        <label htmlFor="phone">Phone</label>
                        <input required id="phone" name="phone" type="tel"></input>
                    </div>
                    <div className="caseFormulaire">
                        <label htmlFor="password">Password</label>
                        <input required id="passwrd" name="password" type="password"></input>
                    </div>
                    <button onClick={() => {
                        this.submit()
                    }}
                        className="btnSubmit btn btn-dark" id="btnsubmit" type="button">Register</button>
                </div>
            </form>
        );
    }
}

export { Inscription };
