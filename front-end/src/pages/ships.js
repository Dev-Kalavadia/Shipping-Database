import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalShips";
import HelpModalComp from "../components/helpmodal";
import "./ships.css";
import React, { useEffect } from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import Button from "react-bootstrap/Button";

function headerFormatter(column, colIndex) {
    return (
      <a href="#" className="cstm-header-link">{column.text}</a>
    );
}

function Ships() {

    const [shipsData, setShipsData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("ID")

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/ships`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
            },
        })
        .then((response) => {
            setShipsData(response.data.docs);
            setCount(response.data.count)
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: 'ID',
        text: 'Ship ID',
        headerFormatter: headerFormatter,
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
        dataField: 'shipName',
        text: 'Ship Name',
        headerFormatter: headerFormatter,
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
        dataField: 'otherNames',
        text: 'Other Ship Names',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('otherNames');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'type',
        text: 'Ship type',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('type');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'yearIn',
        text: 'Year In',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('yearIn');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'yearOut',
        text: 'Year Out',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('yearOut');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'last',
        text: 'Last Ship',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('last');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }, {
        dataField: 'measurements',
        text: 'Ship Measurements',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('measurements');
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
    }];

    const loadMoreData = function () {
        axios
			.get(`${process.env.REACT_APP_URI}/ships`, {
				params: {
					sortBy: sortBy,
                    sortType : sortType,
				},
			})
			.then((response) => {
				setShipsData(response.data.docs);
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
                    data={shipsData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <a>Showing {shipsData.length} of {count} results</a>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Button
					className="cstm-btn-load me-2"
					onClick={loadMoreData}
				>
					Load More
				</Button>
            </div>
            <FooterComp />
        </div>
    )
}

export default Ships;