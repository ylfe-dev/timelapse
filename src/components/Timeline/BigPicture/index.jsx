import { useState,  useEffect, useRef, createRef } from 'react';
import BigPictureContent from './TimeContent';
import BigPictureReel from './TimeReel';

import calcBigPicture from './calc_BigPicture';
import WithReserve from '../WithReserve';

const BigPicture = ({view, eventHandlers}) => { 

	const view_level = getViewLevel(view);

	return( 
	 	<div id="bigpicture" {...eventHandlers} >
		 	<WithReserve view={view} calcContent={calcBigPicture} level={view_level}>
			 	<BigPictureContent />
				<BigPictureReel />
			</WithReserve>
		</div>
	);
}

export default BigPicture;


const getViewLevel = (view) => {
	if      (view.unit_precision > 24)  return("months");
	else if (view.unit_precision > 12)  return("years");
	else                                return("smallyears");       
}