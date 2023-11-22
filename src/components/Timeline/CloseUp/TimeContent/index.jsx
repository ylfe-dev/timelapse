import { useState, memo } from 'react';
import TimelineAreaMesh from '../../TimelineAreaMesh';
import TimeProgrammer from '../../../Modules/TimeProgrammer';

const CloseUpArea = memo(({content, shift, level}) => {
	return(
		
		<div id="closeup-area" className="time-content">
			<TimelineAreaMesh content={content} shift={shift} level={level} /> 

			<div className="modules" >
				{ true ? null : <TimeProgrammer content={content} shift={shift}/> }
			</div>
		</div>
			
		);
});

export default CloseUpArea;