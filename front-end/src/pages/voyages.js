import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalVoyages";
import HelpModalComp from "../components/helpmodal";
import ExtraModalComp from "../components/extramodal";
import "./voyages.css";
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

function cellFormatter(cell, row) {
    return ( 
      <a href="#">{cell}</a>
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
    const [loading, setLoading] = useState(false);
    const [searchLink, setSearchLink] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [showExtraModal, setShowExtraModal] = useState(false);
    const [extraData, setExtraData] = useState([])
    const [extraState, setExtraState] = useState(0)
    
    const columns = [{
        dataField: '_id',
        text: 'Voyage Code',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('_id');
                setPage(0);
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoVoyages(row._id);
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
        dataField: 'ID',
        text: 'Ship Code',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
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
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoShips(row.ID);
            }   
        },
    }, {
        dataField: 'departurePlace',
        text: 'Departure Place',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('departurePlace');
                setPage(0);
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoPlaces(row.departurePlace);
            }   
        },
    }, {
        dataField: 'depCode',
        text: 'Departure Place Code',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('depCode');
                setPage(0);
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoPlaces(row.departurePlace);
            }   
        },
    }, {
        dataField: 'departureDate',
        text: 'Departure Date',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('departureDate');
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
        dataField: 'arrivalPlace',
        text: 'Arrival Place',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrivalPlace');
                setPage(0);
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoPlaces(row.arrivalPlace);
            }   
        },
    }, {
        dataField: 'arrCode',
        text: 'Arrival Place Code',
        headerFormatter: headerFormatter,
        formatter: cellFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrCode');
                setPage(0);
                if (sortType ==='asc'){
                    setSortType('desc');
                }
                else {
                    setSortType('asc');
                }
            }
        },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                extrainfoPlaces(row.arrivalPlace);
            }   
        },
    }, {
        dataField: 'arrivalDate',
        text: 'Arrival Date',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('arrivalDate');
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

    useEffect(() => {
        if(voyagesData.length==0){
            setLoading(true)
        }
        if(!isSearch){
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
                setLoading(false)
                setVoyagesData(response.data.docs);
                setCount(response.data.count);
                if (response.data.count / 100 > page) {
                    setPage(page + 1);
                }
            });
        }
        else if (isSearch){
            axios
            .post(`${process.env.REACT_APP_URI}/voyages/search?${searchLink}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`, {
                params: {
                },
            })
            .then((response) => {
                // Tokenize date
                response.data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    if (dataPoint.arrivalDate) {
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
                setLoading(false)
                setVoyagesData(response.data.docs);
                setCount(response.data.count);
                if (response.data.count / 100 > page) {
                    setPage(page + 1);
                }
            });
        }
	}, [sortBy, sortType, searchLink]);

    const extrainfoVoyages = function (id) {
        axios
        .get(`${process.env.REACT_APP_URI}/voyages/${id}`, {
            params: {
            },
        })
        .then((response) => {
            setShowExtraModal(true)
            setExtraState(0)
            if (response.data.arrivalDate) {
                let [date1, time1] = response.data.arrivalDate.split("T")
                response.data.arrivalDate = date1
            } else {
                response.data.arrivalDate = ""
            }
            if (response.data.departureDate) {
                let [date2, time2] = response.data.departureDate.split("T")
                response.data.departureDate = date2
            } else {
                response.data.departureDate = ""
            }
            let temp = Object.assign({}, response.data);
            setExtraData(temp)
        });
    }

    const extrainfoShips = function (id) {
        axios
        .get(`${process.env.REACT_APP_URI}/ships/${id}`, {
            params: {
            },
        })
        .then((response) => {
            setShowExtraModal(true)
            setExtraState(1)
            if (response.data[0].otherNames) {
                response.data[0].otherNames = response.data[0].otherNames.join(", ");
            } else {
                response.data[0].otherNames = ""
            }
            setExtraData(response.data[0])
        });
    }

    const extrainfoPlaces = function (id) {
        axios
        .get(`${process.env.REACT_APP_URI}/places/${id}`, {
            params: {
            },
        })
        .then((response) => {
            setShowExtraModal(true)
            setExtraState(2)
            setExtraData(response.data[0])
        });
    }
    
    const loadMoreData = function () {
        if(!isSearch){
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
        else if (isSearch){
            axios
                .post(`${process.env.REACT_APP_URI}/voyages/search?${searchLink}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`, {
                    params: {
                    },
                })
                .then((response) => {
                    // Tokenize date
                    response.data.docs.forEach((dataPoint, idx) => {
                        let tempData = dataPoint;
                        if (dataPoint.arrivalDate) {
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
    }

    return (
        <div>
            <NavbarComp />
            {!loading && <SearchBarComp setShowSearchModal={setShowSearchModal} setShowHelpModal={setShowHelpModal}/>}
            {!loading && <SearchModalComp showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} setSearchLink={setSearchLink} setPage={setPage} setSortBy={setSortBy} setIsSearch={setIsSearch}/>}
            {!loading && <ExtraModalComp showExtraModal={showExtraModal} setShowExtraModal={setShowExtraModal} extraData={extraData} setExtraData={setExtraData} extraState={extraState}/>}
            {!loading && <HelpModalComp showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal}/>}
            {loading && <div className="d-flex justify-content-center cstm-holder"><ferry><chimney /><waves /></ferry></div>}
            {voyagesData!=0 && <div className="sub-heading-container">
                <h3 className="sub-heading mt-5">Total results: {count}</h3>
            </div>}

            {voyagesData!=0 && <div className="cstm-body">
                <BootstrapTable
                    keyField="id"
                    data={voyagesData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>}
            {voyagesData!=0 && <div className="d-flex justify-content-center mt-2">
                <a>Showing {voyagesData.length} of {count} results</a>
            </div>}
            {voyagesData!=0 && <div className="d-flex justify-content-center mt-3">
                {count!=voyagesData.length && <Button
					className="cstm-btn-load"
					onClick={loadMoreData}
				>
					Load More
				</Button>}
            </div>}
            {!loading && <FooterComp />}
        </div>
    )
}

export default Voyages;