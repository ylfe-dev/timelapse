import { useMemo, memo, useRef, useEffect } from 'react';


const CloseUpMonths = memo(({content, shift}) => {

	const months_names_pl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	const monthsLineRef = useRef();

	const months_line = useMemo( () => { 
		const fixed_shift = prepare_fixed_shift(content, shift)
		return(
		<div ref={monthsLineRef} id="closeup-months" style={{width: content.size.scope+"%", transform:"translateX("+fixed_shift+"%)"}}>
			{content.months.map((month, index) => { 
				const width = month.fix? 100/content.size.scope*100 : content.size.day*(month.to - month.from);
				const fix_left = (index===0 && !month.fix) ? "-10rem" : 0;
				const fix_right = (index===(content.months.length-1) && !month.fix) ? "-10rem": 0;
				return( 
					<div 
						key={index} 
						className={"closeup-month"} 
						style={{
							width:  "calc( "+width + "% + "+((fix_right || fix_left)? 10 : 0)+"rem )",
							marginLeft: fix_left,
							marginRight: fix_right,
						}}>
						<span className="start">{months_names_pl[month.month-1]}</span>
						<span className="end">{months_names_pl[month.month-1]}</span>
					</div>
			)})}
		</div>
	)}, [content]);
	
	useEffect(()=>{
		const fixed_shift = prepare_fixed_shift(content, shift);
		monthsLineRef.current.style.transform = "translateX("+fixed_shift+"%)";
	}, [shift])

	return months_line;
		
});

export default CloseUpMonths;


const prepare_fixed_shift = (content, shift) => {
	let fixed_shift_tmp = 0
	const left_month = content.months.find(month => (month.from*content.size.day <= -shift) && (month.to*content.size.day >= -shift));
	if(left_month){
		if(left_month.from*content.size.day+shift > -left_month.fix)
			fixed_shift_tmp = -left_month.pos;
		else 	
			fixed_shift_tmp = -left_month.pos + (shift + left_month.from*content.size.day+left_month.fix);
	} else throw new Error("No month within left edge");
	return fixed_shift_tmp;
}