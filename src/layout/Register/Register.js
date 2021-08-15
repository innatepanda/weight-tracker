import React from 'react'
import { useHistory } from "react-router-dom";
import firebase from '../../Config/firebase';

var email='', password='', modalDetails,  age;
const Register=({showmodal})=>{
    email=''; password=''
    
    modalDetails={
        open:false,
        msg:"email or password cannot be left blank",
        color:"red"
      }
    const history = useHistory();

    return(
        <div className="front-page">
            <div className="ribbon">< br />< br /><button onClick={()=>history.push('/Login')}>Back</button>< br /><div className="title">Register</div></div>
            <div className="login-section">< br />< br />< br />< br />< br />
            <div className="edit-section">
                {
                    
                }
                <div>Email</div>
                <input onChange={(e)=>{email=e.target.value;}}></input><div></div>
                <div>Password</div>
                <input id="password" type="password" onChange={(e)=>{password=e.target.value}} />
                <button onClick={()=>{
                    
                    const type = document.querySelector('#password').getAttribute('type') === 'password' ? 'text' : 'password';
                    document.querySelector('#password').setAttribute('type', type);
                    document.querySelector('#eye').innerText=="+1"?document.querySelector('#eye').innerText="-1":document.querySelector('#eye').innerText="+1"

                }} id="eye">+1</button>


                <div>Age</div>
                <input onChange={(e)=>{age=parseInt(e.target.value);}}></input><div></div>
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
                        
                            firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then((usercred) => {
                                console.log(usercred.uid)

                                
                                    
                                    
                                    firebase.database().ref('users/' + usercred.uid).update({
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
                                    }).catch((error) => {
                                            modalDetails={
                                                open:true,
                                                msg:error.message,
                                                color:"red"
                                            }
                                            showmodal(modalDetails)
                                            console.error(error);
                                    });
                              
                              
                            });
                        }
                        
                    }
                      
                

                }
            }>Register</button>
            </div>
            </div>


        </div>
    );
}


export default Register;