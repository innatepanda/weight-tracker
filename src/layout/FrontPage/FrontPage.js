import React from 'react'
import firebase from '../../Config/firebase'
import { useHistory } from "react-router-dom";
import './FrontPage.css'
var age=0;
var modalDetails, email, password;
const FrontPage=({showmodal})=>{
  modalDetails={
    open:false,
    msg:"null",
    color:"red"
  }
  email='';password='';
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
            <div>Email: </div><input onChange={(e)=>{email=e.target.value;}}></input><div></div>
            <div>Password:</div> <input id="password" type="password" onChange={(e)=>{password=e.target.value}} ></input>
            <button onClick={()=>{
                    
                    const type = document.querySelector('#password').getAttribute('type') === 'password' ? 'text' : 'password';
                    document.querySelector('#password').setAttribute('type', type);
                    document.querySelector('#eye').innerText=="+1"?document.querySelector('#eye').innerText="-1":document.querySelector('#eye').innerText="+1"

                }} id="eye">+1</button>
            <div></div>
            <button onClick={()=>{
               if(email===''||password==='')
               {
                   modalDetails={
                   open:true,
                   msg:"email or password cannot be left blank",
                   color:"red"
                 }
                 showmodal(modalDetails)
               

               }else{
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(() => {
                history.push('/Home');
              })
              .catch((error) => {
                modalDetails={
                  open:true,
                  msg:error.message,
                  color:"red"
                }
                showmodal(modalDetails)
              });
            }
            }}>Sign In</button>
            <div></div>
            <div></div>
            <button  onClick={()=>history.push('/Register')}>Register</button>
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
                      age=0;
                      //console.log("ex")
                      history.push('/Home')
                    } else {
                      if(age<=0 || age>=200)
                      {
                        modalDetails={
                          open:true,
                          msg:"invalid age",
                          color:"red"
                        }
                        showmodal(modalDetails)
                        console.log("invalid age");
                        age=0;
                      }
                      else{
                        console.log("in")
                      firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                        age: age
                      }, (error)=>{
                        console.log(error)
                        if(error!=null)
                        {
                          modalDetails={
                            open:true,
                            msg:error.message,
                            color:"red"
                          }
                          showmodal(modalDetails)

                        }
                      });
                      age=0;
                      var today=new Date()
                      //today= today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear()
                    
                      firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/specifics/'+today.getTime()).set({
                      
                        weight: 65,
                        height: 135,
                        
                        
                      }, (error)=>{
                        if(error!=null)
                        {
                        modalDetails={
                          open:true,
                          msg:error.message,
                          color:"red"
                        }
                        showmodal(modalDetails)
                        console.log(error)
                      }
                      }).then(()=>{
                        history.push('/Home')
                      });
                      
                    }
                  }}).catch((error) => {
                    modalDetails={
                      open:true,
                      msg:error.message,
                      color:"red"
                    }
                    showmodal(modalDetails)
                    console.error(error);
                  });
                
                  
                  
                
                })
                .catch((error) => {
                  modalDetails={
                    open:true,
                    msg:error.message,
                    color:"red"
                  }
                  showmodal(modalDetails)
                  
                });

              
                

            }}>Continue as guest</button>


            </div>
            
          </div>
            
        </div>
        </div>

    );
}
export default FrontPage;