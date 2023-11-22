import {  useRef, useEffect, useMemo } from 'react';

const TimelineAreaMesh = ({content, shift, level}) => {

	const meshRef = useRef();
	
	const daysLine = useMemo( () => { 
		const sub_dividers = 1/level-1;
		return( //memo if not content changed
			<div ref={meshRef} className="area-mesh" style={{width: content.size.scope+"%", transform:"translateX("+shift+"%)"}}>
				{content.days.map((x,id)=>{ return (
					<div className="divider" key={id} style={{width:content.size.unit+"%"}}>
						{sub_dividers>=1 ? [...Array(sub_dividers)].map(() => { return(
							<div className="subdivider" style={{width: (1/(1+sub_dividers)*100)+"%"}}></div>
						)}) : null}
					</div>
				)})}
			</div>
				
		);
	}, [content])

	useEffect(()=>{
		meshRef.current.style.transform="translateX("+shift+"%)";
	}, [shift])

	
	return daysLine;
	
}

export default TimelineAreaMesh;