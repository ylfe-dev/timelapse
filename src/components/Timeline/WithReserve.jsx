import { useState, useEffect,  useMemo,  Children, cloneElement} from 'react';


const WithReserve = ({view, calcContent, children, ...props}) => {

	const [offsetWindow, setOffsetWindow] = useState({
		ref: view.ref, 
		scope: view.scope, 
		scale: 2 });

	const content = useMemo(() => calcContent(offsetWindow), [offsetWindow]);

	useEffect(()=>{
		setOffsetWindow(prev => ({...prev, ref: view.ref, scope: view.scope}));
	},[view.scope]);

	let shift = -((view.ref-offsetWindow.scope/2) - content.size.scope_start)*(1/view.unit)*content.size.unit; //%
	shift = shift > 0 ? 0 : shift;

	useEffect(()=>{
		const isOutOfOffset = (shift >= 0 || shift/100 <= -(content.size.scope-100)/content.size.scope);
		if(isOutOfOffset)
			setOffsetWindow(prev => ({...prev, ref: view.ref, scope: view.scope}));
	}, [view.ref]);

	return (
		<>
			{Children.map(children, (child) => {
				return cloneElement(child, {...props, content: content, shift: shift});
			})}
		</>
	);

}
export default WithReserve;
