import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalPlaces";
import HelpModalComp from "../components/helpmodal";
import "./places.css";
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

function Places() {

    const [placesData, setPlacesData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("Name")
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchLink, setSearchLink] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        if(placesData.length==0){
            setLoading(true)
        }
        if(!isSearch){
            axios
                .get(`${process.env.REACT_APP_URI}/places`, {
                    params: {
                        sortBy: sortBy,
                        sortType : sortType,
                        page : page,
                    },
                })
                .then((response) => {
                    setLoading(false)
                    setPlacesData(response.data.docs);
                    setCount(response.data.count);
                    if (response.data.count / 100 > page) {
                        setPage(page + 1);
                    }
                });
        }
        else if (isSearch){
            axios
                .post(`${process.env.REACT_APP_URI}/places/search?${searchLink}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`, {
                    params: {
                    },
                })
                .then((response) => {
                    setLoading(false)
                    setPlacesData(response.data.docs);
                    setCount(response.data.count);
                    if (response.data.count / 100 > page) {
                        setPage(page + 1);
                    }
                });
        }
	}, [sortBy, sortType, searchLink]);
    
    const columns = [{
        dataField: 'name',
        text: 'Place Name',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('name');
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
        dataField: 'modernName',
        text: 'Modern Name',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('modernName');
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
        dataField: 'code',
        text: 'Place Code',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('code');
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
        dataField: 'lat',
        text: 'Latitude',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('lat');
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
        dataField: 'degr1',
        text: 'Latitude Degree',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('degr1');
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
        dataField: 'min1',
        text: 'Latitude Min',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('min1');
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
        dataField: 'long',
        text: 'Longitude',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('long');
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
        dataField: 'degr2',
        text: 'Longitude Degree',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('degr2');
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
        dataField: 'min2',
        text: 'Longitude Min',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('min2');
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
        dataField: 'geoRef',
        text: 'Geo Reference',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('geoRef');
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
        if(!isSearch){
            axios
                .get(`${process.env.REACT_APP_URI}/places`, {
                    params: {
                        sortBy: sortBy,
                        sortType : sortType,
                        page : page,
                    },
                })
                .then((response) => {
                    const joinedData = placesData.concat(response.data.docs);
                    setPlacesData(joinedData);
                    setCount(response.data.count)
                    if (response.data.count / 100 > page) {
                        setPage(page + 1);
                    }
                });
        }
        else if (isSearch){
            axios
                .post(`${process.env.REACT_APP_URI}/places/search?${searchLink}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`, {
                    params: {
                    },
                })
                .then((response) => {
                    const joinedData = placesData.concat(response.data.docs);
                    setPlacesData(joinedData);
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
            {!loading && <SearchModalComp showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} setSearchLink={setSearchLink} setPage={setPage} setSortBy={setSortBy} setIsSearch={setIsSearch}/>}            {!loading && <HelpModalComp showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal}/>}
            {loading && <div className="d-flex justify-content-center cstm-holder"><ferry><chimney /><waves /></ferry></div>}
            {placesData!=0 && <div className="sub-heading-container">
                <h3 className="sub-heading mt-5">Total results: {count}</h3>
            </div>}
            {placesData!=0 && <div className="cstm-body">
                <BootstrapTable
                    keyField="id"
                    data={placesData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>}
            {placesData!=0 &&  <div className="d-flex justify-content-center mt-2">
                <a>Showing {placesData.length} of {count} results</a>
            </div>}
            {placesData!=0 && <div className="d-flex justify-content-center mt-3">
                {count!=placesData.length && <Button
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

export default Places;