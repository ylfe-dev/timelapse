import { memo } from 'react';

import CloseUpYears from './CloseUpYears';
import CloseUpMonths from './CloseUpMonths';
import CloseUpDays from './CloseUpDays';






 const CloseUpReel = memo(({content, shift, level}) => {

	return(
		<div id="closeup-timeline">
				<CloseUpDays content={content} shift={shift} level={level} />
				<CloseUpMonths content={content} shift={shift} />
				<CloseUpYears content={content} shift={shift} />
		</div>
	);
});

export default CloseUpReel;

