import { useState,  useEffect, useRef, useReducer } from 'react';

import WithLineControl from './WithLineControl';
import { viewReducer, initViewReducer } from './viewReducer';
import { dateToFloat } from './mathTimeline';

import BigPicture from './BigPicture';
import TimelineLens from './TimelineLens';
import CloseUp from './CloseUp';

import "./Timeline.scss";


function Timeline({appSize}) {

	const [stateBP, dispatchBP] = useReducer(viewReducer, {...initial_view_BP, container: appSize}, initViewReducer); 
	const [stateCU, dispatchCU] = useReducer(viewReducer, {...initial_view_CU, container: appSize}, initViewReducer);

	useEffect(()=>{ console.log("resize Timeline")
		dispatchBP({type: "resize", container: appSize});
		dispatchCU({type: "resize", container: appSize});
	}, [appSize])

		// overflow app_cont suck y 
	return( 
		<main  id="app_cont" className="h-100 w-100 mh-100" style={{overflow:"hidden"}}>  

	 		<WithLineControl view={stateBP} changeView={dispatchBP} >
		 		<BigPicture />
		 	</WithLineControl>

			<TimelineLens closeUp_view={stateCU} wide_view={stateBP} />

			<WithLineControl view={stateCU} changeView={dispatchCU}>
				<CloseUp />
			</WithLineControl>

		</main>
	 );
}

export default Timeline;


const now = dateToFloat(new Date(), true);

const initial_view_BP = {
		ref: now, 
		scope: 4, 
		minTouchesPerUnit: 4, 
		maxTouchesPerUnit: 50,
		unit: 1,
}

const initial_view_CU = {
		ref: now, 
		scope: 0.07, 
		minTouchesPerUnit: 1, 
		maxTouchesPerUnit: 24*2,
		unit: 1/365,
	}


