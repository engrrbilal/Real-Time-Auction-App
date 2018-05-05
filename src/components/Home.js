import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';

class Home extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      loggedIn: null,
      displayName:'',
    }
    }
  
    componentWillMount(){
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  loggedIn: true,
                  displayName:user.displayName
               });
          } else {
              this.setState({ loggedIn: false });
          }
      });
  }
    render(){
      return(
        <div className="signBackground" style={{width:"100%",height:900}}>
          <div style={{height:"40px",color:"black",backgroundColor:"lightBlue",marginTop:"-24px"}}>
                <center>
                  <p style={{fontSize:"24px"}}>{`Welcome ${this.state.displayName} to the Real Time Auction App`}</p>
                </center>
            </div>
        </div>
      )
    }

  }

  const mapDispatchToProp = (dispatch) =>({
    // startSignIn: (userDetails) => dispatch(startSignIn(userDetails))
  })
  
  export default connect(undefined, mapDispatchToProp)(Home);