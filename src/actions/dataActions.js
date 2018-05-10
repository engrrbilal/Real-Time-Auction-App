import * as firebase from 'firebase'
import history from '../history';

// START-SUBMIT-AUCTION
export const submitAuction = (data) => ({
  type: 'START-SUBMIT-AUCTION',
  data
});

export const startSubmitAuction = (auctionData = {}) =>{
  console.log("creating account ...");
  return dispatch =>{
      const {
        productName='',
        description='',
        auctionDay='',
        auctionMonth='',
        auctionYear='',
        endTime='',
        category='',
        amount='',
        img='',
        displayName='',
        userUid=''
        } = auctionData;
        let auctionRef = firebase.database().ref("/Auctions/").push()
        let auctionPushKey =  auctionRef.getKey()
        firebase.storage().ref(`/Images/${userUid}/${new Date().getTime()}`).put(img)
                .then((snap) => {
                  auctionData.img = snap.metadata.downloadURLs[0];
                    auctionRef.set({
                      productName:productName,description:description,bid:amount,auctionDay:auctionDay,auctionMonth:auctionMonth,
                      auctionYear:auctionYear,endTime:endTime,category:category,amount:amount,img:auctionData.img,displayName:displayName,
                      userUid:userUid,auctionPushKey:auctionPushKey
                    }).then(() => {
                      dispatch(submitAuction(auctionData));
                      alert(`Auction has submitted successfully!`)
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
  }   
}
// START-SUBMIT-BID
export const submitBid = (data) => ({
  type: 'START-SUBMIT-BID',
  data
});

export const startSubmitBid = (bidData = {}) =>{
  console.log("creating account ...");
  return dispatch =>{
      const {
        bid="",
        bidderUid="",
        auctionPushKey=""
        } = bidData;
        console.log(auctionPushKey)
        firebase.database().ref(`/Auctions/${auctionPushKey}/`).update({bid:bid,bidderUid:bidderUid})
                .then(() => {
                  dispatch(submitBid(bidData));
                  alert(`You have submitted bid : ${bid} successfully!`)
                })
                .catch((error) => {
                    console.log(error);
                });
  }   
}
// AUCTIONS-DATA
export const auctionsData = (data) => ({
  type: 'AUCTIONS-DATA',
  data:data
});
export const getAuctionsData = (test={}) => {
  return (dispatch) => {
    firebase.database().ref("Auctions").on('value',(snapshot) => {
      const data = [];

      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      console.log(data)
      dispatch(auctionsData(data));
    })
  };
};








// USER-DATA
export const usersData = (data) => ({
    type: 'USER-DATA',
    data
  });
  export const getUsersData = (test={}) => {
    return (dispatch) => {
      firebase.database().ref("Users").on('value',(snapshot) => {
        const data = [];
  
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        console.log(data)
        dispatch(usersData(data));
      })
    };
  };
  //USER-PROFILE-DATA
  export const userProfileData = (data) => ({
    type: 'USER-PROFILE-DATA',
    data
  });
  export const getUserProfileData = (test={}) => {
    console.log(test)
    return (dispatch) => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`Users/${user.uid}`).on("value", snap => {
                let profileData = snap.val();
                // console.log(dbdata)
                dispatch(userProfileData(profileData))
            })
        }

    })
    };
  };
// UPDATE-USER
export const updateUser = (updates) => ({
  type: 'UPDATE-USER',
  updates:updates
});

export const startUpdateUser= (updates={}) => {
  return (dispatch) => {
    const {
      id='',
      fullName='',
      contactNo= "",
      address ="",
      } = updates;
    console.log(updates)
          return firebase.database().ref(`Users/${updates.id}`).update(updates).then(() => {
            dispatch(updateUser(updates));
            alert("Your Profile has updated !")
          })
  };
};
// DELETE-USER
export const deleteUser = (data) => ({
  type: 'DELETE-USER',
  data
});
export const startDeleteUser = (data1={}) => {
  return (dispatch) => {
            firebase.database().ref(`Users/${data1.userUid}`).remove()
            
            .then(()=>{
              console.log(data1.userUid)
              alert("User and it's bookings have removed sucessfully!")
              dispatch(deleteUser(data1));
            }).catch((e)=>console.log("Error while removing User",e))
            firebase.database().ref("ParkingAreas").on('value',snapshot=> {
              const data = [];
              snapshot.forEach((childSnapshot) => {
                data.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val()
                });
              });
              data.map((bookings)=>{
                (bookings.Slots)?
                bookings.Slots.map((slotRef,index)=>{
                  slotRef.Bookings?Object.keys(slotRef.Bookings).map((slot)=>{
                        if(slotRef.Bookings[slot].userUid===data1.userUid){
                          console.log(slotRef.Bookings[slot].userUid)
                          console.log(bookings.pushKey)
                          console.log(slotRef.Bookings[slot].bookingPushKey)
                          console.log(index)
                          firebase.database().ref(`/ParkingAreas/${bookings.pushKey}/Slots/${index}/Bookings/${slotRef.Bookings[slot].bookingPushKey}/`).update({booked:"false",
                            startTime:'',endTime:'',userUid:'',parkingArea:'',parkingPlace:'',bookingPushKey:''})
                  }
                }):""
                }):console.log("no slots")
              })
            })
        };
};
