import React from 'react'
import firebase from '../../Config/firebase'
import { useHistory } from "react-router-dom";
import './FrontPage.css'
var age=0;
const FrontPage=()=>{
  console.log(firebase.auth().currentUser, firebase.auth().currentUser?"null":"true")
    const history = useHistory();
    
    return(
      <div>
        <div className="front-page">
          <div className="ribbon">
            <div className="title">Weight Tracker</div>
            <div className="subtitle">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</div>
          </div>
          <div className="login-section">
            <div className="edit-section">
            <div>Email: </div><input id="age" ></input><div></div>
            <div>Password:</div> <input id="age" ></input><div></div>
            <div></div>
            <button>Sign In</button>
            </div>
            
            <hr />
            


            
            <div className="edit-section">
            <em className="percentage">Enter age, for new users</em>
          <input id="age" onChange={(e)=>{age=parseInt( e.target.value)}} ></input>
          <div></div>
          <div></div>
            <button onClick={()=>{
              
              
                firebase.auth().signInAnonymously()
                .then(() => {
                  
                  firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                      
                      //console.log("ex")
                      history.push('/Home')
                    } else {
                      if(age<=0 || age>=200)
                      {
                        console.log("invalid age");
                      }
                      else{
                        console.log("in")
                      firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                        age: age
                      }, (error)=>{
                        console.log(error)
                      });
                      var today=new Date()
                      //today= today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear()
                    
                      firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/specifics/'+today.getTime()).set({
                      
                        weight: 65,
                        height: 135,
                        
                        
                      }, (error)=>{
                        console.log(error)
                      }).then(()=>{
                        history.push('/Home')
                      });
                      
                    }
                  }}).catch((error) => {
                    console.error(error);
                  });
                
                  
                  
                
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ...
                });

              
                

            }}>Continue as guest</button>


            </div>
            
          </div>
            
        </div>
        </div>

    );
}
export default FrontPage;