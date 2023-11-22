import { useState,  useEffect, useRef, createRef } from 'react';
import CloseUpReel from './TimeReel';
import CloseUpContent from './TimeContent';

import calcCloseUp from './calc_CloseUp';
import WithReserve from '../WithReserve';

const CloseUp = ({view, eventHandlers}) => {

	const view_level = getViewLevel(view);

	
	return( 
	 	<div id="closeup" {...eventHandlers}>
	 		<WithReserve view={view} calcContent={calcCloseUp} level={view_level}>
				<CloseUpReel />
				<CloseUpContent />
			</WithReserve>
		</div>
	 );
}

export default CloseUp;



const getViewLevel = (view) => {
	if      (view.unit_precision > 12)  return(0.25);
	else if (view.unit_precision > 6)   return(0.5);
	else if (view.unit_precision > 2)   return(1);
	else                                return(7);
}