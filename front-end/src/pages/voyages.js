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
import Button from "react-bootstrap/Button";

function headerFormatter(column, colIndex) {
    return (
      <a href="#" className="cstm-header-link">{column.text}</a>
    );
}

function Voyages() {

    const [voyagesData, setVoyagesData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("_id")
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/voyages`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
                page : page,
            },
        })
        .then((response) => {
            // Tokenize date
            response.data.docs.forEach((dataPoint, idx) => {
                let tempData = dataPoint;
                if (dataPoint.arrivalDate) {
                    console.log(dataPoint.arrivalDate)
                    let [date1, time1] = dataPoint.arrivalDate.split("T")
                    tempData.arrivalDate = date1
                } else {
                    tempData.arrivalDate = ""
                }
                if (dataPoint.departureDate) {
                    let [date2, time2] = dataPoint.departureDate.split("T")
                    tempData.departureDate = date2
                } else {
                    tempData.departureDate = ""
                }
            })
            setVoyagesData(response.data.docs);
            setCount(response.data.count);
            if (response.data.count / 100 > page) {
                setPage(page + 1);
            }
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: '_id',
        text: 'Voyage Code',
        headerFormatter: headerFormatter,
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
        dataField: 'ID',
        text: 'Ship Code',
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
        dataField: 'departurePlace',
        text: 'Departure Place',
        headerFormatter: headerFormatter,
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
        headerFormatter: headerFormatter,
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
        headerFormatter: headerFormatter,
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
        headerFormatter: headerFormatter,
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
        headerFormatter: headerFormatter,
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
        headerFormatter: headerFormatter,
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

    const loadMoreData = function () {
        axios
			.get(`${process.env.REACT_APP_URI}/voyages`, {
				params: {
					sortBy: sortBy,
                    sortType : sortType,
                    page : page,
				},
			})
			.then((response) => {
                // Tokenize date
                response.data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    if (dataPoint.arrivalDate) {
                        console.log(dataPoint.arrivalDate)
                        let [date1, time1] = dataPoint.arrivalDate.split("T")
                        tempData.arrivalDate = date1
                    } else {
                        tempData.arrivalDate = ""
                    }
                    if (dataPoint.departureDate) {
                        let [date2, time2] = dataPoint.departureDate.split("T")
                        tempData.departureDate = date2
                    } else {
                        tempData.departureDate = ""
                    }
                })
                const joinedData = voyagesData.concat(response.data.docs);
				setVoyagesData(joinedData);
                setCount(response.data.count)
                if (response.data.count / 100 > page) {
					setPage(page + 1);
				}
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
            <div className="d-flex justify-content-center mt-2">
                <a>Showing {voyagesData.length} of {count} results</a>
            </div>
            <div className="d-flex justify-content-center mt-3">
                {count!=voyagesData.length && <Button
					className="cstm-btn-load me-2"
					onClick={loadMoreData}
				>
					Load More
				</Button>}
            </div>
            <FooterComp />
        </div>
    )
}

export default Voyages;