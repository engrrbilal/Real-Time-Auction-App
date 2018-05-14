import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { getUserProfileData,startUpdateUser} from '../actions/dataActions';
import { dataReducer} from '../reducers/dataReducer';
import {RaisedButton,Divider,TextField} from 'material-ui';
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
    card: {
      minHeight:'30%',
      padding: '2px',
      maxWidth:"30%",
      marginLeft: "30%",
      marginTop:"5%",
      // display: 'inline-block',
      background: 'rgba(0,0,0,0.2)',
  }
};
class Profile extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        fullName:'',
        userUid:'',
        displayName:'',
        address:'',
        contactNo:'',
        disabled:true,
        update:false,
        img:'',
        imgValue:0,
        profileImage:''
      }
    }
    componentWillMount(){
      {this.props.getUserProfileData({
        bidder:"from profile getting data"
      })}
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  userUid: user.uid,
                  displayName:user.displayName
               });
          }
      });
  }
    componentWillReceiveProps(props){
      if(props.user.fullName){
          this.setState({
              fullName: props.user.fullName,
              displayName:props.user.fullName,
              profileImage:props.user.img
          })
      }
      if(props.user.contactNo || props.user.address
      ){
          this.setState({
              contactNo: props.user.contactNo,
              address: props.user.address,
            })
      }
  }
  editProfile = ()=>{
    this.setState({
      disabled:false,
      update:true,
    })

}
updateProfile = ()=>{
     this.applyUpdateDispatch()
}
applyUpdateDispatch(){
  if(this.state.fullName ==="" && this.state.address==='' && this.state.contactNo===''){
      alert("Please fill the form")   
  }
  else{
      this.props.startUpdateUser({
          id:this.state.userUid,
          fullName:this.state.fullName,
          displayName:this.state.fullName,
          contactNo:this.state.contactNo,
          address:this.state.address,
          img:this.state.img
      })
      this.setState({
        img:'',
        imgValue:''
      })
  }
 
}
componentDidMount(){
  localStorage.setItem("type", JSON.stringify("/profile"))
}
render(){
      return(
        <div >
          <Card style={styles.card}>
                                    <CardMedia
                                    style={styles.hoverCursor}
                                    >
                                    {
                                      this.state.profileImage?
                                      <img src={this.state.profileImage}  alt="image" style={{width:"50px",height:"350px"}}/>
                                      :<img src={require(".././images/default-avatar.png")}  alt="image" style={{width:"50px",height:"350px"}}/>
                                    }
                                    <input type='file' disabled={this.state.disabled}
                                    style={{marginLeft:"40%"}}
                                    onChange={(e) => this.setState({img: e.target.files[0], imgValue: 100})}
                                      />
                                      <LinearProgress mode="determinate" style={{marginTop:"20px"}} value={this.state.imgValue} />
                                    </CardMedia>
                                    <div>
                                    <TextField floatingLabelText="Full Name" value={this.state.fullName}  style={styles.style} underlineShow={false}
                                      disabled={this.state.disabled} onChange={(e)=>this.setState({fullName:e.target.value})}/>
                                      <Divider/>
                                      <TextField floatingLabelText="Address" value={this.state.address}  style={styles.style} underlineShow={false}
                                      disabled={this.state.disabled} onChange={(e)=>this.setState({address:e.target.value})}/>
                                      <Divider/>
                                      <TextField floatingLabelText="Contact No" type="number" value={this.state.contactNo} style={styles.style} underlineShow={false}
                                        disabled={this.state.disabled} onChange={(e)=>this.setState({contactNo:e.target.value})}/>
                                      <Divider></Divider>
                                      <CardActions>
                                    {(this.state.update)?
                                          <RaisedButton label="Update" primary={true} onClick={this.updateProfile} 
                                            style={{height:"50",fontWeight:"bold"}} labelStyle={{fontSize:'24px'}} fullWidth={true}/>:
                                          <RaisedButton label="Edit" primary={true} onClick={this.editProfile} fullWidth={true}
                                          style={{height:"50",fontSize:'30%'}}
                                          labelStyle={{fontSize:'24px'}}
                                          /> 
                                        }
                                    </CardActions>
                                    </div>
            </Card>
        </div>
      )
    }

  }
  const mapStateToProps = (state) => {
    return{
        user: state.dataReducer.userProfile,
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getUserProfileData: (test) => dispatch(getUserProfileData(test)),
    startUpdateUser: (data) => dispatch(startUpdateUser(data)),
    })
  
  export default connect(mapStateToProps, mapDispatchToProp)(Profile);