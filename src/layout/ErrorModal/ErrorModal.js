import React from 'react';
import './Modal.css'


 var t;
class ErrorModal extends React.Component{
  constructor(props)
  {
    let pr={
      open:false,
      msg:'null',
      color:'red'

    }
    super(props)
    console.log(props)
    this.state={
     details:pr
    }
    
    
  }
  showmodal(req) {
    this.setState({ details:req }, ()=>{
    });
  }
  componentDidUpdate(){
    let pr={
      open:false,
      msg:'null',
      color:'red'

    }
    
    this.state.details.open?t=setTimeout(() => this.setState({details:pr}), 6000):clearTimeout(t);
    
  }


 
  render()
  {
    
        var cname="content "+this.state.details.color
        var mname="modal "+this.state.details.open
        
      return(
        <div className={mname} 
        style={{
         opacity: this.state.details.open ? '1' : '0'
          }}>
            <div className={cname}>
               {
               this.state.details.msg
               }
              <button className="crossbutton bg-black" onClick={()=>{var toggle=this.state.details
                toggle={
                    ...toggle,
                    open: !toggle.open
                }
                this.setState({
                    details:toggle
                }, ()=>{
                  
                })}}>
                  <span >&times;</span>
              </button>
            </div>
        </div>
      ) 
  
}
}
  
 
 

export default ErrorModal;
