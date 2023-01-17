import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import "./places.css";
import React from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';


function Places() {
    const [placesData, setPlacesData] = useState([])
    const [count, setCount] = useState(0);
    
    const columns = [{
        dataField: 'Name',
        text: 'Place Name'
    }, {
        dataField: 'modernName',
        text: 'Modern Name'
    }, {
        dataField: 'code',
        text: 'Place Code'
    }, {
        dataField: 'lat',
        text: 'Latitude'
    }, {
        dataField: 'degr1',
        text: 'Latitude Degree'
    }, {
        dataField: 'Min1',
        text: 'Latitude Min'
    }, {
        dataField: 'long',
        text: 'Longitude'
    }, {
        dataField: 'degr2',
        text: 'Longitude Degree'
    }, {
        dataField: 'Min2',
        text: 'Longitude Min'
    }, {
        dataField: 'geoRef',
        text: 'Geo Reference'
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
                    data={placesData}
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

export default Places;