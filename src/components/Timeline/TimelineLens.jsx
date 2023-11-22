import { useState } from 'react';

function TimelineLens({closeUp_view, wide_view}) {

	const lens_width = closeUp_view.scope/wide_view.scope;
	const lens_pos = (closeUp_view.ref-(wide_view.ref-wide_view.scope/2))/wide_view.scope;
 	
 	const left_pos = lens_pos-lens_width/2;
 	const right_pos = left_pos+lens_width;


	return(
		<div id="timeline-lens">
			<div className="lens start" style={{transform:"translateX(" + ((left_pos>1) ? "0%)" : (-(1-left_pos)*100)+"%)")}}></div>
			<div className="lens end" style={{transform:"translateX(" + ((right_pos<0) ? "0%)" : right_pos*100+"%)")}}></div>
		</div>
	);
}

export default TimelineLens;