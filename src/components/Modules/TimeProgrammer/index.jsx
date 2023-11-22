import { useState, useEffect, useMemo, useRef } from 'react';
import "./TimeProgrammer.scss";
import { prepareEvents } from './calc_TimeProgrammer'


const TimeProgrammer = ({content, shift}) => {

	const data = useRef(null);
	const [prepared, setPrepared] = useState(null);

	const moduleLineRef = useRef();
	const programmerLine = useMemo(()=>{
		return (
		<div ref={moduleLineRef} className="module-line TimeProgrammer"  style={{width: content.size.scope+"%", transform:"translateX("+shift+"%)"}}>
			{prepared ? prepared.map((event, index)=><Event event={event} row={index+1}/>) : null}
		</div>
		);
	}, [prepared])


	const loadData = () => {
		fetch("/sample_data.json") //https://randomuser.me/api/?results=1
	    .then((response) => response.json()) //response.json()
	    .then((json) => {
	    	data.current = json;
	    	setPrepared(prepareEvents(content, data.current));
	    });
	}


	useEffect(loadData, []);

	useEffect(()=>{
		console.log("refresh events")
		setPrepared(prepareEvents(content, data.current));
	}, [content]);

	useEffect(()=>{
		moduleLineRef.current.style.transform="translateX("+shift+"%)";
	}, [shift])

	return programmerLine;
}

export default TimeProgrammer;



const Event = ({event, row}) => {
	return (
		<div className={"event-bar r"+row} style={{width: event.view.size+"%", left: event.view.left+"%"}}>
			<img className="icon" src={event.icon}/>
			<p>{event.title}</p>
		</div>
	);
}





const sample_data = [
	{
		type: "pattern",
		title: "testowy pattern 1",
		icon: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
		tags: ["bills"],


		pattern: {
			type: "WEEK",
			template: {
				start:"0111000",
				end: null,
			},
		},

		period: {
			from: "05.06.2022",
			to: "05.06.2023",
		},

		rythm: {			
			unit: "DAY",
			value: 90,
		}
	},


	{
		type: "pattern",
		title: "testowy pattern 2",
		icon: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
		tags: ["bills"],


		pattern: {
			type: "WEEK",
			template: {
				start:"0111000",
				end: null,
			},
		},

		period: {
			from: "05.06.2022",
			to: "05.06.2023",
		},

		rythm: {			
			unit: "Month",
			value: 1,
		}
	},

	{
		type: "single",
		title: "testowy pattern 2",
		icon: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
		tags: ["bills"],


		pattern: {
			type: "WEEK",
			template: {
				start:"0111000",
				end: null,
			},
		},

		period: {
			from: "05.06.2022",
			to: "05.06.2023",
		},

		rythm: {			
			unit: "Month",
			value: 1,
		}
	},

]