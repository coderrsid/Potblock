import React, { Component } from 'react';
import './Criteria.css';

export default class Criteria extends Component {
  render() {
    return (
        <div className="filtercriteria">
            <div className="criteriacontainer">
                <div><p>TOTAL PENDING CASE</p></div>
                <div><p>0</p></div>
            </div>
            <div className="criteriacontainer">
                <div><p>TOTAL INVESTIGATED CASE</p></div>
                <div><p>2</p></div>
            </div>
            <div className="criteriacontainer">
                <div><p>ACTION</p></div>
                <div className="value-container">
                    <ul style={{cursor: 'pointer'}} className="value">
                        <li>DROPPED</li>
                        <li style={{fontWeight: '900'}}>1</li>
                    </ul>
                    <ul style={{cursor: 'pointer'}} className="value">
                        <li>DISPOSED</li>
                        <li style={{fontWeight: '900'}}>2</li>
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}
