import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalVoyages";
import HelpModalComp from "../components/helpmodal";
import "./voyages.css";
import React, { useEffect } from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";

function Voyages() {

    const [voyagesData, setVoyagesData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);

    React.useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/voyages`, {
            params: {
                
            },
        })
        .then((response) => {
            console.log(response)
            setVoyagesData(response.data.docs);
            setCount(response.data.count)
        });
	}, []);
    
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

    const getData = function () {
        axios
			.get(`${process.env.REACT_APP_URI}/voyages`, {
				params: {
					
				},
			})
			.then((response) => {
				setVoyagesData(response.data.docs);
                setCount(response.data.count)
			});
    }

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