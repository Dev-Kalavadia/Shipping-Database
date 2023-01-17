import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import "./main.css";
import React from "react";
import Landscape from "../assets/landscape.png";
import Nav from "react-bootstrap/Nav";

function Main() {
    return (
        <div>
            <NavbarComp />
            <div>
                <h1 className="cstm-title">The Shipping Database</h1>
                <h3 className="cstm-subtitle">
                    <i>
                        Over <b>56,000</b> searchable records of Dutch voyages, dates, ship types, ports of departure and origin, the movements of <b>1767</b> ships between <b>1595</b> and <b>1687</b> as well as data about cargos and other maritime trade activities between <b>1595</b> and <b>1660</b>.
                    </i>
                </h3>
                <img className="cstm-img" src={Landscape} height="769" alt="landscape"/>
                <h3 className="cstm-subtitle2">
                    The database can be used to explore how trade routes, port activities and ships changed over time and gives context to the changing maritime landscape of the Indian Ocean.
                </h3>
                <div className="cstm-container">
                    <Nav.Link href="./voyages" className="cstm-start2 ms-5 me-5">Voyages</Nav.Link>
                    <Nav.Link href="./ships" className="cstm-start2 ms-5 me-5">Ships</Nav.Link>
                    <Nav.Link href="./places" className="cstm-start2 ms-5 me-5">Places</Nav.Link>
                </div>
            </div>
            <FooterComp />
        </div>
    )
}

export default Main;

