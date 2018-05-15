import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import history from '../history';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Computers from './Computers';
import Mobiles from './Mobiles';
import Electronics from './Electronics';
import Cameras from './Cameras';
import Others from './Others';
import RaisedButton from 'material-ui/RaisedButton';

import { getAuctionsData,startSubmitAuction} from '../actions/dataActions';
import { dataReducer} from '../reducers/dataReducer';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Spinner} from './Spinner';
import Description from 'react-icons/lib/md/description'
const routes = [
  {
    path: "/home/bidder/mobiles",
    exact: true,
    sidebar: () => <Mobiles/>,
    main: () => <Mobiles/>
  },
  {
    path: "/home/bidder/computers",
    exact: true,
    sidebar: () => <Computers/>,
    main: () => <Computers/>
  },
  {
    path: "/home/bidder/electronics",
    exact: true,
    sidebar: () => <Electronics/>,
    main: () => <Electronics/>
  },
  {
    path: "/home/bidder/cameras",
    exact: true,
    sidebar: () => <Cameras/>,
    main: () => <Cameras/>
  },
  {
    path: "/home/bidder/others",
    exact: true,
    sidebar: () => <Others/>,
    main: () => <Others/>
  }
];


class Home extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      loggedIn: null,
      slideIndex: 0,
      displayName:'',
      userUid:'',
      productName: '',
      discription: '',
      minDate:'',
      endTime: '',
      category: '',
      amount: null,
      error: '',
      route: false,
      img: '',
      imgValue: 0,
      loading:false,
      flag:''

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
  handleChangeTab = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  categoryHandler = (category)=>{
    console.log(category)
    if(category === "Mobiles"){
      this.setState({
        flag:'mobile'
      })
      // history.push('/home/bidder/mobiles')
    }
    else if(category === "Computers"){
      this.setState({
        flag:'computer'
      })
      // history.push('/home/bidder/computers')
    } 
    else if(category === "Cameras"){
      this.setState({
        flag:'camera'
      })
      // history.push('/home/bidder/cameras')
    } 
    else if(category === "Electronics"){

      this.setState({
        flag:'electronic'
      })
      // history.push('/home/bidder/electronics')
    } 
    else {
      this.setState({
        flag:'other'
      })
      // history.push('/home/bidder/others')
    } 
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
       {this.setState({loading:true})}
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
        setTimeout(() => {
          this.setState({
          loading: false,
        })
      }, 3500);
      }
     }
     renderButton(){
      if (this.state.loading) {
          return <center><Spinner/></center>
      }
      return(
        <center>
          <RaisedButton type='submit' label="Submit" primary={true} style={{width:"70%",fontWeight:"bold"}}/>
        </center>
      );
  }
    render(){
      const tilesData = [
        {
          img: require(".././images/mobiles.jpg"),
          title: 'Mobiles',
        },
        {
          img: require(".././images/computers.png"),
          title: 'Computers',
        },
        {
          img: require(".././images/cameras.jpeg"),
          title: 'Cameras',
        },
        {
          img: require(".././images/electronics.jpg"),
          title: 'Electronics',
        },
        {
          img: require(".././images/others.jpg"),
          title: 'Others',
        }
      ];
      let todayDate = new Date()
      return(
            <div>
                  <Tabs
                    onChange={this.handleChangeTab}
                    value={this.state.slideIndex}
                  >
                    <Tab label="Bidder" value={0} />
                    <Tab label="Auctioner" value={1} />
                  </Tabs>
                  <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChangeTab}
                  >
                  <div style={{display:"inline-flex"}}>
                    <div style={styles.root}>
                      <Card zDepth={2}>
                          <CardHeader
                            title="Categories"
                          />
                          <GridList style={styles.gridList} cols={1} cellHeight={142}>
                        {tilesData.map((tile,index) => (
                          <GridTile
                          key={tile.index}
                          title={<span style={{fontSize:"16px",fontWeight:"bold"}}>{`${tile.title}`}</span>}
                        >
                            <img src={tile.img} onClick={()=>this.categoryHandler(tile.title)} style={styles.hoverCursor}/>
                          </GridTile>
                        ))}
                      </GridList>
                      </Card>
                  </div>
                  <div>
                    {this.state.flag==='mobile'?<Mobiles/>:this.state.flag==='computer'?<Computers/>:
                    this.state.flag==='camera'?<Cameras/>:this.state.flag==='electronic'?<Electronics/>:<Others/>}
                  </div>
                  </div>
                <div style={styles.slide}>
                <form onSubmit={this.submitForm}>
                    <Paper zDepth={4}style={styles.style}>
                                <h1 style={{color:"blue",fontFamily:"Times New Roman",textAlign: 'center'}}>
                                    Auction
                                </h1>
                                <Divider />
                                <TextField
                                      floatingLabelText="Product Name"
                                      required
                                      width="60%"
                                      style={{marginLeft:"20px"}}
                                      // underlineShow={false}
                                      value={this.state.productName}
                                      onChange={(e)=> this.setState({productName: e.target.value})}                            
                                  />
                                  <Divider />
                                  <TextField
                                  iconElementLeft={<Description />}
                                      floatingLabelText="Discription"
                                      required  
                                      style={{marginLeft:"20px"}}
                                      // underlineShow={false}
                                      value={this.state.description}                      
                                      onChange={(e)=> this.setState({description: e.target.value})}                            
                                  />
                                  <Divider />
                                  <DatePicker
                                      floatingLabelText="Auction End Date"
                                      autoOk
                                      required   
                                      style={{marginLeft:"20px"}}
                                      // underlineShow={false}                         
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
                                      // underlineShow={false}   
                                      value={this.state.endTime}                       
                                      onChange={this.handleChangeTime}
                                  />
                                  <Divider />
                                  <SelectField style={{lineHeight: '60px'}} style={{marginLeft:"20px", width: 360}}
                                    underlineShow={false} value={this.state.category}
                                    onChange={this.handleChange} hintText="Category" floatingLabelText="Category" iconStyle={{backgroundColor:"gray"}}>
                                      <MenuItem value='Computers' primaryText='Computers' />
                                      <MenuItem value='Mobiles' primaryText='Mobiles' />
                                      <MenuItem value='Cameras' primaryText='Cameras' />
                                      <MenuItem value='Electronics' primaryText='Electronics Item' />
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
                                      // underlineShow={false}
                                      value={this.state.amount}
                                      onChange={(e)=> this.setState({amount: e.target.value})}
                                  />
                                  <Divider />
                                  <p style={{color: 'red'}}>{this.state.error}</p>
                                  {this.renderButton()}   
                    </Paper>
                  </form>
                </div>
              </SwipeableViews>
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
    root: {
      flexWrap: 'wrap',
      // width:"70%",
      justifyContent: 'space-around',
      // display:"inline-flex"
    },
    gridList: {
      width: "200px",
      height: "auto",
      // overflowY: 'auto',
    },
  
    titleStyle: {
      color: 'rgb(0, 188, 212)',
    },
    hoverCursor:{
      cursor: "pointer",
    },
    style : {
      height: 630,
      width: 500,
      // backgroundColor:"lightGrey",
      marginTop: "7%",
      marginLeft:"37%",
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
  const mapStateToProps = (state)=>{
    console.log(state)
    return{
      auctionsData:state.dataReducer.auctionsData
    }
  }
  const mapDispatchToProp = (dispatch) =>({
     getAuctionsData: (userDetails) => dispatch(getAuctionsData(userDetails)),
     startSubmitAuction: (data) => dispatch(startSubmitAuction(data))
  })
  export default connect(mapStateToProps, mapDispatchToProp)(Home);