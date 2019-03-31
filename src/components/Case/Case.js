import React, { Component } from 'react';
import './Case.css';
import firebase from '../../firebase';

export default class Case extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        };
    }
    componentDidMount() {
      const requestsRef = firebase.database().ref('requests');
      requestsRef.on('value', (snapshot) => {
        let requests = snapshot.val();
        let newState = [];
        for (let request in requests) {
          newState.push({ 
              id: requests[request].id,
              datetime: requests[request].datetime,
              location: requests[request].location,
              status: requests[request].status,
              reportdate: requests[request].reportdate,
              upvote: requests[request].upvote
          });
        }
        console.log(newState);
        this.setState({requests: newState});
      })
    }

      
  render() {
    return (
      <div className="mapCase">
        {
          this.props.filter === 'Dropped' ? 
            (this.state.requests.filter((request) => {
                return request.status === 'Dropped';
            }))
          : this.props.filter === 'Disposed' ? 
                (this.state.requests.filter((request) => {
                    return request.status === 'Disposed';
                }))
                : (this.state.requests.map((request) => {
                  return(
                    <div className='case' style={{cursor: 'pointer' }}>
                      <div className="id">
                        <h2>Case ID <span>{request.id}</span></h2>
                      </div>
                      <div className="detail">
                        <div style={{ fontWeight: '900' }}>
                          <p>Status:</p>
                          <p>Location:</p>
                          <p>Date and Time of Complaint:</p>
                          <p>Date and Time of Report:</p>
                          <p style={{fontSize: '1.5em', color: '#1E252C', textAlign:'right'}}>UPVOTED: </p>
                        </div>
                        <div></div>
                        <div>
                          <p>{request.status}</p>
                          <p>{request.location}</p>
                          <p>{request.datetime}</p>
                          <p>{request.reportdate}</p>
                          <p style={{fontSize: '1.5em', color: '#1E252C', textAlign:'left'}}>{request.upvote}</p>
                        </div>
                      </div>
                    </div>
                );
                }))
              }
        </div>

              )
          }
        }