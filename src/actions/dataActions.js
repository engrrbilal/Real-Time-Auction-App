import * as firebase from 'firebase'
import history from '../history';

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
// USER-FEEDBACK
export const userFeedback = (data) => ({
  type: 'USER-FEEDBACK',
  data:data
});

export const submitUserFeedback= (Feedback={}) => {
  return (dispatch) => {
    let keyRef = firebase.database().ref(`UsersFeedbacks/`).push()
    let feedbackPushKey = keyRef.getKey()
    const {
      feedback='',
      userUid='',
      userName='',
      } = Feedback;
          keyRef.set({feedback:feedback,userUid:userUid,userName:userName,feedbackPushKey:feedbackPushKey})
          .then(() => {
            dispatch(userFeedback(Feedback,feedbackPushKey));
            alert("your feedback has submitted ! Thanx for your feedback ")
          })
  };
};
// USER-FEEDBACK-REPLY
export const feedbackReply = (data) => ({
  type: 'USER-FEEDBACK-REPLY',
  data:data
});

export const userFeedbackReply= (replyData={}) => {
  return (dispatch) => {
    
    const {
      userUid='',
      replyFeedbackPushKey='',
      displayName='',
      reply=''
      } = replyData;
      console.log(userUid)
      console.log(replyFeedbackPushKey)
      console.log(displayName)
      console.log(reply)
      let keyRef = firebase.database().ref(`UsersFeedbacks/${replyFeedbackPushKey}/Reply/`).push()
          keyRef.set({userUid:userUid,replyFeedbackPushKey:replyFeedbackPushKey,displayName:displayName,reply:reply})
          .then(() => {
            dispatch(feedbackReply(replyData))
          })
  };
};
// USER-FEEDBACKS-DATA
export const usersFeedbackData = (data) => ({
  type: 'USER-FEEDBACKS-DATA',
  data
});
export const getUsersFeedbackData = (test={}) => {
  console.log(test)
  return (dispatch) => {
    firebase.database().ref("UsersFeedbacks").on('value',(snapshot) => {
      const data = [];

      snapshot.forEach((childSnapshot) => {
        data.push({
          ...childSnapshot.val()
        });
      });
      // console.log(data[0].feedback)
      dispatch(usersFeedbackData(data));
    })
  };
};
  // ADD-AREA
  export const addArea = (data,parkingSlots) => ({
    type: 'ADD-AREA',
    data:data,
    parkingSlots:parkingSlots
  });
  
  export const startAddArea= (parkingArea={}) => {
    return (dispatch) => {
      const pushRef = firebase.database().ref("ParkingAreas").push()
            const pushKey = pushRef.getKey()
            console.log(pushKey)
      const {
        area='',
        place= "",
        slots=0,
        } = parkingArea;
      console.log(parkingArea)
            
            pushRef.set({area,place,pushKey}).then(() => {
              let parkingSlots=[]
              console.log(slots.length)
              for(let i=0;i<slots;i++){
                console.log(i)
                parkingSlots.push({
                  slot:i+1
                })
              }
              const slotRef = firebase.database().ref(`/ParkingAreas/${pushKey}/Slots/`)
              slotRef.set(parkingSlots)
              dispatch(addArea(parkingArea,parkingSlots));
              alert("New Parking area has been added !")
          })
    };
  };
  // AREA-DATA
export const areaData = (data) => ({
  type: 'AREA-DATA',
  data
});
export const getAreaData = (test={}) => {
  return (dispatch) => {
    firebase.database().ref("ParkingAreas").on('value',snapshot=> {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(areaData(data));
      firebase.database().ref("ParkingAreas").on('value',snapshot=> {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      })
    })
  };
};
 // START-BOOKING
 export const bookingData= (data) => ({
  type: 'START-BOOKING',
  data
});
export const startBooking = (booking={}) => {
  return (dispatch) => {
    const {
      bookingDay='',
      bookingMonth='',
      bookingYear='',
      startTime='',
      endTime='',
      selectedSlotsIndex=[],
      userUid='',
      pushKey='',
      parkingArea='',
      parkingPlace=''
      } = booking;
      let startTimeHours=new Date(startTime).getHours()
      let startTimeMinutes=new Date(startTime).getMinutes()
      let endTimeHours=new Date(endTime).getHours()
      let endTimeMinutes=new Date(endTime).getMinutes()
      firebase.database().ref(`/Users/${userUid}/`).once('value').then((snapshot) => {
        const data = snapshot.val()
        const userName = data.fullName
        const userEmail = data.email
    firebase.database().ref(`/ParkingAreas/${pushKey}/Slots/`).once('value').then((snapshot) => {
      const data = snapshot.val()
      for (let key in data){
        if(key == selectedSlotsIndex[0])
         {
          console.log(selectedSlotsIndex+1)
          let bookingRef = firebase.database().ref(`/ParkingAreas/${pushKey}/Slots/${selectedSlotsIndex[0]}/Bookings`).push()
          let bookingPushKey =  bookingRef.getKey()
          bookingRef.set({
            booked:"true",bookingDay,bookingMonth,bookingYear,startTime,endTime,userUid,parkingArea,parkingPlace,bookingPushKey:bookingPushKey,userName:userName,userEmail:userEmail
          }).then(() => {
            dispatch(bookingData(booking));
            alert(`You have booked slot ${selectedSlotsIndex[0]+1} from ${startTimeHours}:${startTimeMinutes} to ${endTimeHours}:${endTimeMinutes} successfully!`)
          })
        }
      }
    })
  })
  };
};
 // CANCEL-BOOKING
 export const cancelBooking= (data) => ({
  type: 'CANCEL-BOOKING',
  data
});
export const startCancelBooking = (cancelData={}) => {
  return (dispatch) => {
    const {
      cancelIndex='',
      pushKey='',
      bookingPushKey=''
      } = cancelData;
      console.log(cancelIndex,pushKey)
          firebase.database().ref(`/ParkingAreas/${pushKey}/Slots/${cancelIndex}/Bookings/${bookingPushKey}/`).remove().then(() => {
            dispatch(cancelBooking(cancelData));
            alert(`You have Canceled slot ${cancelIndex+1} successfully!`)
          })
  };
};
