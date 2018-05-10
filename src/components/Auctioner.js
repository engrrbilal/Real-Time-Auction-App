import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import { startSubmitAuction} from '../actions/dataActions';
import {Spinner} from './Spinner';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import history from '../history';
import LinearProgress from 'material-ui/LinearProgress';

class Auctioner extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      displayName:'',
      userUid:'',
      productName: '',
      discription: '',
      minDate:'',
      endTime: '',
      category: '',
      amount: 0,
      error: '',
      route: false,
      img: '',
      imgValue: 0,
    }
    }
    componentWillMount(){
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ 
                  userUid:user.uid,
                  displayName:user.displayName
               });
          } else {
              this.setState({ loggedIn: false });
          }
      });
  }
  handleChangeMinDate = (event, date) => {
    // console.log(date);        
    this.setState({
        minDate: date,
    });
};
handleChange = (event, index, value) => {this.setState({category: value})};
handleChangeTime = (event, time) => {
    this.setState({
        endTime: time,
    });
};
  submitForm =(e)=>{
    e.preventDefault()
    let todayDate = new Date()
    let currentTime = new Date(todayDate).getTime()
    let currentDay = todayDate.getDate()
    let currentMonth = todayDate.getMonth()
    let currentYear = todayDate.getFullYear()
    let auctionDate = this.state.minDate
    let auctionDay = auctionDate.getDate()
    let auctionMonth = auctionDate.getMonth()
    let auctionYear = auctionDate.getFullYear()
    let bookingEndTime = this.state.endTime;
    let endTime=new Date(bookingEndTime).getTime()
    if((currentDay===auctionDay && currentMonth===auctionMonth && currentYear===auctionYear) &&
        (currentTime>endTime)){
        alert("Please Select the time correctly!")
                
     }
     else{
        this.props.startSubmitAuction({
          productName:this.state.productName,
          description:this.state.description,
          auctionDay:auctionDay,
          auctionMonth:auctionMonth,
          auctionYear:auctionYear,
          endTime:endTime,
          category:this.state.category,
          amount:this.state.amount,
          img:this.state.img,
          displayName:this.state.displayName,
          userUid:this.state.userUid,
          loading:false
        })
        this.setState({
          productName:'',
          description:'',
          auctionDay:'',
          auctionMonth:'',
          auctionYear:'',
          minDate:'',
          endTime:'',
          category:'',
          amount:'',
          img:'',
          imgValue:'',
          displayName:'',
          userUid:''
        })
      }
     }
     renderButton(){
      if (this.state.loading) {
          return <Spinner/>;
      }
      return(
          <RaisedButton type='submit' label="Submit" primary={true} style={{marginLeft:"40%"}}/>
      );
  }
    render(){
      let todayDate = new Date()
      return(
        <form onSubmit={this.submitForm}>
          <Paper zDepth={4}style={styles.style}>
                      <h1 style={{color:"blue",fontFamily:"Times New Roman",textAlign: 'center'}}>
                          Auction
                          
                      </h1>
                      <Divider />
                      <TextField
                            floatingLabelText="Product Name"
                            required
                            style={{marginLeft:"20px"}}
                            underlineShow={false}
                            value={this.state.productName}
                            onChange={(e)=> this.setState({productName: e.target.value})}                            
                        />
                        <Divider />
                        <TextField
                            floatingLabelText="Discription"
                            required  
                            style={{marginLeft:"20px"}}
                            underlineShow={false}
                            value={this.state.description}                      
                            onChange={(e)=> this.setState({description: e.target.value})}                            
                        />
                        <Divider />
                        <DatePicker
                            floatingLabelText="Auction End Date"
                            autoOk
                            required   
                            style={{marginLeft:"20px"}}
                            underlineShow={false}                         
                            minDate={todayDate}
                            value={this.state.minDate}
                            onChange={this.handleChangeMinDate}
                        />
                        <Divider />
                        <br/>
                        <TimePicker
                            hintText='Auction End Time'
                            autoOk={true}
                            required  
                            style={{marginLeft:"20px"}}
                            underlineShow={false}   
                            value={this.state.endTime}                       
                            onChange={this.handleChangeTime}
                        />
                        <Divider />
                        <SelectField style={{lineHeight: '60px'}} style={{marginLeft:"20px", width: 360}}
                          underlineShow={false} value={this.state.category}
                          onChange={this.handleChange} hintText="Category" floatingLabelText="Category" >
                            <MenuItem value='Computers' primaryText='Computers' />
                            <MenuItem value='Mobiles' primaryText='Mobiles' />
                            <MenuItem value='Cameras' primaryText='Cameras' />
                            <MenuItem value='electronics' primaryText='Electronics Item' />
                            <MenuItem value='Others' primaryText='Others' />
                        </SelectField>
                        <Divider />
                        <input required='required' type='file'
                        style={{marginLeft:"20px",marginTop:"20px"}}
                         onChange={(e) => this.setState({img: e.target.files[0], imgValue: 100})}
                          />
                          <LinearProgress mode="determinate" style={{marginTop:"20px"}} value={this.state.imgValue} />
                          <Divider />
                        <TextField
                            type='number'
                            floatingLabelText="Starting Amount"
                            required
                            style={{marginLeft:"20px"}}
                            underlineShow={false}
                            value={this.state.amount}
                            onChange={(e)=> this.setState({amount: e.target.value})}
                        />
                        <Divider />
                        <p style={{color: 'red'}}>{this.state.error}</p>
                        {this.renderButton()} 
                        {/* <RaisedButton label="Close" onClick={history.push('./home6')}/> */}
                        
          </Paper>
        </form>
      )
    }

  }
  const styles = {
    style : {
      height: 630,
      width: 500,
      backgroundColor:"lightGrey",
      marginTop: "7%",
      marginLeft:"40%",
      display: 'inline-block',
      opacity:"0.9",
    },
    progress: {
        width: '66.5%', 
        height: '10px', 
        margin: '8px',
    },
    customWidth: {
      width: 350,
    },
    customContentStyle : {
      width: 450,
      maxWidth: 'none',
    }
  };
  const mapDispatchToProp = (dispatch) =>({
    startSubmitAuction: (data) => dispatch(startSubmitAuction(data))
  })
  
  export default connect(undefined, mapDispatchToProp)(Auctioner);