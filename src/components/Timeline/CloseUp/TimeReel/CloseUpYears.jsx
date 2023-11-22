import { useMemo, memo } from 'react';

const CloseUpYears = memo(({content, shift}) => {
	
	
	return (
		<div id="closeup-years" style={{width: content.size.scope+"%", transform:"translateX("+shift+"%)"}}>
			{content.years.map((year, index) => {return(
				<div key={index} className={"closeup-year"} style={{width:content.size.day*(year.to - year.from)+"%"}}>
					<span className="start">{year.year}</span>
					<span className="end">{year.year}</span>
				</div> 
			)})}
		</div>
	);
});

export default CloseUpYears;