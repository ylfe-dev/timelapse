import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Menu(props){
	const location = useLocation();
	const menuList = [{name:"Home", link:"/", icon: "fa-solid fa-house"},
										{name:"Tutorials", link:"/tutorial", icon: "fa-solid fa-book"},
										{name:"Prices", link:"/offer", icon: "fa-solid fa-dollar-sign"},
										{name:"Self Hosting", link:"/download", icon: "fa-solid fa-server"}];
	return(
		<Row className="menu justify-content-end m-0 mt-5 d-sm-block ">
			<Col sm="12" className="my-3 p-0  px-4">
				<Link
	      	className="nav-link app-link py-2 px-3" 
	      	draggable="false"
	      	to="/app"
	      	onClick={()=>props.setMenu(false)}>
	    		App
	    	</Link>
	    </Col>

			<Col sm="12" className=" p-0  ps-3">
				<Nav id="side-nav" className="flex-column">
		      {menuList.map( (item, id) => { return(
		      	<Nav.Item key={id} className=" my-1">
		      		<Link 
			      		className={(location.pathname===item.link? "active" : "")+" nav-link px-3"} 
			      		draggable="false"
			      		to={item.link}
			      		onClick={()=>props.setMenu(false)}>
		      			<i className={item.icon+" me-4 d-inline d-sm-none d-lg-inline"}/>{item.name}
		      	</Link></Nav.Item>
		      )})}
			  </Nav>
			</Col>
		</Row>
		);
}

export default Menu;