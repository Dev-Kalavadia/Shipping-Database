import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalPlaces";
import HelpModalComp from "../components/helpmodal";
import "./places.css";
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

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/places`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
            },
        })
        .then((response) => {
            setPlacesData(response.data.docs);
            setCount(response.data.count)
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: 'name',
        text: 'Place Name',
        headerFormatter: headerFormatter,
        headerEvents: {
            onClick: (e, column, columnIndex) => {
                setSortBy('name');
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
			.get(`${process.env.REACT_APP_URI}/places`, {
				params: {
					sortBy: sortBy,
                    sortType : sortType,
				},
			})
			.then((response) => {
                setPlacesData(response.data.docs);
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
                    data={placesData}
                    columns={columns}
                    striped
                    hover
                    condensed
                />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <a>Showing {placesData.length} of {count} results</a>
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

export default Places;