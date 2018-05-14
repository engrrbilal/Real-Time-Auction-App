import React from 'react';
import {connect} from 'react-redux'
import '../App.css';
import * as firebase from 'firebase';
import history from '../history';
import { getAuctionsData} from '../actions/dataActions';
import { dataReducer} from '../reducers/dataReducer';
import index from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Computers from './Computers';
import Mobiles from './Mobiles';
import Electronics from './Electronics';
import Cameras from './Cameras';
import Others from './Others';

class Bidder extends React.Component{
  
    constructor(props){
      super(props);
    this.state ={
      displayName:'',
      userUid:'',
      fullImage: false,
    }
    }
  
    componentWillMount(){
      {this.props.getAuctionsData({
        bidder:"from bidder getting data"
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
  categoryHandler = (category)=>{
    console.log(category)
    if(category === "Mobiles"){
      history.push('/home/bidder/mobiles')
    }
    else if(category === "Computers"){
      history.push('/home/bidder/computers')
    } 
    else if(category === "Cameras"){
      history.push('/home/bidder/cameras')
    } 
    else if(category === "Electronics"){
      history.push('/home/bidder/electronics')
    } 
    else {
      history.push('/home/bidder/others')
    } 
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
      return(
        <div className="signBackground" style={{width:"100%",height:300}}>
            <h1 style={{color:"black",fontSize:"40px",fontFamily:"Times New Roman",
              textAlign: 'center',marginTop:"5%"}}>
                Select an Auction category             
            </h1>
            <div style={styles.root}>
            <GridList style={styles.gridList} cols={4} cellHeight={200}>
              {tilesData.map((tile,index) => (
                <GridTile
                key={tile.index}
                title={<span style={{fontSize:"24px",fontWeight:"bold"}}>{`${tile.title}`}</span>}
              >
                  <img src={tile.img} onClick={()=>this.categoryHandler(tile.title)} style={styles.hoverCursor}/>
                </GridTile>
              ))}
            </GridList>
            </div> 
        </div>
      )
    }

  }
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    auctionsData:state.dataReducer.auctionsData
  }
}
const mapDispatchToProp = (dispatch) =>({
   getAuctionsData: (userDetails) => dispatch(getAuctionsData(userDetails))
})
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "90%",
    height: "200px",
    overflowY: 'auto',
  },

  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  hoverCursor:{
    cursor: "pointer",
  },
};
  export default connect(mapStateToProps, mapDispatchToProp)(Bidder);