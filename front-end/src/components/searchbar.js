import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./searchbar.css";

function SearchBarComp() {
	return (
		<div className="mt-5" style={{ display: "flex", justifyContent: "center" }}>
			<Form className="d-flex" style={{ minWidth: "30%" }}>
				<Form.Control
					type="search"
					placeholder="🔍	Search..."
					className="me-2 searchbar"
					aria-label="Search"
					size="lw"
				/>
			</Form>
		</div>
	);
}

export default SearchBarComp;