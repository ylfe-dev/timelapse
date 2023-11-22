import { useState, useEffect, useRef, Children, cloneElement } from 'react';


const WithLineControl = ({changeView, children, ...props}) => { 
	const [pointerDown, setPointerDown] = useState(false);
	const [pinch, setPinch] = useState(false);

	const primaryLast = useRef(null);
	const secondaryLast = useRef(null);
	const pointers = useRef(new Map());


	const wheelHandler = e => {
		changeView({type:"zoom", value:  e.deltaY, mouse:{x: e.clientX, y: e.clientY}});
	}
	
	const pointerDownHandler = e => {
		pointers.current.set(e.pointerId, e);
		setPointerDown(true);
		if(e.isPrimary)
			primaryLast.current = e;
		if(pointers.current.size > 1){
			setPinch(true)
			secondaryLast.current = e; //? test if event.isPrimary is not buggy here
		}
	}
	

	useEffect(()=>{

		const pointerUpHandler = (e) => {
			pointers.current.delete(e.pointerId);

			if(primaryLast.current.pointerId === e.pointerId && pointers.current.size > 0){
				primaryLast.current = [...pointers.current.entries()][0];
				if(pointers.current.size > 1)
					secondaryLast.current = [...pointers.current.entries()][1];
			}
			if(pinch && secondaryLast.current.pointerId === e.pointerId && pointers.current.size > 1 )
				secondaryLast.current = [...pointers.current.entries()][1];

			if(pinch && pointers.current.size < 2)
				setPinch(false)
			if(pointers.current.size < 1)
				setPointerDown(false);
		}
	
		const pointerMoveHandler = e => {
			if( pinch && (e.pointerId === primaryLast.current.pointerId || e.pointerId === secondaryLast.current.pointerId)){
				const dz_old = Math.abs(primaryLast.current.clientX - secondaryLast.current.clientX);
				if(e.pointerId === primaryLast.current.pointerId)
					primaryLast.current = e;
				else 
					secondaryLast.current = e;
				const dz_now = Math.abs(primaryLast.current.clientX - secondaryLast.current.clientX);
				const dz = dz_now - dz_old;
				const dz_xPosition = (primaryLast.current.clientX + secondaryLast.current.clientX)/2;
				changeView({type:"zoom", value:  dz, mouse:{x: dz_xPosition, y: primaryLast.current.clientY}});
			}
			else if( pointerDown && e.isPrimary ){ 
				const dx = e.clientX - primaryLast.current.clientX;
				primaryLast.current = e;
				changeView({type:"move", value: dx});
			}
		}

		const removePointerListeners = () => { 
			window.removeEventListener('pointerleave', pointerUpHandler);
			window.removeEventListener('pointerup', pointerUpHandler);
			window.removeEventListener('pointermove', pointerMoveHandler);
		}

		const addPointerListeners = () => { 
			window.addEventListener('pointerleave', pointerUpHandler);
			window.addEventListener('pointerup', pointerUpHandler);
			window.addEventListener('pointermove', pointerMoveHandler);
		}

		pointerDown ? addPointerListeners() : removePointerListeners();

		return removePointerListeners
	}, [pointerDown])


	const eventHandlingProps = {
		onPointerDown: pointerDownHandler, 
		onWheel: wheelHandler,

	};

	return (
		<>
			{Children.map(children, (child) => {
				return cloneElement(child, {...props, eventHandlers: eventHandlingProps})
			})}
		</>
	);
}

export default WithLineControl;

