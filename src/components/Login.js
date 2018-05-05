import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import {connect} from 'react-redux'
import {iconElementLeft,Divider,IconButton,TextField,Paper,FlatButton,RaisedButton,AppBar} from 'material-ui';
import '../App.css';
import {Spinner} from './Spinner';
import Signup from './Signup'
import {Route,Switch,Link} from 'react-router-dom';
import {startSignIn} from '../actions/auth'
import * as firebase from 'firebase';
import history from '../history';

const styles = {
  style : {
    height: 450,
    width: 400,
    marginTop: "10%",
    marginLeft:"40%",
    textAlign: 'center',
    display: 'inline-block',
    borderRadius:5,
    opacity:"0.9"
  },
  styleEmail:{
    marginTop: 50,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 15
},
  stylePassword:{
    marginTop: 0,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 0
},
  styleButton:{
    marginTop: 20
  },
};

class Login extends React.Component{
  
    constructor(props){
      super(props);
      this.SigninHandler = this.SigninHandler.bind(this);
    this.state ={
      email:"",
      password:"", 
      error: '',
      loading: false,
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
    SigninHandler(){
        
        if(!this.state.loggedIn){
          this.setState({ error: ' ', loading: true}); 
          this.props.startSignIn({
            email:this.state.email,
            password:this.state.password,
          })
          setTimeout(() => {
            this.setState({
            loading: false,
            error:"Auth error"
          })
        }, 6000);
        }
    }
  renderButton(){
    if (this.state.loading) {
        return <Spinner/>;
    }
    return (
      <RaisedButton label="Signin" primary={true}
      style={styles.styleButton} type="submit" onClick={this.SigninHandler}/>
    );
}
SignupHandler(){
  <Route path="/signup" component={Signup} />
}
    render(){
      return(
        <div className="signBackground" style={{width:"100%",height:900}}>
          <Paper zDepth={4} style={styles.style} >
          <ValidatorForm onSubmit={(e) => e.preventDefault()}>
          <h1 style={{color:"blue",fontFamily:"Times New Roman"}}>
              Sign in
               <Divider />
          </h1>
            <Paper style={styles.styleEmail} >
                <TextValidator
                 hintText="Email Address" 
                underlineShow={false} fullWidth={false}
                value={this.state.email}
                onChange={ev => this.setState({email:ev.target.value})}
                name="email"
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                />
              </Paper>
              <Paper id="pasword" style={styles.stylePassword}>
                <TextValidator
                  value={this.state.password}
                  hintText="Password"
                  name="pass"
                  type="password"
                  validators={['required']}
                  errorMessages={['this field is required']} 
                  
                  underlineShow={false} fullWidth={false}
                  onChange={ev => this.setState({password:ev.target.value})}
                />
              </Paper>
              <p style={{color:"red"}}>{this.state.error}</p>
              {this.renderButton()}
          </ValidatorForm>
            <br />
            'OR'
            <br />
            <Link to="/signup">
             <FlatButton label="Register -->" primary={true} onClick={this.SignupHandler()} />
           </Link>
          </Paper>
        </div>
      )
    }

  }

  const mapDispatchToProp = (dispatch) =>({
    startSignIn: (userDetails) => dispatch(startSignIn(userDetails))
  })
  
  export default connect(undefined, mapDispatchToProp)(Login);