import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import "./voyages.css";
import React from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';

function Voyages() {

    const [voyagesData, setVoyagesData] = useState([])
    const [count, setCount] = useState(0);
    
    const columns = [{
        dataField: '_id',
        text: 'Voyage Code'
    }, {
        dataField: 'shipName',
        text: 'Ship Name'
    }, {
        dataField: 'ID',
        text: 'Ship Code'
    }, {
        dataField: 'departurePlace',
        text: 'Departure Place'
    }, {
        dataField: 'depCode',
        text: 'Departure Place Code'
    }, {
        dataField: 'departureDate',
        text: 'Departure Date'
    }, {
        dataField: 'arrivalPlace',
        text: 'Arrival Place'
    }, {
        dataField: 'arrCode',
        text: 'Arrival Place Code'
    }, {
        dataField: 'arrivalDate',
        text: 'Arrival Date'
    }];
      
    return (
        <div>
            <NavbarComp />
            <SearchBarComp />
            <div className="sub-heading-container">
                <h3 className="sub-heading mt-5">Total results: {count}</h3>
            </div>
            <div className="cstm-body">
                <BootstrapTable
                    keyField="id"
                    data={voyagesData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>
            <FooterComp />
        </div>
    )
}

export default Voyages;