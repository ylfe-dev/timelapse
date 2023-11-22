

export const viewReducer = (view, action) => {
	switch (action.type) {
		case "zoom": {
			const new_scope = view.scope * (1 + (action.value/view.container.width));
			const [nScope, nTouchesPerUnit] = normalizeScope(new_scope, view);
			//const mouse_dx_p = (action.mouse.x - view.container.left) / view.container.width;
			//const nRef = view.ref + (mouse_dx_p - 0.5)*view.scope;
			return {...view, scope: nScope, unit_precision: nTouchesPerUnit};
		}
		case "move": {
			return {...view, ref: view.ref - (action.value / view.container.width) * view.scope};
		}
		case "resize": {
			const dx_p = (view.container.width - action.container.width) / view.container.width;
			const new_scope =  view.scope - view.scope*dx_p;
			const [nScope, nTouchesPerUnit] = normalizeScope(new_scope, {...view, container: action.container});
			return {...view, scope: nScope, unit_precision: nTouchesPerUnit, container: action.container};
		}
		default: throw Error("Unknown action type: "+action.type);
	}
}


export const initViewReducer = (inits) => {
	const view_units = inits.scope/inits.unit;
	const touches_on_unit = inits.container.touches.x / view_units;
	const tmp_view = {...inits, container: inits.container}
	const [nScope, nTouchesPerUnit] = normalizeScope(inits.scope, tmp_view);
	return {...tmp_view, scope: nScope, unit_precision: nTouchesPerUnit}; 
}


const normalizeScope = (new_scope, view) => {
		const new_inview_units = (new_scope / view.unit);
		const new_touchesPerUnit = view.container.touches.x / new_inview_units;
		if ( new_touchesPerUnit > view.maxTouchesPerUnit ){
			const min_units = view.container.touches.x / view.maxTouchesPerUnit;
			const min_scope = min_units * view.unit;
			return [min_scope, view.maxTouchesPerUnit];
		} else if (new_touchesPerUnit < view.minTouchesPerUnit ) {
			const max_units = view.container.touches.x / view.minTouchesPerUnit;
			const max_scope = max_units * view.unit;
			return [max_scope, view.minTouchesPerUnit];
		} else return [new_scope, new_touchesPerUnit];
		
}