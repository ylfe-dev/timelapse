import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

function Header(props){
	return(
		<header className="px-4 justify-content-between row">
			<Col xs="12" className="mt-5 d-none d-sm-block"></Col>
			<Link to="/" className="col col-6 col-sm-12 align-self-center">
				<Row className="logo gx-3 gy-sm-3 justify-content-center" >
					<Col xs="4" sm="7"><img className="img-fluid" alt="Timelapse logo" src="assets/logo_w.png"/></Col>					
					<Col xs="8" sm="10"><img className="img-fluid" alt="Timelapse logotype" src="assets/logotype_w.png"/></Col>
				</Row>
			</Link>
			<Col xs="auto align-self-center">
				<button onClick={()=>props.setMenu(!props.menu)} className="btn d-block d-sm-none">
					<i className="fa-solid fa-bars text-white m-0 h1"></i>
				</button>
			</Col>	
		</header>
	);
}
export default Header;