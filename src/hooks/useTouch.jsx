import { useEffect, useRef } from "react"


export default function useSwipeRight(actionR, actionL) {

  const callbacks = useRef({"swipeRight": [actionR], "swipeLeft":[actionL] });
  const activeTouches = useRef([]);
  
  useEffect(() => {

    window.addEventListener('touchstart', handleStart);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleCancel);
    window.addEventListener('touchmove', handleMove);


    return function cleanup() {
      window.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleCancel);
      window.removeEventListener('touchmove', handleMove);
    }
  })



  function swipedLeft(){
    callbacks.current.swipeLeft.map(call => call());
    console.log("swiped left");
  };

  function swipedRight(){
    callbacks.current.swipeRight.map(call => call());
    console.log("swiped right");
  };



  function handleStart(e){
    const touch_list = e.changedTouches;
    for(let i = 0; i < touch_list.length; i++){
      const touch = touch_list[i];
      const updatedTouch = {
        "id": touch.identifier, 
        "x": touch.pageX,
        "y": touch.pageY,
        "sx": touch.pageX,
        "sy": touch.pageY,
        "stime": performance.now()
      };
      activeTouches.current.push(updatedTouch);
    }
  }

  function handleEnd(e) {
    const touch_list = e.changedTouches;
    for(let i = 0; i < touch_list.length; i++){
      const touch = touch_list[i];
      const idx = activeTouches.current.findIndex(t => t.id===touch.identifier);
      isTouchSwipeRight(activeTouches.current[idx]);
      activeTouches.current.splice(idx,1);
      
    }
  }

  function handleCancel(e) {
    const touch_list = e.changedTouches;
    for(let i = 0; i < touch_list.length; i++){
      const touch = touch_list[i];
      const idx = activeTouches.current.findIndex(t => t.id===touch.identifier);
      activeTouches.current.splice(idx,1);
    }
  }

  function handleMove(e) {
    const touch_list = e.changedTouches;
    for(let i = 0; i < touch_list.length; i++){
      const touch = touch_list[i];
      const idx = activeTouches.current.findIndex(t => t.id===touch.identifier);
      const updatedTouch = { 
          "id":touch.identifier, 
          "x": touch.pageX,
          "y": touch.pageY, 
          "sx": activeTouches.current[idx].sx,
          "sy": activeTouches.current[idx].sy,
          "stime": activeTouches.current[idx].stime,
        };

      activeTouches.current.splice(
        idx, 
        1, 
        updatedTouch
      );
      isTouchSwipeRight(activeTouches.current[idx]);
      isTouchSwipeLeft(activeTouches.current[idx]);
    }
  }


  function isTouchSwipeRight(touch){
    if (    
      touch.sx < document.body.clientWidth*0.5 
      && (touch.x-touch.sx) > document.body.clientWidth*0.25
      && (performance.now() - touch.stime) < 400
      && Math.abs(touch.y-touch.sy) < document.body.clientWidth*0.1
    )
      {
        swipedRight()
      }
  }

  function isTouchSwipeLeft(touch){
    if (    
      touch.sx > document.body.clientWidth*0.5 
      && (touch.x-touch.sx) > -document.body.clientWidth*0.25
      && (performance.now() - touch.stime) < 400
      && Math.abs(touch.y-touch.sy) < document.body.clientWidth*0.1
    )
      {
        swipedLeft()
      }
  }

}