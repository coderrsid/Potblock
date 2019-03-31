import React, { Component } from 'react';
import './Home.css';
import Cases from '../Cases/Cases';
import {Link} from "react-router-dom";
import Fade from 'react-reveal/Fade';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="logininfo-container">
          <Fade bottom cascade>
          <div className='icon'></div>
          
          <input placeholder='Search Case ID' value={this.state.search} onChange={(e)=>this.setState({search: e.target.value})}/>
          <ul>
            <li><Link style={{textDecoration: 'none'}} to="/home">Dashboard</Link></li>
            <li><a href="mailto:sehgal.siddhant999@gmail.com">Feedback</a></li>
            <li ><Link style={{textDecoration: 'none'}} to="/">Logout</Link></li>
          </ul>
          <br /><br />
          <div className="user">
              <p style={{fontWeight: '700'}}>Logged in as</p>
              <p>Siddhant Sehgal</p>
              <p style={{fontWeight: '700'}}>State</p>
              <p>New Delhi</p>
              <p style={{fontWeight: '700'}}>District</p>
              <p>SOUTH-WEST</p>

          </div>
          </Fade>
        </div>
        <div>
            <Cases search={this.state.search}/>
        </div>
      </div>
    )
  }
}
