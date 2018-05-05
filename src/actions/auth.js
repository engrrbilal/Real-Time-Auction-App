import * as firebase from 'firebase'
import history from '../history';

// CREATE-USER
export const signUp = (user) => ({
    type: 'CREATE-USER',
    user
  });

export const startSignUp = (userData = {}) =>{
    console.log("creating account ...");
    return dispatch =>{
        const {
            fullName='',
            email='',
            password='',
            createdAt=0
          } = userData;
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then( data =>{
           let uid = data.uid
           console.log(uid)
           firebase.auth().currentUser.updateProfile({displayName:fullName})
               firebase.database().ref(`Users/${uid}`).set(userData)
               dispatch(signUp({
                   uid:uid,
                   ...userData
                }))
                setTimeout(() => {
                    history.push('/home')
                }, 1000)
        }).catch(console.log("error"))
    }   
  }
  
  export const signIn = (user) => ({
    type: 'USER-SIGNIN',
    user
  })

  export const startSignIn = (user = {}) =>{
    return dispatch => {
        console.log('user in signin', user)
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((signedinUser) => {
            let userid = signedinUser.uid
            console.log(userid)
            firebase.database().ref(`Users/${userid}`).once('value')
                .then((userData) => {
                    console.log(userData)
                    if(userData.val()){
                        history.push("/home")
                    }
                    else{
                        signedinUser.delete()
                        alert("User not found")
                    }  
                }
        )}
    )}
    }  