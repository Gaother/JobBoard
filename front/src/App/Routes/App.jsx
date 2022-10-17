import React from 'react';
import axios from 'axios';
import { GetJobs, Connexion, Inscription, Admin, About } from '..';
import { Profile } from './profile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarAdmin from '../components/navbar_admin';
import NavBarConnected from '../components/navbar_connected';
import NavBarOther from '../components/navbar_other';
import Footer from '../components/footer';
import { accountService } from '../../_services/account.service';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isAdmin: false,
          isConnected: false,
        };
    };
    /**Check when page is load if the token is valid
     */
    componentDidMount(){
        return new Promise((resolve, reject) => {
            axios.post("http://127.0.0.1:5000/verify", {"token" : localStorage.getItem('token')})
            .then((response) => {resolve(response.data)
                this.setState({isAdmin : response.data.isAdmin})
                this.setState({isConnected : accountService.isLogged()})
                this.setState({popup : accountService.isLogged()})
            })
            .catch(error => {
                resolve(error)
            })
        })
    }



    changeisAdmin=(value)=>{
        this.setState({isAdmin : value})
   }

    changeisConnected=(value)=>{
        this.setState({isConnected : value})
    }
    /**render the navbar and route 
     */
    render() {
        return(
           
            <BrowserRouter>
                {this.state.isAdmin? 
                    <NavBarAdmin setConnected={(value)=>this.changeisConnected(value)} /> 
             : this.state.isConnected?
                    <NavBarConnected setConnected={(value)=>this.changeisConnected(value)} />
                : 
                    <NavBarOther setConnected={(value)=>this.changeisConnected(value)}/>
            }
            <div className='d-flex flex-column min-vh-100'>
                    <div className="container ">
                    <div className="row justify-content-center">
                        <div className="col-8 ">
                            <Routes>
                                
                                <Route path="/" element={<GetJobs />}/>
                                <Route path="/connexion"  
                                element={<Connexion
                                    setAdmin={(value)=>this.changeisAdmin(value)}
                                    setConnected={(value)=>this.changeisConnected(value)} />}/>
                                <Route path="/admin" element={<Admin />}/>
                                <Route path="/profile" element={<Profile />}/>
                                <Route path="/about" element={<About />}/>
                                <Route path="/inscription" element={<Inscription 
                                    setAdmin={(value)=>this.changeisAdmin(value)}
                                    setConnected={(value)=>this.changeisConnected(value)} />}/>
                                
                            </Routes>
                        </div>
                    </div>
                </div>
                <Footer />
               
                </div>
             </BrowserRouter>
             
        )
    }
}

export { App }; 

