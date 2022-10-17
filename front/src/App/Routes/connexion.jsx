import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../css/formulaire.css";
import "../css/popup.css"
import { accountService } from '../../_services/account.service';
import Popup from '../components/popup';



class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            email: '',
            passwrd: '',
            token: '',
            popup: false,
            popupText : "",
            link: "/"
        };
    };

    changePopup=(value)=>{
        this.setState({popup : value})
    }
    
    /** Submit and send email and password to the back for connexion 
     */
    submit() {
        const dataToSubmit = {
            email: document.getElementById("email").value,
            passwrd: document.getElementById("passwrd").value
        }

        if (dataToSubmit.email === "" || dataToSubmit.passwrd === "") {
            this.setState({popup : true})
            this.setState({popupText : "There is still empty fields !"})
        }
        else {
            return new Promise((resolve, reject) => {
                axios
                    .post("http://127.0.0.1:5000/connex", dataToSubmit)
                    .then((response) => {resolve(response.data)
                        if (response.data.token)
                            accountService.saveToken(response.data.token)
                        this.props.setAdmin(response.data.isAdmin)
                        this.props.setConnected(accountService.isLogged())
                        if (accountService.isLogged()){
                            window.location.href = "/";
                        }
                        else{
                            this.setState({popupText : "Wrong password !"})
                            this.setState({popup : true})
                        }
                        if (response.data.isAdmin){
                            this.setState({popupText : ""})
                            this.setState({popup : false})
                            window.location.href = "/admin";
                        }

                           
                    })
                    .catch(error => {
                        resolve(error)
                        this.setState({popup : true})
                        this.setState({popupText : error.response.data["message"]})
                    })
            })
        }
    };


    /** render form to connexion
     */
    render() {
        return (
            <div className='Connexion'>
                <Popup id="popup" trigger={this.state.popup} setTrigger={(value)=>this.changePopup(value)}>
                    <p>{this.state.popupText}</p>
                </Popup>
                <div className='formulaire'>
                    <div className="caseFormulaire">
                        <label htmlFor="email">Email</label>
                        <input autoFocus required id="email" name="email" type="email"></input>
                    </div>

                    <div className="caseFormulaire">
                        <label htmlFor="password">Password</label>
                        <input required id="passwrd" autoComplete="current-password" name="password" type="password"></input>
                    </div>

                    <button onClick={() => { this.submit() }}
                        className="btnSubmit btn btn-dark" id="btnsubmit" type="button">Log In
                    </button>
                
                    <div className="register">
                        <p>Not yet registered ? Click the button to register yourself !</p>
                        <Link to="/inscription">
                        <button className='btn btn-dark'>Register
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export { Connexion };
