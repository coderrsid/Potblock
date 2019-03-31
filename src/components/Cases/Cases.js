import React, { Component } from 'react';
import './Cases.css';
import Case from "../Case/Case";
import Criteria from '../Criteria/Criteria';
import Fade from 'react-reveal/Fade';

export default class Cases extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    }
  }
  render() {
    return (
      <div className="cases-container">
        <Fade bottom>
          <Criteria />
        </Fade>

        <div className="displaycase">
          <div className="filtercase">
            <p>All Filters</p>
            <select>
                <option value="Select Activities">Select Filters</option>
                <option onClick={() => this.setState({filter: 'priority'})}>Filter by Priority</option>
                <option onClick={() => this.setState({filter: 'date'})}>Filter by Date</option>
                <option onClick={() => this.setState({filter: 'dropped'})}>Dropped</option>
                <option onClick={() => this.setState({filter: 'disposed'})}>Disposed</option>
            </select>
          </div>
            <Case search={this.props.search} filter={this.state.filter}/>
        </div>
      </div>
    )
  }
}
