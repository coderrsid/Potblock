import React, { Component } from "react";
import "./Login.css";
import Recaptcha from "react-recaptcha";
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

export default class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            route: "otp",
            inroute: "otp",
            isLogged: false,
            isVerified: false,
            text: {
                recipent: "",
                message: "5100",
            },
            recievedOtp: "",
            pass: "",
            confpass: "",
        }
        this.handleRoute = this.handleRoute.bind(this);
        this.handleinRoute = this.handleinRoute.bind(this);
        this.verifycaptcha = this.verifycaptcha.bind(this);
        this.sendtext = this.sendtext.bind(this);
    }

    sendtext = () => {
        const { text } = this.state;
        this.setState({ inroute: "otp", text: { ...text, message: "5100" } });
    }

    verifycaptcha = (response) => {
        if (response) {
            this.setState({ isVerified: true });
        }
        console.log(response);
    }

    handleRoute = (value) => {
        this.setState({ route: value });
    }

    handleinRoute = (value) => {
        this.setState({ inroute: value });
    }
    
    isFormValid = () => {
        const { recievedOtp, pass, confpass, isVerified, text} = this.state
        if(text===recievedOtp) 
            return pass && confpass && isVerified;
    }

    onLogin = () => {
        const loginRef = firebase.database().ref('login');
        loginRef.on('value', (snapshot) => {
          let users = snapshot.val();
          for (let user in users) {
            if(users[user].phone === this.state.text.recipent && this.state.text.message === this.state.recievedOtp)
                this.setState({isLogged: true});
            else 
                alert("Wrong Mobile Number and OTP combination!!");
          }
        });     
    }

    render() {
        const { text, route, inroute, recievedOtp, confpass, pass } = this.state;
        return (
            <form className="login-container">
                <h1>POTBLOCK</h1>
                {route === "otp" ?
                    <div className="login-menu">
                        <div className="inner-container">
                        <label>Mobile : </label>
                        <div className="phone-input" style={inroute === "enterotp" ? { flexDirection: "column" } : null}>
                            <input
                                maxLength={10}
                                type="number"
                                value={text.recipent}
                                placeholder="Enter mobile number"
                                onChange={e => this.setState({ text: { ...text, recipent: e.target.value } })} />
                            {inroute === "otp" ?
                                <button
                                    onClick={() => { this.handleinRoute("enterotp"); }}
                                    disabled={!text.recipent}
                                >
                                    Send OTP
                                </button>
                                : inroute === "enterotp" ?
                                    <div style={{ flexDirection: "column" }} className="phone-input">
                                        <hr />
                                        <label>OTP : </label> 
                                        <input
                                            maxLength={4}
                                            type="password"
                                            value={recievedOtp}
                                            placeholder="Enter recieved OTP"
                                            onChange={e => this.setState({ recievedOtp: e.target.value })}
                                        /><hr />
                                        <button style={{ borderRadius: "6px" }}
                                            onClick={e => {this.onLogin();}}
                                        >
                                          <Link to="/home">Login</Link>
                                </button>
                                    </div> : null
                            }
                        </div>
                        <hr />
                        <button style={{marginLeft: "auto",marginRight: "auto"}} onClick={() => this.handleRoute("withPass")}>Login with Password</button>
                        <hr />
                        <button style={{marginLeft: "auto",marginRight: "auto"}} onClick={() => this.handleRoute("resetPass")}>Forgot Password ?</button>
                        </div>  
                    </div>
                    :
                    route === "withPass" ?
                            <div className="login-menu">
                            <div className="inner-container">
                                <label>Mobile : </label>
                                <div className="phone-input">
                                    <input
                                        maxLength={10}
                                        type="number"
                                        onChange={e => this.setState({ text: { ...text, recipent: e.target.value } })}
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                                <hr />
                                <label>Password : </label>
                                <div className="phone-input">
                                    <input type="password" placeholder="Enter password" />
                                </div>
                                <hr />
                                <button onClick={() => this.handleRoute("otp")}><Link to="/home">Login</Link></button>
                                <hr />
                                <button onClick={() => this.handleRoute("resetPass")}>Forgot Password ?</button>
                            </div>
                            </div>
                        
                        :
                        route === "resetPass" ? (inroute === "reset" ?
                            <div style={{ height: "500px" }} className="login-menu">
                                <div className="inner-container">
                                <label>OTP : </label>
                                <div  className="phone-input">
                                    <input maxLength={10} onChange={e => this.setState({ recievedOtp: e.target.value })} value={recievedOtp} type="password" placeholder="Enter recieved OTP"/>
                                </div>
                                <label>New Password : </label>
                                <div className="phone-input">
                                    <input type="password" value={pass} onChange={e => this.setState({ pass: e.target.value })} placeholder="Enter New Password" />
                                </div>
                                <label>Confirm Password : </label>
                                <div className="phone-input">
                                    <input type="password" value={confpass} onChange={e => this.setState({ confpass: e.target.value })} placeholder="Enter Confirm Password" />
                                </div>
                                <hr />
                                <Recaptcha
                                    sitekey="6Le3WpoUAAAAALfAxiu8AaptOP8Myx1zuEbKL0_g"
                                    render="explicit"
                                    onVerifyCallback={this.verifycaptcha}
                                />
                                <button style={{ marginTop: "5px" }} disabled={!this.isFormValid} onClick={() => { this.handleinRoute("otp"); this.handleRoute("otp") }}>Reset Password</button>
                                </div>
                            </div> :
                            <div className="login-menu">
                                <div className="inner-container">
                                <label>Mobile : </label>
                                <div className="phone-input">
                                    <input
                                        maxLength={10}
                                        type="number"
                                        onChange={e => this.setState({ text: { ...text, recipent: e.target.value } })}
                                        placeholder="Enter mobile number"
                                    />
                                    <button style={{padding:'12px 20px'}} disabled={!text.recipent} onClick={() => { this.handleinRoute("reset"); }}>
                                        Send OTP to Reset
                                    </button>
                                </div>
                                <hr />
                                <button onClick={() => {this.handleinRoute("otp");this.handleRoute("otp");}}>Back to Login</button>
                                </div>
                            </div>) : null}
            </form>
        )
    }
}
