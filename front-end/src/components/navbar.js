import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./navbar.css";

function NavbarComp() {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			sticky="top"
			style={{ borderBottom: "1px solid #f0f0f0", backgroundColor: "#fff" }}
		>
			<Container>
				<Navbar.Brand href="/">
                    <span className="cstm-link">HeritageLab</span>
				</Navbar.Brand>
				<Navbar.Toggle className="cstm-toggle" aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="./voyages" className="cstm-start ms-2 me-2">Voyages</Nav.Link>
						<Nav.Link href="./ships" className="cstm-start ms-2 me-2">Ships</Nav.Link>
						<Nav.Link href="./places" className="cstm-start ms-2 me-2">Places</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComp;