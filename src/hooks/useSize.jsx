import { useState, useEffect, useRef, Children, cloneElement } from 'react';
import { useEnvironment } from '../EnvironmentProvider'

const useSize = () => { 
	const env = useEnvironment();

	const [size, setSize] = useState(null);
	
	const elementRef = useRef(null); 
	const lastSize = useRef(null); 
	const resize = useRef({observer: null, element: null}); 

	resize.current.observer = new ResizeObserver(entries => {
			const rect = entries[0].contentRect;
			const clientRect = elementRef.current.getBoundingClientRect();
			let touches_rect = {x: rect.width / env.precision, y: rect.height / env.precision} ;
			const delta_rect = lastSize.current ? {x: (rect.width - lastSize.current.width)/lastSize.current.width, y: (rect.height - lastSize.current.height)/lastSize.current.height} : {x: 0, y: 0};
			lastSize.current = rect;
			setSize({
				top: clientRect.top,
				left: clientRect.left,
				width: rect.width, 
				height: rect.height, 
				touches: touches_rect, 
				delta: delta_rect,
			});
		});


	useEffect(()=>{
		resize.current.observer.observe(elementRef.current);
		resize.current.element = elementRef.current;
		return  () => resize.current.observer.unobserve(resize.current.element);
		
	}, [])


	return [size, elementRef]
}
export default useSize;