import { useState, useEffect, useRef, Children, cloneElement, useMemo } from 'react';
import Timeline from './components/Timeline';
import "./App.scss";
import { Outlet } from "react-router-dom";
import useSwipeRight from './hooks/useTouch';


import Menu from './components/Menu';
import AppHeader from './components/AppHeader';
import useSize from './hooks/useSize';


function App() {

  const [menuState, setMenuState] = useState(true);
  
  //useSwipeRight(()=>setMenuState(true), ()=>setMenuState(false))
  //window.addEventListener("resize", () => {setMenuState(false)});

  const [appSize, appSizeRef] = useSize();  

  return (
    <div className="text-white" id="App">
      <div id="app-header">
        <AppHeader  menu={menuState} setMenu={setMenuState}/>
      </div>

      <div ref={appSizeRef} id="app-content" className={ menuState ? "closed" : "opened"}>
        <WaitUntilStable unstable={appSize}>
          <Timeline />
        </WaitUntilStable>
      </div>
      
    </div>
  );
}

export default App;




const WaitUntilStable = ({unstable, children}) => { // change to useEffect
  const stable_time_ms = 100;

  const [stable, setStable] = useState(unstable);
  const pendingTimeout = useRef(null);

  clearTimeout(pendingTimeout.current);
  pendingTimeout.current = setTimeout(() => setStable(unstable), stable_time_ms);

  const childReturn = useMemo(()=>{
    return (
        <> { stable ? Children.map(children, (child) => {
            return cloneElement(child, { appSize: stable});
           }) : null} 
        </> ) 
  }, [stable]);

  return childReturn;
}


