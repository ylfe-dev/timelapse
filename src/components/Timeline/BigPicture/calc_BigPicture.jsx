
const calcBigPicture = (offset_view) => {
	let years = [];
	const offset_start_year = Math.floor(offset_view.ref - offset_view.scope * offset_view.scale / 2);
	const offset_end = offset_view.ref + offset_view.scope * offset_view.scale / 2;
	for(let i=0; offset_start_year+i<offset_end; i++)
		years.push(offset_start_year+i) ;

	const year_width_percent = 100/years.length;
	const percent_offset_width = years.length / offset_view.scope *100;

	return {
		years: years,
		
		year_width: year_width_percent, 
		scope_width: percent_offset_width,
		start: offset_start_year,

		size: {
			unit:  year_width_percent,
			scope: percent_offset_width,
			scope_start: offset_start_year,
		}
	}
}
export default calcBigPicture;