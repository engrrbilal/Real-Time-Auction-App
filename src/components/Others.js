import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';
import { getAuctionsData,startSubmitBid,getUsersData} from '../actions/dataActions';
import { dataReducer} from '../reducers/dataReducer';
import index from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Spinner} from './Spinner';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import {GridList, GridTile} from 'material-ui/GridList';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
class Others extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      displayName:'',
      userUid:'',
      open:false,
      open2:false,
      open3:false,
      index:0,
      bidIndex:'',
      bid:'',
      auctionPushKey:''
    }
    }
  
    componentWillMount(){
      {this.props.getAuctionsData({
        bidder:"from bidder getting data"
      })}
      console.log(this.props.getUsersData)
      {this.props.getUsersData({
        auctioner:"from auctioner getting data"
      })}
      firebase.auth().onAuthStateChanged((user) => {
        
          if (user) {
              this.setState({ 
                userUid:user.uid,
                displayName:user.displayName
               });
          } 
      });
  }
  renderButton(auctionerUid,auctionBid,index,pushKey,auctionDay,auctionMonth,auctionYear,endTime){
    let bidIndex = index
    let auctionPushKey = pushKey
    let todayDate = new Date()
    let currentTime = new Date(todayDate).getTime()
    let currentDay = todayDate.getDate()
    let currentMonth = todayDate.getMonth()
    let currentYear = todayDate.getFullYear()
    if((currentDay>auctionDay && currentMonth>=auctionMonth && currentYear>=auctionYear )||
    (currentDay === auctionDay && currentMonth===auctionMonth && currentYear===auctionYear && currentTime>endTime)){
        if(auctionerUid === this.state.userUid) {
            return (
                <div>
                    <RaisedButton label="View Bid" secondary={true}
                     onClick={()=>this.openViewBids(index,auctionPushKey)}/> 
                    <RaisedButton label="Bid Expired" disabledBackgroundColor="red" 
                    disabled={true} disabledLabelColor="white" style={{float:"right"}}
                    onClick={()=>this.openViewBids(index,auctionPushKey)}/>
                    
                </div>
            )
        }
        else{
            return (
                <RaisedButton label="Bid Expired" disabledBackgroundColor="red" disabled={true} disabledLabelColor="white"
                onClick={()=>this.openViewBids(index,auctionPushKey)}/>
            )
        }
    }
    else{
        if (auctionerUid === this.state.userUid) {
            return (
                <RaisedButton label="View Bid" primary={true} 
                onClick={()=>this.openViewBids(index,auctionPushKey)}/>
            )
        }
        else{
            return (
                <div>
                    <RaisedButton label="Bid" primary={true} 
                        onClick={()=>this.handleOpenBid(index,auctionPushKey)}/>
                    <span> {auctionBid} rs</span>
                </div>
            );
        }
    }
}
  handleOpen = (index) => {
    this.setState({
        open: true,
        index:index
    });
    console.log(index)
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleCloseViewBid = () => {
    this.setState({open3: false});
  };
  handleCloseBid = () => {
    this.setState({open2: false,bid:''});
  };
  openViewBids=(bidIndex,auctionPushKey)=>{
    console.log(bidIndex)
    console.log(auctionPushKey)
    this.setState({
        open3: true,
        bidIndex:bidIndex
    });
}
  handleOpenBid=(bidIndex,auctionPushKey)=>{
    console.log(bidIndex)
    console.log(auctionPushKey)
    this.setState({
        open2: true,
        bidIndex:bidIndex,
        auctionPushKey:auctionPushKey
    });
}
    submitBid=()=>{
        {this.props.auctionsData.map((auction,index) => {
            if(auction.category === "Others"){
                if(index === this.state.bidIndex){
                    if(this.state.bid <= Number(auction.bid)){
                        alert(`Bid must be greater than : ${auction.bid} rs`)
                    }
                    else if(this.state.bid > "900000000000"){
                        alert(`Bid must be less than or equal to: 900000000000 rs`)

                    }
                    else{
                        this.props.startSubmitBid({
                            bid:this.state.bid,
                            bidderUid:this.state.userUid,
                            auctionPushKey:this.state.auctionPushKey
                        })
                        this.setState({
                            open2: false,
                            bidIndex:'',
                            bid:'',
                            auctionPushKey:''
                        })
                    }
                }
        }
    })}
    }
    render(){
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
        ];
        const actions2 = [
            <FlatButton
              label="cancel"
              primary={true}
              onClick={this.handleCloseBid}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.submitBid}
            />,
        ];
        const actions3 = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleCloseViewBid}
            />,
        ];
      return(
        <div className="signBackground">
            {/* <h1 style={{color:"black",fontSize:"40px",fontFamily:"Times New Roman",
            textAlign: 'center'}}>
                Others           
            </h1> */}
            <div style={styles.root}>
                    {this.props.auctionsData.map((auction,index) => {
                        if(auction.category === "Others"){
                            return(
                                <div key={index}>
                                <Card style={styles.card}>
                                    <CardMedia
                                    style={styles.hoverCursor}
                                    onClick={()=>this.handleOpen(index)}
                                        overlay={<CardTitle title={auction.productName} subtitle={`Intial amount:${auction.amount}`} />}
                                    >
                                    <img src={auction.img}  alt="image" style={{width:"200px",height:"250px"}} onmouseover="bigImg(this)" onmouseout="normalImg(this)"/>
                                    </CardMedia>
                                    <CardActions>
                                    {this.renderButton(auction.userUid,auction.bid,index,auction.id,auction.auctionDay,
                                        auction.auctionMonth,auction.auctionYear,auction.endTime)}
                                    </CardActions>
                                    <div>
                                        <span style={{color:"blue",fontWeight:"bold"}}>Description</span>
                                        <p style={{width: "280px",textOverflow: "ellipsis",whiteSpace: "nowrap",overflow:"hidden"}}>{auction.description}</p>
                                    </div>
                                </Card>
                                </div>
                            )
                        }
                    })
                }
                    <Dialog 
                        title="Product Details"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        style={{maxWidth:"90%"}}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClose}
                    >
                    {this.props.auctionsData.map((auction,index) => {
                        if(auction.category === "Others"){
                            if(index === this.state.index){
                                let endTimeHours=new Date(auction.endTime).getHours()
                                let endTimeMinutes=new Date(auction.endTime).getMinutes()
                                let endTime = `${endTimeHours}:${endTimeMinutes}`
                                return(
                                    <div style={{width: '100%', height: 'auto'}} key={index}>
                                        <img src={auction.img} style={{width: '100%', height: 'auto'}}   alt="image"  onClick={()=>this.handleClose(index)}/>
                                        <hr/>
                                        <p style={{maxlength:"600px"}}>Product Description: {auction.description}</p>
                                        <p>End Date: <span style={styles.highlight}>{`${auction.auctionDay}/${auction.auctionMonth}/${auction.auctionYear}`}</span></p>                
                                        <p>End Time: <span style={styles.highlight}>{endTime}</span></p>                
                                        <p>Intial Amount: <span style={styles.highlight}>{auction.amount} rs</span></p>
                                        <p>Last Bid:{auction.bid} rs</p>
                                        {this.renderButton(auction.userUid,auction.bid,index,auction.id,auction.auctionDay,auction.auctionMonth,auction.auctionYear,auction.endTime)}
                                    </div>
                                )
                            }
                    }})}
                    </Dialog>
                    <Dialog 
                        title="Bid"
                        actions={actions2}
                        modal={false}
                        open={this.state.open2}
                        onRequestClose={this.handleCloseBid}
                        style={{alignText:"center"}}
                    >
                    {this.props.auctionsData.map((auction,index) => {
                        if(auction.category === "Others"){
                            if(index === this.state.bidIndex){
                                return(
                                    <div style={{width: '100%', height: 'auto'}} key={index}>
                                        <hr/>
                                        <p>{`Intial amount:${auction.amount} rs`}</p>
                                        <p>Last Bid:{auction.bid} rs</p>
                                        <TextField hintText="Enter your bid ..." type="number" value={this.state.bid}
                                        onChange={(e)=>{this.setState({bid:e.target.value})}}/>
                                    </div>
                                )
                                
                            }
                    }})}
                    </Dialog>
                    <Dialog 
                        title="View Bid"
                        actions={actions3}
                        contentStyle={styles.customContentStyle}
                        modal={false}
                        open={this.state.open3}
                        onRequestClose={this.handleCloseViewBid}
                        style={{alignText:"center"}}
                    >
                    <Table >
                          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow style={{textAlign:"center"}}>
                              <TableHeaderColumn style={{fontSize:"36",fontWeight:"bold",color:"blue"}}>Name</TableHeaderColumn>
                              <TableHeaderColumn style={{fontSize:"36",fontWeight:"bold",color:"blue"}}>Email</TableHeaderColumn>
                              <TableHeaderColumn style={{fontSize:"36",fontWeight:"bold",color:"blue"}}>Address</TableHeaderColumn>
                              <TableHeaderColumn style={{fontSize:"36",fontWeight:"bold",color:"blue"}}>Contact No</TableHeaderColumn>
                              <TableHeaderColumn style={{fontSize:"36",fontWeight:"bold",color:"blue"}}>Bid</TableHeaderColumn>
                            </TableRow>
                          </TableHeader>
                          <TableBody stripedRows={true} displayRowCheckbox={false}>
                          {this.props.auctionsData.map((auction,index) => {
                            if(auction.category === "Others"){
                                if(index === this.state.bidIndex){
                                    return(
                                        this.props.usersData.map((user) => {
                                            if(auction.bidderUid === user.id){
                                                return(
                                                    <TableRow key={user} >
                                                        <TableRowColumn style={{fontSize:"24",fontWeight:"bold"}}>{user.fullName}</TableRowColumn>
                                                        <TableRowColumn style={{fontSize:"24",fontWeight:"bold"}}>{user.email}</TableRowColumn>
                                                        <TableRowColumn style={{fontSize:"24",fontWeight:"bold"}}>{user.address?user.address:"Not added"}</TableRowColumn>
                                                        <TableRowColumn style={{fontSize:"24",fontWeight:"bold"}}>{user.contactNo?user.contactNo:"Not added"}</TableRowColumn>
                                                        <TableRowColumn style={{fontSize:"24",fontWeight:"bold"}}>{auction.bid} rs</TableRowColumn>
                                                    </TableRow>
                                                )
                                            }
                                        })
                                    )
                                }
                    }})}
                  </TableBody>
                </Table>
                    
            </Dialog>
            </div>        
        </div>
      )
    }  }
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    auctionsData:state.dataReducer.auctionsData,
    usersData: state.dataReducer.usersData
  }
}
const mapDispatchToProp = (dispatch) =>({
   getAuctionsData: (test) => dispatch(getAuctionsData(test)),
   getUsersData: (test) => dispatch(getUsersData(test)),
   startSubmitBid: (userDetails) => dispatch(startSubmitBid(userDetails))
})
export default connect(mapStateToProps, mapDispatchToProp)(Others);
const styles = {
  card: {
    minHeight:'20%',
    padding: '2px',
    maxWidth:300,
    margin: 3,
    display: 'inline-block',
    background: 'rgba(0,0,0,0.2)',
},
root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin:"0 auto",
    maxHeight:"780px",
    maxWidth:"80%",
    marginTop:"1%",
    justifyContent:"center",
    alignItems: "center",
    overflowY: 'auto',
  },
  hoverCursor:{
    cursor: "pointer",
  },
  customContentStyle: {
    width: '70%',
    maxWidth: 'none',
  },
};
