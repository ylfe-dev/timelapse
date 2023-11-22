import { createContext, useContext } from 'react';

const getScreenInfo = () => {
  const dppx = window.devicePixelRatio;
  const is_touch_enabled = 
       ( 'ontouchstart' in window ) 
    || ( navigator.maxTouchPoints > 0 ) 
    || ( navigator.msMaxTouchPoints > 0 );
    
  const precise_interaction_px = is_touch_enabled ? dppx * 20 : dppx * 20;

  return({
    precision: precise_interaction_px,
    touch:   is_touch_enabled,
  })
}


const EnvironmentContext = createContext(getScreenInfo());

export const EnvironmentProvider = ({children}) => {
	return(
		<EnvironmentContext.Provider value={{...getScreenInfo()}}>
			{children}
		</EnvironmentContext.Provider>
	)
}

export const useEnvironment = () => useContext(EnvironmentContext);





