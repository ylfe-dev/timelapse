import { useMemo, memo, useRef, useEffect} from 'react';



const CloseUpDays = memo(({content, shift, level}) => {

	const daysLineRef = useRef();

	const daysLine = useMemo( () => { 
		const levelContent = () => {
			switch(level){
				case 0.25    : return <DayHoursLevel days={content.days} day_width={content.size.day} sun={content.sun} />;
				case 0.5     : return <DaysNightLevel days={content.days} day_width={content.size.day} sun={content.sun} />;
				case 1       : return <DaysLevel days={content.days} day_width={content.size.day} />;
				case 7       : return <DaysWeekLevel days={content.days} day_width={content.size.day} />;
				default: throw Error("CloseUp level unknown: "+level);
			}
		}

		return (
			<div ref={daysLineRef} id="closeup-days" style={{width: content.size.scope+"%", transform: "translateX("+shift+"%)"}}>
				{levelContent()}
			</div>
		);
	}, [content]);

	useEffect(()=>{
		daysLineRef.current.style.transform="translateX("+shift+"%)";
	}, [shift])

	return daysLine;
});

export default CloseUpDays;







const DayHoursLevel = ({days, day_width, sun}) => {
	const hours = [0,6,12,18];
	const day_names_pl = {
		short:["nd", "pn", "wt", "śr", "czw", "pt", "sb"],
		full: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]};


	const hours_html = (
		<div className="closeup-hours">
			{hours.map((hour, index) => {
				return(
					<div key={index}className="six-h">
						<p>{hour}</p>
						<div className="three-h"></div>
						<div className="three-h"></div>
					</div>
				)
			})}
		</div>
	);



	return(
		<>
			{days.map((day, index) => { 
				return(
				<div key={index} className={"closeup-day hours "+(day_names_pl.short[day[0]])} style={{width: day_width +"%"}}>
					<div className="day"><div className="day-light" style={{width:sun.period+"%", left: sun.rise+"%"}}></div>
						<span className="day-num">{day[1]+". "+day_names_pl.full[day[0]]}</span>
						{hours_html}
					</div>
				</div> 
			)})}
		</>
	)
}

const DaysNightLevel = ({days, day_width, sun}) => {
	const day_names_pl = ["nd", "pn", "wt", "śr", "czw", "pt", "sb"];
	return (
		<> {days.map((day, index) => { 
			return (
				<div key={index} className={"closeup-day day-night "+(day_names_pl[day[0]])} style={{width:day_width+"%"}}>
					<div className="day">
						<div className="day-light" style={{width:sun.period+"%", left: sun.rise+"%"}}></div>
						<span className="day-num">{day[1]+". "+day_names_pl[day[0]]}</span>
					</div>
				</div> 
			)})}
		</>
	);
}

const DaysLevel = ({days, day_width}) => {
	const day_names_pl = ["nd", "pn", "wt", "śr", "czw", "pt", "sb"];
	return (
		<> {days.map((day, index) => { 
			return (
				<div key={index} className={"closeup-day "+(day_names_pl[day[0]])} style={{width:day_width+"%"}}>
					<div className="day">
						<span className="day-num">{day[1]}</span>
					</div>
				</div> 
			)})}
		</>
	);
}

const DaysWeekLevel = ({days, day_width}) => {

	const weeks = days.reduce( (weeks_a, day, index) => {
		(day[0]==1 || index == 0) ? weeks_a.push([day]) : weeks_a[weeks_a.length - 1].push(day);
			return weeks_a;
	}, []);


	return(
		<> {weeks.map((week, index) =>{
			const work_week = week.filter( day => (day[0] != 0 && day[0] != 6));
			return(
				<div key={index} className="closeup-week" style={{width:day_width*week.length+"%"}}>
					<div className="week">
						<div className="work-week" style={{width: work_week.length/week.length*100+"%"}}>
							<span className="week-title">{week[0][1]}</span>
						</div>
					</div>
				</div>
			)
		})
			
		}
		</>
	);
}
