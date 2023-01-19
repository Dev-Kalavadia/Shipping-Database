import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalShips";
import HelpModalComp from "../components/helpmodal";
import "./ships.css";
import "../components/loader.scss";
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
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(shipsData.length==0){
            setLoading(true)
        }
        axios
        .get(`${process.env.REACT_APP_URI}/ships`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
                page : page,
            },
        })
        .then((response) => {
            response.data.docs.forEach((dataPoint, idx) => {
                let tempData = dataPoint;
                // if the arrival date exists create display string
                if (dataPoint.otherNames) {
                    tempData.otherNames = dataPoint.otherNames.join(", ");
                } else {
                    tempData.otherNames = ""
                }
            })
            setLoading(false)
            setShipsData(response.data.docs);
            setCount(response.data.count);
            if (response.data.count / 100 > page) {
                setPage(page + 1);
            }
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: 'ID',
        text: 'Ship ID',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('ID');
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                setPage(0);
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
                    page : page,
				},
			})
			.then((response) => {
                response.data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    // if the arrival date exists create display string
                    if (dataPoint.otherNames) {
                        tempData.otherNames = dataPoint.otherNames.join(", ");
                    } else {
                        tempData.otherNames = ""
                    }
                })
                const joinedData = shipsData.concat(response.data.docs);
				setShipsData(joinedData);
                setCount(response.data.count)
                if (response.data.count / 100 > page) {
					setPage(page + 1);
				}
			});
    }
      
    return (
        <div>
            <NavbarComp />
            {!loading && <SearchBarComp setShowSearchModal={setShowSearchModal} setShowHelpModal={setShowHelpModal}/>}
            {!loading && <SearchModalComp showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}/>}
            {!loading && <HelpModalComp showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal}/>}
            {loading && <div className="d-flex justify-content-center cstm-holder"><ferry><chimney /><waves /></ferry></div>}
            {shipsData!=0 && <div className="sub-heading-container">
                <h3 className="sub-heading mt-5">Total results: {count}</h3>
            </div>}
            {shipsData!=0 && <div className="cstm-body">
                <BootstrapTable
                    keyField="id"
                    data={shipsData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>}
            {shipsData!=0 && <div className="d-flex justify-content-center mt-2">
                <a>Showing {shipsData.length} of {count} results</a>
            </div>}
            {shipsData!=0 && <div className="d-flex justify-content-center mt-3">
                {count!=shipsData.length && <Button
					className="cstm-btn-load me-2"
					onClick={loadMoreData}
				>
					Load More
				</Button>}
            </div>}
            {!loading && <FooterComp />}
        </div>
    )
}

export default Ships;