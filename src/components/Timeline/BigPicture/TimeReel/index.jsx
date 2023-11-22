import { memo } from 'react';
import BigPictureYears from './BigPictureYears';

const BigPictureReel = memo(({content, shift, level}) => { 
	
	return (
		<div id="bigpicture-timeline">
			<BigPictureYears content={content} shift={shift} level={level}/>
		</div>
	);
});

export default BigPictureReel;




