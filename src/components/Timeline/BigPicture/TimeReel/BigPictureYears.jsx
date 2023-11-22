import {  useEffect, memo, useMemo, useRef } from 'react';


const BigPictureYears = memo( ({content, shift, level}) => {

	const yearsLineRef = useRef();

	const years_line = useMemo(() => {
		const levelContent = () => {
			switch(level){
				case "smallyears": return <SmallYearsLevel years={content.years} yearWidth={content.year_width}/>;
				case "years":      return <YearsLevel years={content.years} yearWidth={content.year_width}/>;
				case "months":     return <YearsLevel years={content.years} yearWidth={content.year_width}/>;
				default: throw Error("BigPicture level unknown: "+level);
			}
		}

		return(
			<div ref={yearsLineRef}  id="bigpicture-years" style={{width:content.scope_width+"%", transform:"translateX("+shift+"%)"}}> 
				{levelContent()}
			</div>
		);
	}, [content]);

	useEffect(()=>{
		yearsLineRef.current.style.transform="translateX("+shift+"%)";
	}, [shift])

	return years_line;
});

export default BigPictureYears;





const YearsLevel = ({years, yearWidth}) => {
	return(
		<>
			{years.map((year) => { return(
				<div className="year-cont" key={year} style={{width: yearWidth+"%"}}>
					<div className="year" >
						<div className="half-year">
							<div className="quarter">
								<div className="month"></div>
								<div className="month"></div>
								<div className="month"></div>
							</div>
							<div className="quarter">
								<div className="month"></div>
								<div className="month"></div>
								<div className="month"></div>
							</div>
						</div>
						<div className="half-year">
							<div className="quarter">
								<div className="month"></div>
								<div className="month"></div>
								<div className="month"></div>
							</div>
							<div className="quarter">
								<div className="month"></div>
								<div className="month"></div>
								<div className="month"></div>
							</div>
						</div>
					</div>
					<p>{year}</p>
				</div>
			)})}
		</>
	)
}






const SmallYearsLevel = ({years, yearWidth}) => {
	return(
		<>
			{years.map((year) => { return(
				<div className="year-cont small-years" key={year} style={{width: yearWidth+"%"}}>
					<div className="year">
						<p>{year}</p>
					</div>
				</div>
			)})}
		</>
	)
}