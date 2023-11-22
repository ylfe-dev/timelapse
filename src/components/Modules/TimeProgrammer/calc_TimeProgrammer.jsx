import { dateToFloat, floatToDate } from '../../Timeline/mathTimeline'

export const prepareEvents = (content, data) => {
	if(data && Array.isArray(data)){
		const in_scope = data.filter((event) => 
			   event.period.from < content.size.scope_end 
			&& event.period.to > content.size.scope_start
		);
		const extracted = in_scope.map((event) => extractEventToScope(event, content));
		return extracted;
	} else return null;

	
}



const extractEventToScope = (event, content) => {
	const start = event.period.from < content.size.scope_start ? content.size.scope_start : event.period.from;
	const end  = event.period.to > content.size.scope_end ? content.size.scope_end : event.period.to;
	const start_p = (start - content.size.scope_start) / content.size.scope_width *100;
	const width_p = (end - start) / content.size.scope_width *100;
	return {...event, view: {left: start_p, size: width_p}};
}


