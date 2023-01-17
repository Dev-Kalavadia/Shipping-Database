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
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("_id")

    React.useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/voyages`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
            },
        })
        .then((response) => {
            console.log(response)
            setVoyagesData(response.data.docs);
            setCount(response.data.count)
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: '_id',
        text: 'Voyage Code',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('_id');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'shipName',
        text: 'Ship Name',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('shipName');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'ID',
        text: 'Ship Code',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('ID');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'departurePlace',
        text: 'Departure Place',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('departurePlace');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'depCode',
        text: 'Departure Place Code',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('depCode');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'departureDate',
        text: 'Departure Date',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('departureDate');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'arrivalPlace',
        text: 'Arrival Place',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrivalPlace');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'arrCode',
        text: 'Arrival Place Code',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrCode');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'arrivalDate',
        text: 'Arrival Date',
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrivalDate');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
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