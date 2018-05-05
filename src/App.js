import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup'
import {Router, Route,Redirect} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import firebase from 'firebase'
import history from './history';
import Home from './components/Home';
import { blueGrey500, blueGrey900, blue100, indigo100, indigo500, blue900, blue500, grey50, red100 } from 'material-ui/styles/colors';
import Bidder from './components/Bidder';
import Auctioner from './components/Auctioner';
import Profile from './components/Profile';
const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Auctionar" onClick={() => history.push("/auctioner")}/>
    <MenuItem primaryText="Bidder" onClick={() => history.push("/bidder")}/>
    <MenuItem primaryText="Profile" onClick={() => history.push("/profile")}/>
    <MenuItem primaryText="Sign out" onClick={() => firebase.auth().signOut().then(history.push("/"))}/>
  </IconMenu>
);
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      logged: false
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
              logged: true
            })
        }
        else {
            this.setState({
              logged: false
            })
        }
    });
}
  render() {
    return (
      <div>
           <AppBar
            title="Real Time Auction System"
            style={{background:indigo500,borderBottom:"3px solid blue"}}
            iconElementLeft={<IconButton></IconButton>}
            iconElementRight={this.state.logged ? <Logged /> : 
            <div style={{paddingTop:"7px"}}>
              <RaisedButton label="Sign in" style={{color:grey50}} onClick={() => history.push('/')} />
              <RaisedButton label="Sign up"  style={{color:grey50}} onClick={() => history.push('/signup')} />
            </div>}
          />
          <Router history={history}>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={Home}/>
                <Route path="/auctioner" component={Auctioner} />
                <Route path="/bidder" component={Bidder} />
                <Route path="/profile" component={Profile} />
            </div>
        </Router>
      </div>
    );
  }
}
export default App;
