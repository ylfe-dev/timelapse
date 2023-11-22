import { dateToFloat, floatToDate, dayOfYear} from '../mathTimeline'

const calcCloseUp = (offset_view) => {
 	console.log("Re-Calc...");
	let days = [];   // [dayofweek 0-6, date 0-31]
	let months = []; // {month: 0-11, from: day_n, to: day_m}
	let years = [];  // {year: xxxx,  from: day_n, to: day_m}

	const offset_start =  offset_view.ref-offset_view.scope*offset_view.scale/2;
	const offset_end =  offset_view.ref+offset_view.scope*offset_view.scale/2;

	const date_start = floatToDate(offset_start); 
	const one_day_length = 1/365.25;
	const offset_real_start = dateToFloat(date_start, false);

  let date_current = new Date(date_start.valueOf());
  for( let day = 0; (day*one_day_length+offset_real_start) < offset_end; day++){
		days.push([date_current.getDay(), date_current.getDate()]);
		if(date_current.getDate()==1 || !months.length){
			months.push({month: date_current.getMonth()+1, from: days.length-1, to: undefined});
			if(months.length>1)
				months[months.length-2].to = days.length-1;
			if(date_current.getMonth()==0 || !years.length){
				years.push({year: date_current.getFullYear(), from: days.length-1, to: undefined});
				if(years.length>1)
					years[years.length-2].to = days.length-1;
			}
		}
		date_current.setDate(date_current.getDate()+1);
	}
	if(months.length)
		months[months.length-1].to = days.length;
	if(years.length)
		years[years.length-1].to = days.length;

	const offset_real_end = offset_real_start + days.length/365.25;

	const day_offset_width_percent = 100/(offset_view.scope*365.25) * days.length;
	const day_width_percent = 100/days.length;
	const in_view_days = offset_view.scope/one_day_length;

	//sunset and sunrise if under 14 days in-view
	const sun_h = sun(offset_view.ref, {X: 16.996214 ,Y: 51.097140}, 1);
	let sun_p = {rise: sun_h.rise/24*100, period: (sun_h.set-sun_h.rise)/24*100};
	
	

	//border-sticking months fixes
	let sum_fixes = 0;
	months = months.map(month => {
		let fixed_shift = 0; //days
		let fixed_pos = (month.from-sum_fixes)*day_width_percent; //%
		const month_size = (month.to - month.from)*one_day_length;
		if(month_size > offset_view.scope)
			fixed_shift = (month_size-offset_view.scope)/one_day_length*day_width_percent;
		sum_fixes+=fixed_shift;
		return { ...month, fix: fixed_shift, pos: fixed_pos };
	});



	const results = {
		days: days, 
		months: months, 
		years: years, 
		
		size: {
			unit: day_width_percent,
			day: day_width_percent,
			scope: day_offset_width_percent,
			scope_start: offset_real_start,
			scope_end: offset_real_end,
			scope_width: offset_real_end-offset_real_start,
		},
		sun: sun_p,
	}

	return results;
};

export default calcCloseUp;






const sun = (date, pos, timezone=0) => {
	const zenith = degreesToFloat(90, 50); 

	const yearDay = dayOfYear(date);
	const zone_offset = typeof(date)=="object"? date.getTimezoneOffset()/(-60) : timezone;
	const lngHour = pos.X / 15;
	
	function calc(sun_pos, UTC_offset){
		const t = sun_pos==="rise" ? yearDay + ((6 - lngHour) / 24) : yearDay + ((18 - lngHour) / 24) ;
		const M =  (0.9856 * t) - 3.289;
		const L = normalize360(M + (1.916 * Math.sin(rad(M))) + (0.020 * Math.sin(rad(2 * M))) + 282.634);

		let RA = normalize360(deg(Math.atan(0.91764 * Math.tan(rad(L)))));
		const Lquadrant = (Math.floor(L/90)) * 90;
		const RAquadrant = (Math.floor(RA/90)) * 90;
		RA = RA + (Lquadrant - RAquadrant);
		RA = RA / 15;

		const sinDec = 0.39782 * Math.sin(rad(L));
		const cosDec = Math.cos(Math.asin(sinDec));
		
		const cosH = (Math.cos(rad(zenith)) - (sinDec * Math.sin(rad(pos.Y)))) / (cosDec * Math.cos(rad(pos.Y)));
		if (cosH >  1) return sun_pos==="rise" ? -1 : 25;  //allday night
		if (cosH < -1) return sun_pos==="rise" ? 25 : -1; //allday daylight

		let H = sun_pos==="rise" ? (360 - deg(Math.acos(cosH))) : deg(Math.acos(cosH));
		H = H / 15;

		const T =  H + RA - (0.06571 * t) - 6.622;
		const UT = normalize24(T - lngHour);

		const localT = UT + UTC_offset;
		return localT;
	}
	
	
	const sunrise = calc("rise", zone_offset);
	const sunset = calc("set", zone_offset);
	
	return {rise: sunrise, set: sunset};
}


const degreesToFloat = (deg, min=0, sec=0) => {
	return deg + min/60 + sec/60/60;
}

const normalize360 = deg => {
	if(deg>=360) return deg-360;
	if(deg<0) return deg+360;
	return deg;
}

const normalize24 = h => {
	if(h>=24) return h-24;
	if(h<0) return h+24;
	return h;
}

const rad = deg => deg*Math.PI/180;
const deg = rad => rad/Math.PI*180;
