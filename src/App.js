
import React, {useRef} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import FrontPage from './layout/FrontPage/FrontPage'
import Home from './layout/Home/Home'
import ErrorPage from './layout/ErrorPage/ErrorPage'
import ErrorModal from './layout/ErrorModal/ErrorModal'
function App() {
  var pr={
    open:false,
    msg: "nan",
    color:"red"
  }
  const modalRef=useRef();
  //console.log()
  return (
    <div className="App">
      <ErrorModal ref={modalRef}  />
      <Router>

      
      <Switch>

        <Route path='/' exact>
          <FrontPage/>
        </Route>
        <Route path='/Login' >
          <FrontPage/>
        </Route>
        <Route path='/Home' exact>
        
          <Home showmodal={(details)=>{modalRef.current.showmodal(details)}}/>      


        
        </Route>
        
        <Route>
          <ErrorPage/>
        </Route>
        
      </Switch>
      </Router>
    </div>
  );
}

export default App;
