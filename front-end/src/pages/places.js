import NavbarComp from "../components/navbar";
import FooterComp from "../components/footer";
import SearchBarComp from "../components/searchbar";
import SearchModalComp from "../components/searchmodalPlaces";
import HelpModalComp from "../components/helpmodal";
import "./places.css";
import React from "react";
import {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";


function Places() {

    const [placesData, setPlacesData] = useState([])
    const [count, setCount] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("Name")

    React.useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URI}/places`, {
            params: {
                sortBy: sortBy,
                sortType : sortType,
            },
        })
        .then((response) => {
            console.log(response)
            setPlacesData(response.data.docs);
            setCount(response.data.count)
        });
	}, [sortBy, sortType]);
    
    const columns = [{
        dataField: 'name',
        text: 'Place Name',
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
            <FooterComp />
        </div>
    )
}

export default Places;