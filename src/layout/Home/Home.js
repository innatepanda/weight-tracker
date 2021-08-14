import React from 'react'
import firebase from '../../Config/firebase'
import { withRouter } from "react-router-dom";
import {Line} from 'react-chartjs-2';
import './Home.css'
var height, weight, state, modalDetails;
class  Home extends React.Component{
   
    //console.log(firebase.auth().currentUser)
    constructor(props)
    {
        super(props)
        this.state={
            age:0,
            details:[],
            loaded: false,
            user: null,
            showmodal: props.showmodal


        }
        modalDetails={
          open:false,
          color:"red",
          msg: "invalid height or weight"
        }
        
        
        //history=useHistory()
        height=0;
        weight=0;
         /*state = {
            labels: ['January', 'February', 'March',
                     'April', 'May', 'May'],
            datasets: [
              {
                label: 'weights',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 90]
              }
            ]
          }*/
          
          

          
              
    }
    componentDidMount()
    {
      firebase.auth().onAuthStateChanged((user) =>{
        console.log(user)
        this.setState({
          user: user,
          //loaded: true

        }, ()=>{
          if(this.state.user!=null)
            this.getData()
            else
              this.setState({
                loaded:true
              })
        })


      })

    }

    

    getData()
    {
        firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).get().then((snapshot) => {
            //console.log(snapshot.val())
            var d=[], labels=[], weights=[];
            
            for (const [key, value] of Object.entries(snapshot.val().specifics))
            {
                d.push({time:key,weight:value.weight, height:value.height})
                var n=new Date(parseInt(key))
                
                n=n.getHours()+"hrs  "+ n.getDate()+"-"+n.getMonth()+"-"+n.getFullYear()
                labels.push(n);
                weights.push(value.weight);

            }
            labels.splice(0, Math.max(0, labels.length-6))
            weights.splice(0, Math.max(0, weights.length-6))
            
            state = {
              labels: labels,
              datasets: [
                {
                  label: 'weight',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                  data: weights
                }
              ]
            }
            console.log(d)
            d.reverse()
            height=d[0].height
            this.setState({
                details:d,
                age: snapshot.val().age,
                loaded:true
            }, ()=>{
              

            })

        }).catch((error)=>{
          modalDetails={
            open:true,
            color:"red",
            msg: error.message
          }

            this.state.showmodal(modalDetails)
            
        })

    }







    render(){
      
      if(!this.state.loaded )
        {
            return(
                <div className="loading">
                    loading..
        
                </div>)

        }

      
        if (this.state.user != null) {
      
        
            return(
                <div className="Home">
                  <div className="yellow-ribbon"></div>
                  <div className="Home-Main">
                    {
                      this.state.user.isAnonymous?
                      <button className="top-btn delete" onClick={()=>{
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                                
                              }, (error)=>{
                                modalDetails={
                                  open:true,
                                  color:"red",
                                  msg: error.message
                                }
                      
                                  this.state.showmodal(modalDetails)
                              }).then(()=>{
                                firebase.auth().signOut()
                                .then(() => {
                                  
                                  
                                  this.props.history.push('/Login');
                                })
                                .catch((error) => {
                                  modalDetails={
                                    open:true,
                                    color:"red",
                                    msg: error.message
                                  }
                        
                                    this.state.showmodal(modalDetails)
                                  // ...
                                });
                
                                
                              });
                        
                    }}>delete anon acc</button>
                    :
                    <button className="top-btn" onClick={()=>{
                        
                      firebase.auth().signOut()
                      .then(() => {
                        
                        
                        this.props.history.push('/Login');
                      })
                      .catch((error) => {
                        modalDetails={
                          open:true,
                          color:"red",
                          msg: error.message
                        }
              
                          this.state.showmodal(modalDetails)
                        // ...
                      });
      
                      
                   
              
          }}>sign out</button>

                    }
                  
                  
                  <div className="page-title">Welcome,<span className="yellow">User</span> </div>
                  <div className="graph-area">
                  <div>
                  <Line
                  data={state}
                  options={{
                    
                    }}
                />
                  </div>
                  <div >
                    <div className="edit-section">
                    <div>weight</div> <input onChange={(e)=>{weight=parseInt(e.target.value)}}></input><div>kg</div>
                    <div>height</div><input placeholder={height} onChange={(e)=>{height=parseInt(e.target.value)}}></input><div>cm</div>
                    <div></div>
                    <button onClick={()=>{
                      if(weight==0 || height==0)
                      {
                        modalDetails={
                          open:true,
                          color:"red",
                          msg: "invalid height or weight"
                        }
              
                          this.state.showmodal(modalDetails)
                      }
                      else{
                      
                        var today=new Date();
                        //today=today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear()
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/specifics/'+today.getTime()).set({
                            weight: weight,
                            height: height,
                            
                            
                          }, (error)=>{
                              if(error)
                                    console.log(error)
                          }).then(()=>{
                            //history.push('/Home')
                            this.getData()
                            height=0;weight=0;
                          });
                        }
                        
                    }}>add</button>
                    <div></div>
                    </div>
                   
                    
                    <br /><br />
                    </div>
                    </div>




                    <div className="weight-table">
                        <div className="table-entry table-header">
                          <div>date</div>
                          <div>weight</div>
                          <div></div>
                          <div>height</div>
                          <div>BMI</div>
                          <div></div>
                        </div>
                        {
                        this.state.details.map((data, index)=>{
                          var percentage_change;
                          var created=new Date(parseInt(data.time));
                          created=created.getHours()+"hrs "+created.getDate()+"/"+created.getMonth()+"/"+created.getFullYear()
                            if(index==this.state.details.length-1)
                            {
                              percentage_change="00.00"
                              
                            }
                            else{
                              percentage_change=(100*(data.weight-this.state.details[index+1].weight)/this.state.details[index+1].weight).toFixed(2)
                            }
                            var BMI=(data.weight) / (data.height * data.height)
                            BMI=(BMI*10000).toFixed(2);
                            var cname=
                            percentage_change==0?"percentage grey":
                            percentage_change>0?"percentage red":"percentage green"
                            percentage_change="( "+percentage_change+"% )" 

                            
                            return(
                                <div key={index} className="table-entry">
                                    <div>{created}</div>
                                    <div> {data.weight} kg</div> <div className={cname}>{percentage_change}</div>
                                    <div> {data.height} cm</div>
                                    <div>{BMI}</div>
                                    <div>
                                    <button className="delete" onClick={()=>{
                                      if(this.state.details.length>1)
                                      {
                                        firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/specifics/'+data.time).set({}).then(()=>{
                                            this.getData()
                                        })
                                      }
                                      else{
                                        console.log("cannot delete")
                                      }


                                    }}>delete</button></div>
                                    
                                    
                                </div>
                            )
                        })
                    }
                        

                    </div>














                    
                </div>
                </div>

            );
        }


          
        else {
          return(
            <div className="loading">
                please login first
    
            </div>)
        }
      
      
        
    }
}
export default withRouter(Home);