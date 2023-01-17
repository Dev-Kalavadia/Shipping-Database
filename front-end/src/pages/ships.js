import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalShips";
import HelpModalComp from "../components/helpmodal";
import "./ships.css";
import React from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';


function Ships() {
    const [shipsData, setShipsData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    
    const columns = [{
        dataField: 'ID',
        text: 'Ship ID'
    }, {
        dataField: 'shipName',
        text: 'Ship Name'
    }, {
        dataField: 'otherNames',
        text: 'Ship Other Names'
    }, {
        dataField: 'type',
        text: 'Ship type'
    }, {
        dataField: 'yearIn',
        text: 'Year In'
    }, {
        dataField: 'yearOut',
        text: 'Year Out'
    }, {
        dataField: 'last',
        text: 'Last Ship'
    }, {
        dataField: 'measurements',
        text: 'Ship Measurements'
    }];
      
    return (
        <div>
            <NavbarComp />
            <SearchBarComp setShowSearchModal={setShowSearchModal} setShowHelpModal={setShowHelpModal}/>
            <SearchModalComp showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}/>
            <HelpModalComp showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal}/>
            <div className="sub-heading-container">
                <h3 className="sub-heading mt-5">Total results: {count}</h3>
            </div>
            <div className="cstm-body">
                <BootstrapTable
                    keyField="id"
                    data={shipsData}
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

export default Ships;