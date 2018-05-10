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
      history.push('./mobiles')
    }
    else if(category === "Computers"){
      history.push('./computers')
    } 
    else if(category === "Cameras"){
      history.push('./cameras')
    } 
    else if(category === "Electronics"){
      history.push('./electronics')
    } 
    else {
      history.push('./others')
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
        },
      ];
      return(
        <div className="signBackground" style={{width:"100%",height:600}}>
            <h1 style={{color:"black",fontSize:"40px",fontFamily:"Times New Roman",
            textAlign: 'center',marginTop:"10%"}}>
                          Select an Auction category             
            </h1>
            <div style={styles.root}>
            <GridList style={styles.gridList} cols={2.2} cellHeight={200}>
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={<span style={{fontSize:"24px",fontWeight:"bold"}}>{`${tile.title}`}</span>}
                  // actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                  titleStyle={styles.titleStyle}
                  titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                  <img src={tile.img} onClick={()=>this.categoryHandler(tile.title)}/>
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
    // justifyContent: 'space-around',
    margin:"0 auto",
    maxWidth:"70%",
    marginTop:"10%",
    justifyContent:"center",
    alignItems: "center"
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};
  export default connect(mapStateToProps, mapDispatchToProp)(Bidder);