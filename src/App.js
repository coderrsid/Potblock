import React, { Component } from 'react';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Cases from './components/Cases/Cases';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <div className="main-container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/home/case" component={Cases} />
            </Switch>
        </div>
      </Router>
    )
  }
}
