import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';
import Bidder from './Bidder';
import Auctioner from './Auctioner';
import RaisedButton from 'material-ui/RaisedButton';
import { blueGrey500, blueGrey900, blue100, indigo100, indigo500, blue900, blue500, grey50, red100 } from 'material-ui/styles/colors';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// const routes = [
//   {
//     path: "/home",
//     exact: true,
//     sidebar: () => <div>home!</div>,
//     main: () => <h2>{Home}</h2>
//   },
//   {
//     path: "/home/bidder",
//     sidebar: () => <div>bidder</div>,
//     main: () => <h2>bidder</h2>
//   },
//   {
//     path: "/home/auctioner",
//     sidebar: () => <div>auctioner</div>,
//     main: () => <h2>auctioner</h2>
//   }
// ];
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
  componentDidMount(){
    localStorage.setItem("type", JSON.stringify("/home"))
  }
  routChanger =(route)=>{
    if(route === "1"){
      history.push('./auctioner')
    }
    else{
      history.push('./bidder')
    }
  }
    render(){
      return(
        <div className="signBackground" style={{width:"100%",height:900}}>
            {/* {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))} */}
          <div style={{height:"40px",color:"black",backgroundColor:"lightBlue",marginTop:"-24px"}}>
                <center>
                  <p style={{fontSize:"24px"}}>{`Welcome ${this.state.displayName} to the Real Time Auction App`}</p>
                  <RaisedButton style={{marginTop:"18%",width:"20%",aligntext:"center",fontSize:"42px",height:"70px",fontWeight:"bold"}}
                   label="Auctioner" primary={true} onClick={()=>this.routChanger("1")}/>
                  <RaisedButton style={{marginTop:"18%",marginLeft:"1%",width:"20%",aligntext:"center",fontSize:"42px",fontWeight:"bold",
                  height:"70px",background:indigo500,borderBottom:"3px solid blue"}}label="Bidder"backgroundColor="lightBlue" onClick={()=>this.routChanger("2")}/>
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