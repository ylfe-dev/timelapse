import { useEffect, useState, useRef } from 'react';
import "./Start.scss";
import { Outlet } from "react-router-dom";
import useSwipeRight from './hooks/useTouch';


import Menu from './components/Menu';
import Header from './components/Header';

function Start() {

  const [menuState, setMenuState] = useState(true);
  
  useSwipeRight(()=>setMenuState(true), ()=>setMenuState(false))

  window.addEventListener("resize", () => {setMenuState(false)});



  return (
    <div className="text-white" id="Start">
      <div id="start-header">
        <Header menu={menuState} setMenu={setMenuState}/>
      </div>

      <div id="start-menu" className={ menuState ? "opened" : "closed"}>
        <Menu setMenu={setMenuState}/>
      </div>

      <div id="start-content" className={ menuState ? "closed" : "opened"}>
        <Outlet />
      </div>
      
    </div>
  );
}

export default Start;




