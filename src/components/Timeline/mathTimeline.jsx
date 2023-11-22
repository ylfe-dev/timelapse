export const dateToFloat = (date, precision) => {
	let days = dayOfYear(date);
	if(precision){
		const time_pos = (date - (new Date(date.getFullYear(), 0, days)))/1000/60/60/24;
		days += time_pos;
	}
	const day_pos = days/(date.getFullYear()%4? 365 : 366);
	const float_year =  date.getFullYear() + day_pos;
	return float_year;
}

export const floatToDate = floatDate => { 
	const year = Math.floor(floatDate);  //dostosowac do ujemnych?
	const day = Math.floor((floatDate-year)*(year%4 ? 365 : 366));
	const date =  new Date(year, 0, day); 
	return date;
}

export const dayOfYear = date => {
	let n = undefined;
	switch(typeof(date)) {
		case "object":
			const year = date.getFullYear();
			const month = date.getMonth()+1;
			const day = date.getDate();
			const N1 = Math.floor(275 * month / 9);
			const N2 = Math.floor((month + 9) / 12);
			const N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
			n = N1 - (N2 * N3) + day - 30;
		break;
		case "number":
			const year_n = Math.floor(date);
			const days_in_year = year_n%4? 365 : 366;
			n = Math.floor((date-year_n)*days_in_year);
		break;
	}
	return n;
}