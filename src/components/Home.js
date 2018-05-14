import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';
import { blueGrey500, blueGrey900, blue100, indigo100, indigo500, blue900, blue500, grey50, red100 } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Bidder from './Bidder';
import Auctioner from './Auctioner';
import Computers from './Computers';
import Mobiles from './Mobiles';
import Electronics from './Electronics';
import Cameras from './Cameras';
import Others from './Others';
import RaisedButton from 'material-ui/RaisedButton';

const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Auctioner/>
  },
  {
    path: "/home/auctioner",
    exact: true,
    main: () => <Auctioner/>
  },
  {
    path: "/home/bidder",
    main: () => <Bidder/>
  },
  {
    path: "/home/bidder/mobiles",
    exact: true,
    main: () => <Mobiles/>
  },
  {
    path: "/home/bidder/computers",
    exact: true,
    main: () => <Computers/>
  },
  {
    path: "/home/bidder/electronics",
    main: () => <Electronics/>
  },
  {
    path: "/home/bidder/cameras",
    exact: true,
    main: () => <Cameras/>
  },
  {
    path: "/home/bidder/others",
    exact: true,
    main: () => <Others/>
  }
];


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
  profile(){
    history.push('/profile')
  }
  auctionerRoute =()=>{
      history.push('/home/auctioner')
  }
  bidderRoute =()=>{
      history.push('/home/bidder')
  }
    render(){
      return(
        <div className="signBackground" style={{width:"100%",height:900}}>
          
          <div style={{height:"40px",color:"black",backgroundColor:"lightBlue",marginTop:"-24px"}}>
                <center>
                  <div style={{fontSize:"24px",marginTop:"1.3%"}}>
                    <span>Welcome </span>
                    <span style={styles.displayName} onClick={this.profile}>{this.state.displayName}</span>
                    <span> to the Real Time Auction App</span>
                  </div>
                </center>
                <RaisedButton style={{marginLeft:"1%",width:"48%",aligntext:"center",fontSize:"42px",height:"70px",fontWeight:"bold",marginTop:"1%"}}
                   label="Auctioner" primary={true} onClick={()=>this.auctionerRoute()}/>
                
                  <RaisedButton style={{marginLeft:"1%",width:"48%",aligntext:"center",fontSize:"42px",fontWeight:"bold",
                  height:"70px",background:indigo500,borderBottom:"3px solid blue"}}label="Bidder"backgroundColor="lightBlue" onClick={()=>this.bidderRoute()}/>
            </div>
            <div style={{ flex: 1, padding: "10px" }}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
      </div>

      )
    }

  }
  const styles = {
    displayName:{
      textDecoration:"underline",
      cursor: "pointer"
    }
  };
  const mapDispatchToProp = (dispatch) =>({
    // startSignIn: (userDetails) => dispatch(startSignIn(userDetails))
  })
  
  export default connect(undefined, mapDispatchToProp)(Home);