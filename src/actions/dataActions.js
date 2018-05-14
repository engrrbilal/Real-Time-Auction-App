import * as firebase from 'firebase'
import history from '../history';

// START-SUBMIT-AUCTION
export const submitAuction = (data,flag) => ({
  type: 'START-SUBMIT-AUCTION',
  data,
  flag
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
        const flag=true
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
                      dispatch(submitAuction(auctionData,flag));
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
  data,
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
      id='nouser',
      fullName='',
      contactNo= "Not added",
      address ="Not added",
      img=""
      } = updates;
    console.log(updates)
    firebase.storage().ref(`/Images/${updates.id}/${new Date().getTime()}`).put(img)
                .then((snap) => {
                  updates.img = snap.metadata.downloadURLs[0];
                  firebase.database().ref(`Users/${updates.id}`).update(updates).then(() => {
                    dispatch(updateUser(updates));
                    alert("Your Profile has updated !")
                  })
                })
                .catch((error) => {
                    console.log(error);
              });
  };
};
