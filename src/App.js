
import React, {useRef} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import FrontPage from './layout/FrontPage/FrontPage'
import Home from './layout/Home/Home'
import Register from './layout/Register/Register'
import ErrorPage from './layout/ErrorPage/ErrorPage'
import ErrorModal from './layout/ErrorModal/ErrorModal'
function App() {
  
  const modalRef=useRef();
  //console.log()
  return (
    <div className="App">
      <ErrorModal ref={modalRef}  />
      <Router>

      
      <Switch>

        <Route path='/' exact>
          <FrontPage showmodal={(details)=>{modalRef.current.showmodal(details)}}/>
        </Route>
        <Route path='/Login' >
          <FrontPage showmodal={(details)=>{modalRef.current.showmodal(details)}}/>
        </Route>
        <Route path='/Home' exact>        
          <Home showmodal={(details)=>{modalRef.current.showmodal(details)}}/>      
        </Route>
        <Route path='/Register'>
          <Register showmodal={(details)=>{modalRef.current.showmodal(details)}}/>
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
