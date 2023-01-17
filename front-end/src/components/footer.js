import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./footer.css";

function getYear() {
    return new Date().getFullYear();
}

function FooterComp() {
	return (
		<Container id="pad">
			<Navbar
				collapseOnSelect
				expand="lg"
				sticky="bottom"
				style={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fff" }}
				// className="footer"
			>
				<Container className="d-flex justify-content-center">
					<Nav>
						<Nav.Link className="d-flex justify-content-center me-2 ms-2">
							The Shipping Database
						</Nav.Link>
                        <Nav.Link href="https://heritagelab.center" className="d-flex justify-content-center cstm-btn me-2 ms-2">
							© {getYear()} HeritageLab Center  
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</Container>
	);
}

export default FooterComp;