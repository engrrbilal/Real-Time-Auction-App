import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';

class Profile extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      loggedIn: null
    }
    }
  
    componentWillMount(){
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  loggedIn: true,
               });
          } else {
              this.setState({ loggedIn: false });
          }
      });
  }
    render(){
      return(
        <div className="signBackground" style={{width:"100%",height:900}}>
          <h1 style={{color:"blue",fontFamily:"Times New Roman"}}>
              Profile
          </h1>
            
        </div>
      )
    }

  }

  const mapDispatchToProp = (dispatch) =>({
    // startSignIn: (userDetails) => dispatch(startSignIn(userDetails))
  })
  
  export default connect(undefined, mapDispatchToProp)(Profile);