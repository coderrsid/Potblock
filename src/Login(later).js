import React, { Component } from 'react';
import firebase from './firebase';


const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
    };
    this.handleCode=this.handleCode.bind(this);
    this.handlePhone=this.handlePhone.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    firebase.auth().languageCode = 'en';
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  
      
    };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  handlePhone(e) {
    this.setState({ phoneNumber: e.target.value })
  }
  
  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;
      
    return (
      <div className="container">
        <p>Enter phone number:</p>
        <input
          onChange={e => this.handlePhone(e)}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <button onClick={this.signIn} />
      </div>
    );
  }
  
  renderMessage() {
    const { message } = this.state;
  
    if (!message.length) return null;
  
    return (
      <p style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</p>
    );
  }

  handleCode(e) {
    this.setState({ codeInput: e.target.value })
  }
  
  renderVerificationCodeInput() {
    const { codeInput } = this.state;
  
    return (
      <div className='container'>
        <p>Enter verification code below:</p>
        <input
          onChange={e => this.handleCode(e)}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <button id='sign-in-button' onClick={this.confirmCode} />
      </div>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <div style={{ flex: 1 }}>
        
        {!user && !confirmResult && this.renderPhoneNumberInput()}
        
        {this.renderMessage()}
        
        {!user && confirmResult && this.renderVerificationCodeInput()}
        
        {user && (
          <div className='container'>
            <img src={{successImageUri}}/>
            <p>Signed In!</p>
            <p>{JSON.stringify(user)}</p>
            <button onClick={this.signOut} />
          </div>
        )}
      </div>
    );
  }
}