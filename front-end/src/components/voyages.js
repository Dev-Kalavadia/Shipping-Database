import React, {useEffect} from "react";
import {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import BootstrapTable from 'react-bootstrap-table-next';
import {Table,Navbar,Nav,NavDropdown,Image,Button, Row, Col,Container, Modal} from 'react-bootstrap';
import {api,assets} from "src";
import Link from 'next/link';
import { css } from "@emotion/react";
import Autocomplete from 'react-autocomplete';

export default function DataTable() {

    const [count, setCount] = useState(0);
    const [voyagesData, setVoyagesData] = useState([])
    const [voyagesData2, setVoyagesData2] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("_id")
    const [hasMore, setHasMore] = useState(false)
    const [show, setShow] = useState(false)
    const [advsearch, setAdvsearch] = useState(false)
    const [searchLink, setSearchLink] = useState("")
    const [depaPlace, setDepaPlace] = useState("")
    const [depaCodef, setDepaCodef] = useState("")
    const [depaCodet, setDepaCodet] = useState("")
    const [arriPlace, setArriPlace] = useState("")
    const [arriCodef, setArriCodef] = useState("")
    const [arriCodet, setArriCodet] = useState("")
    const [voyaCode, setVoyaCode] = useState("")
    const [shiName, setShiName] = useState("")
    const [shiCode, setShiCode] = useState("")
    const [arriyearf, setArriyearf] = useState("")
    const [arriyeart, setArriyeart] = useState("")
    const [arrimonthf, setArrimonthf] = useState("")
    const [arrimontht, setArrimontht] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [extrastate, setextrastate] = useState(false)
    const [extrastate2, setextrastate2] = useState(false)
    const [extrastate3, setextrastate3] = useState(false)
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [suggestionslink, setSuggestionsLink] = useState("")
    const [iserror, setIserror] = useState(false)
    const [errortxt, setErrortxt] = useState("")
    const [depayearf, setDepayearf] = useState("")
    const [depayeart, setDepayeart] = useState("")
    const [depamonthf, setDepamonthf] = useState("")
    const [depamontht, setDepamontht] = useState("")
    const [value, setvalue] = useState("")

    useEffect(() => {
        getData({page:0})
    },[searchLink, sortBy, sortType])

    function cellFormatter(cell, row) {
        return ( 
          <a href="#">{cell}</a>
        );
    }

    function headerFormatter(column, colIndex) {
        return (
          <a href="#">{column.text}</a>
        );
    }
    
    const columns = [
        {
            dataField: '_id',
            text: 'Voyage Code',
            sort: false,
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('_id');
                    if (sortType ==='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo(row._id);
                }
            },
        },
        {
            dataField: 'shipName',
            text: 'Ship Name',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('shipName');
                    if (sortType==='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'ID',
            text: 'Ship Code',
            sort: false,
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('ID');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setSortType('desc');
                        setVoyagesData([]);
                        setVoyagesData2([]);
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo2(row.ID);
                }   
            },
        },
        {
            dataField: 'departurePlace',
            text: 'Departure Place',
            sort: false,
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('departurePlace');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo3(row.departurePlace);
                }   
            },
        },
        {
            dataField: 'depCode',
            text: 'Departure Place Code',
            sort: false,
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('depCode');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo3(row.departurePlace);
                }   
            },
        },
        {
            dataField: 'departureDate',
            text: 'Departure Date',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('departureDate');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'arrivalPlace',
            text: 'Arrival Place',
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('arrivalPlace');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo3(row.arrivalPlace);
                }   
            },
        }, {
            dataField: 'arrCode',
            text: 'Arrival Place Code',
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('arrCode');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			},
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    extrainfo3(row.arrivalPlace);
                }   
            },
        }, {
            dataField: 'arrivalDate',
            text: 'Arrival Date',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('arrivalDate');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setVoyagesData([]);
                        setVoyagesData2([]);
                        setSortType('asc');
                    }
				}
			}
        }
    ]

    const filters=[
        {
            placeholder:"Departure Place...",
        },
        {
            placeholder:"Departure Code From...",
        },
        {
            placeholder:"Departure Code To...",
        },
        {
            placeholder:"Arrival Place...",
        },
        {
            placeholder:"Arrival Place Code From...",
        },
        {
            placeholder:"Arrival Place Code To...",
        },	
        {
            placeholder:"Voyage Code...",
        },
        {
            placeholder:"Ship Name...",
        },
        {
            placeholder:"Other Ship Names...",
        },
        {
            placeholder:"Ship Code...",
        },
        {
            placeholder:"Arrival Year Start...",
        }, 
        {
            placeholder:"Arrival Year End...",
        },
        {
            placeholder:"Arrival Month Start...",
        }, 
        {
            placeholder:"Arrival Month End...",
        },
        {
            placeholder:"Departure Year Start...",
        },
        {
            placeholder:"Departure Year End...",
        },
        {
            placeholder:"Departure Month Start...",
        }, 
        {
            placeholder:"Departure Month End...",
        },
    ]

    const extra =["Voyage code", "Ship name", "Ship code", "Departure date", "Departure is exact", "Departure place", "Departure place code", "Departure reference", "departure reference loc", "Arrival date", "Arrival is exact", "Arrival place", "Arrival place code", "Arrival reference", "Arrival reference loc"]
    const extra2 =["Ship ID", "Ship name", "Other ship names", "Ship type", "Year in", "Year out", "Last ship", "Ship measurements"]
    const extra3 =["Place name", "Modern name", "Place code", "Latitude", "Latitude degree", "Latitude min", "Longitude", "Longitude degree", "Longitude min", "Geo reference"]

    function generatelink(){
        let link="";
        if (depaPlace!=""){
            if (link!=""){
                link+="&"
            }
            link+="departurePlace="+depaPlace
        }
        if (depaCodef!=""){
            if (link!=""){
                link+="&"
            }
            link+="depFrom="+depaCodef
        }
        if (depaCodet!=""){
            if (link!=""){
                link+="&"
            }
            link+="depTo="+depaCodet
        }
        if (arriPlace!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrivalPlace="+arriPlace
        }
        if (arriCodef!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrFrom="+arriCodef
        }
        if (arriCodet!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrTo="+arriCodet
        }
        if (voyaCode!=""){
            if (link!=""){
                link+="&"
            }
            link+="_id="+voyaCode
        }
        if (shiName!=""){
            if (link!=""){
                link+="&"
            }
            link+="shipName="+shiName
        }
        if (shiCode!=""){
            if (link!=""){
                link+="&"
            }
            link+="ID="+shiCode
        }
        if (arriyearf!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrivalyFrom="+arriyearf
        }
        if (arriyeart!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrivalyTo="+arriyeart
        }
        if (arrimonthf!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrivalmFrom="+arrimonthf
        }
        if (arrimontht!=""){
            if (link!=""){
                link+="&"
            }
            link+="arrivalmTo="+arrimontht
        }
        if (depayearf!=""){
            if (link!=""){
                link+="&"
            }
            link+="depayFrom="+depayearf
        }
        if (depayeart!=""){
            if (link!=""){
                link+="&"
            }
            link+="depayTo="+depayeart
        }
        if (depamonthf!=""){
            if (link!=""){
                link+="&"
            }
            link+="depamFrom="+depamonthf
        }
        if (depamontht!=""){
            if (link!=""){
                link+="&"
            }
            link+="depamTo="+depamontht
        }
        if (link!=""){
            if (arriCodef!="" || arriCodet!=""){
                setSortBy('arrCode');
            }
            if (arriyearf!="" || arriyeart!="" || arrimonthf!="" || arrimontht!=""){
                setSortBy('arrivalDate');
            }
            if (depayearf!="" || depayeart!="" || depamonthf!="" || depamontht!=""){
                setSortBy('departureDate');
            }
            setSearchLink(link);
            setVoyagesData([]);
            setPageNumber(0)
            setIsSearch(true);
        }
    }
    
    const getData = async ({page}) => {
        if (isSearch == true){
            setLoading(true)
            try{
                const results = await fetch(`http://localhost:3000/voyages/search?${searchLink}&skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "POST"})
                const data = await results.json()
                data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    // if the arrival date exists create display string
                    if (dataPoint.arrivalDate) {
                        let [date1, time1] = dataPoint.arrivalDate.split("T")
                        tempData.arrivalDate = date1
                    } else {
                        tempData.arrivalDate = "-"
                    }
                    // if the departure date exists create display string
                    if (dataPoint.departureDate) {
                        let [date2, time2] = dataPoint.departureDate.split("T")
                        tempData.departureDate = date2
                    } else {
                        tempData.departureDate = "-"
                    }
                })
                const joinedData = voyagesData.concat(data.docs)
                setVoyagesData(joinedData)
                setHasMore(data.count/100 > pageNumber)
                setCount(data.count)
                if(data.count/100 > pageNumber){
                    setPageNumber(pageNumber+1)
                }
            } finally {
                setLoading(false);
            }
        }
        else if (isSearch == false) {
            setLoading(true)
            try{
                const results = await fetch(`http://localhost:3000/voyages?skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "GET"})
                const data = await results.json()
                data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    // if the arrival date exists create display string
                    if (dataPoint.arrivalDate) {
                        let [date1, time1] = dataPoint.arrivalDate.split("T")
                        tempData.arrivalDate = date1
                    } else {
                        tempData.arrivalDate = "-"
                    }
                    // if the departure date exists create display string
                    if (dataPoint.departureDate) {
                        let [date2, time2] = dataPoint.departureDate.split("T")
                        tempData.departureDate = date2
                    } else {
                        tempData.departureDate = "-"
                    }
                })
                const joinedData = voyagesData.concat(data.docs)
                setVoyagesData(joinedData)
                setHasMore(data.count/100 > pageNumber)
                setCount(data.count)
                if(data.count/100 > pageNumber){
                    setPageNumber(pageNumber+1)
                }
            } finally {
                setLoading(false);
            }
        }
    }

    const closeadvsearch = () => {
        setAdvsearch(false);
    }

    const closeextrainfo = () => {
        setShow(false);
        setextrastate(false);
        setextrastate2(false);
        setextrastate3(false);
    }

    const extrainfo = async (id) => {
        const results2 = await fetch(`http://localhost:3000/voyages/${id}`)
        const data2 = await results2.json();
        if (data2.arrivalDate) {
            let [date1, time1] = data2.arrivalDate.split("T")
            data2.arrivalDate = date1
        }
        // if the departure date exists create display string
        if (data2.departureDate) {
            let [date2, time2] = data2.departureDate.split("T")
            data2.departureDate = date2
        }
        const a = Object.assign({}, data2);
        setextrastate(true);
        setVoyagesData2(a);
        setShow(true);
    }
    const extrainfo2 = async (id) => {
        const results3 = await fetch(`http://localhost:3000/ships/${id}`)
        const data3 = await results3.json()
        console.log(data3);
        if (data3[0].otherNames) {
            data3[0].otherNames = data3[0].otherNames.join(", ");
        } else {
            data3[0].otherNames = ""
        }
        setextrastate2(true);
        setVoyagesData2(data3[0]);
        setShow(true);
    }
    const extrainfo3 = async (id) => {
        const results4 = await fetch(`http://localhost:3000/places/${id}`)
        const data4 = await results4.json()
        setextrastate3(true);
        setVoyagesData2(data4[0]);
        setShow(true);
    }

    const suggest = async(templink) => {
        //generatesuggestionlink()
        console.log(templink)
        const presuggestions = await fetch(`http://localhost:3000/voyages/suggest?${templink+""}`, {method: "POST"})
        const presuggestions1 = await presuggestions.json()
        console.log(presuggestions1);
        setSuggestions(presuggestions1);
    }

    const onchangesug = (tempquery, tempval)=>{
        suggest(tempquery+tempval+""); 
        setArriPlace(tempval);
    }

    const selectsug=(tempval)=>{
        setArriPlace(tempval);
    }



    const clearsearch = ()=>{
        setDepaPlace("")
        setDepaCodef("")
        setDepaCodet("")
        setArriPlace("")
        setArriCodef("")
        setArriCodet("")
        setVoyaCode("")
        setShiName("")
        setShiCode("")
        setArriyearf("")
        setArriyeart("")
        setArrimonthf("")
        setArrimontht("")
        setDepayearf("")
        setDepayeart("")
        setDepamonthf("")
        setDepamontht("")
        setSearchLink("")
        setVoyagesData([])
        setPageNumber(0)
        setIsSearch(false)
    }
      

    return <div style={{minHeight: "642.6px", paddingLeft: "2%", paddingRight: "2%", paddingTop: "2%"}} className="containerFluid">
    <Navbar bg="light" expand="lg" className="pb-6">
        <Link  href="/">
        <Navbar.Brand>
            {/* <Nav.Link onClick={()=>this.navigate("dhakira")}>
            <Image src={assets.images.dhakiraLogo.default} fluid style={{height:60}} />
            </Nav.Link> */}
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href={api.routes.home}>Introduction</Nav.Link>                  
            <NavDropdown title="Databases" id="basic-nav-dropdown">
            <NavDropdown.Item href={api.routes.tables.voyages}>Voyages</NavDropdown.Item>
            <NavDropdown.Item href={api.routes.tables.ships}>Ships</NavDropdown.Item>
            <NavDropdown.Item href={api.routes.tables.places}>Places</NavDropdown.Item>                     
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        <label onClick={()=>{setAdvsearch(true)}}><input className="react-autosuggest__input" placeholder="Search" type="text" disabled/></label>
    </Navbar>
    {!!(count!=0) &&<div className="alert alert-info">
        Total results: {Number(count||0)}
    </div>}
    {!!(count==0) && <div className="alert alert-warning">
        No matching data available...
    </div>}
    <InfiniteScroll
        key={"temp"}
        pageStart={0}
        hasMore={!loading && hasMore}
        loadMore={() => {if (!loading && hasMore) {getData({page: pageNumber})}}}
        loader={!isSearch && <div className="loader text-center" key={0}>
                    <div className="alert alert-info">Fetching Data...</div>
                </div>}
        >
        {!!(count!=0) && <BootstrapTable 
            //bootstrap4
            keyField="_id"
            data={voyagesData}
            columns={columns}
            striped
            hover
            condensed
            defaultSorted={[{
                dataField: '_id',
                order: 'asc',
            }]} 
        />}
    </InfiniteScroll>
    {/* Extra info */}
    {!!voyagesData2 && <Modal
        show={show} 
        onHide={closeextrainfo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="show-grid">
            <Container>
                <Table striped bordered hover>
                {!!extrastate && <tbody>
		            {Object.keys(voyagesData2).filter((item, index2) => index2<15).map((key, index)=>
                            <tr key={index}>
		                      <td><b>{extra[index]}</b></td>
		                      <td>{voyagesData2[key]}</td>
		                    </tr>
                            )}
		          </tbody>}
                  {!!extrastate2 && <tbody>
		            {Object.keys(voyagesData2).filter((item, index2) => index2>0 && index2 < 9).map((key, index)=><tr key={index}>
		                      <td><b>{extra2[index]}</b></td>
		                      <td>{voyagesData2[key]}</td>
		                    </tr>
		                )}
		          </tbody>}
                  {!!extrastate3 && <tbody>
		            {Object.keys(voyagesData2).filter((item, index2) => index2>1 && index2<12).map((key, index)=><tr key={index}>
		                      <td><b>{extra3[index]}</b></td>
		                      <td>{voyagesData2[key]}</td>
		                    </tr>
		                )}
		          </tbody>}
		        </Table>
            </Container>
        </Modal.Body>
    </Modal>}
    {/* Filter search */}
    {<Modal show={advsearch} onHide={closeadvsearch} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>Advanced Search<br/><small style={{fontSize:14}}>Fill the fields below</small></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="d-flex">
          <Row>
            <Col className="pt-2">
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item.departurePlace.toString()}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.departurePlace}
                        </div>}
                    value={depaPlace}
                    onChange={e => {suggest("departurePlace="+e.target.value); setDepaPlace(e.target.value);}}
                    onSelect={value => {setDepaPlace(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[0].placeholder} type="text"/></label>;
                    }}
                />
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item.arrivalPlace.toString()}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.arrivalPlace}
                        </div>}
                    value={arriPlace}
                    onChange={e => onchangesug("arrivalPlace=",e.target.value)}
                    onSelect={value => selectsug(value)}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[3].placeholder} type="text"/></label>;
                    }}
                />
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item._id}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item._id}
                        </div>}
                    value={voyaCode}
                    // onChange={e => {suggest("_id="+e.target.value); setVoyaCode(e.target.value);}}
                    onChange={e => {setVoyaCode(e.target.value);}}
                    onSelect={value => {setVoyaCode(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[6].placeholder} type="text"/></label>;
                    }}
                />
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => {typeof item.shipName === 'string' ? item.shipName.toString() : ""}}
                    //getItemValue={item => {String(item.shipName)}}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.shipName}
                        </div>}
                    value={shiName}
                    onChange={e => {suggest("shipName="+e.target.value); setShiName(e.target.value);}}
                    onSelect={value => {setShiName(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[7].placeholder} type="text"/></label>;
                    }}
                />
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item.ID.toString()}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.ID}
                        </div>}
                    value={shiCode}
                    onChange={e => {suggest("ID="+e.target.value); setShiCode(e.target.value);}}
                    onSelect={value => {setShiCode(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[9].placeholder} type="text"/></label>;
                    }}
                />
            </Col>
            <Col className="pt-2">
                <label><input value={depaCodef} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[1].placeholder} onChange={e => setDepaCodef(e.target.value)} type="text"/></label>
                <label><input value={depaCodet} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[2].placeholder} onChange={e => setDepaCodet(e.target.value)} type="text"/></label>
                <label><input value={arriCodef} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[4].placeholder} onChange={e => setArriCodef(e.target.value)} type="text"/></label>
                <label><input value={arriCodet} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[5].placeholder} onChange={e => setArriCodet(e.target.value)} type="text"/></label>
                <label><input value={depayearf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[14].placeholder} onChange={e => setDepayearf(e.target.value)} type="text"/></label>
                <label><input value={depayeart} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[15].placeholder} onChange={e => setDepayeart(e.target.value)} type="text"/></label>           
            </Col>
            <Col className="pt-2">
                <label><input value={arriyearf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[10].placeholder} onChange={e => setArriyearf(e.target.value)} type="text"/></label>
                <label><input value={arriyeart} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[11].placeholder} onChange={e => setArriyeart(e.target.value)} type="text"/></label>
                <label><input value={arrimonthf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[12].placeholder} onChange={e => setArrimonthf(e.target.value)} type="text"/></label>
                <label><input value={arrimontht} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[13].placeholder} onChange={e => setArrimontht(e.target.value)} type="text"/></label>
                <label><input value={depamonthf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[16].placeholder} onChange={e => setDepamonthf(e.target.value)} type="text"/></label>
                <label><input value={depamontht} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[17].placeholder} onChange={e => setDepamontht(e.target.value)} type="text"/></label>
            </Col>
          </Row>
        </Container>
        {!!iserror && <span style={{color: "red"}}>{errortxt}</span>}
        </Modal.Body>
        <Modal.Footer>
        <Button className="text-center" variant="secondary" onClick={()=>{
                clearsearch();
            }
          }>Clear</Button>
          <Button className="text-center" variant="primary" onClick={()=>{
                if (arriyearf=="" && arrimonthf!="" || arriyeart=="" && arrimontht!="" || depayearf=="" && depamonthf!="" || depayeart=="" && depamontht!="" ){
                    setIserror(true)
                    setErrortxt("Please enter a specific year!")
                }
                else if (isNaN(arriyearf) || isNaN(arriyeart) || isNaN(arrimonthf) || isNaN(arrimontht) || isNaN(depayearf) || isNaN(depayeart) || isNaN(depamonthf) || isNaN(depamontht)){
                    setIserror(true)
                    setErrortxt("Please enter valid dates!")
                }
                else if (isNaN(depaCodef) || isNaN(depaCodet) || isNaN(arriCodef) || isNaN(arriCodet) || isNaN(shiCode) || isNaN(voyaCode)){
                    setIserror(true)
                    setErrortxt("Please enter valid codes!")
                }
                else if (arrimonthf>12 || arrimonthf!="" && arrimonthf<=0 || arrimontht>12 || arrimontht!="" && arrimontht<=0 || arriyearf>9999 || arriyeart>9999 || depamonthf>12 || depamonthf!="" && depamonthf<=0 || depamontht>12 || depamontht!="" && depamontht<=0 || depayearf>9999 || depayeart>9999){
                    setIserror(true)
                    setErrortxt("Please enter valid dates!")
                }
                else if (depaCodef<0 || arriCodef<0 || depaCodet<0 || arriCodet<0 || shiCode<0 || voyaCode<0){
                    setIserror(true)
                    setErrortxt("Please enter valid codes!")
                }
                else if (arrimonthf!="" && arrimontht!="" && arrimonthf>arrimontht || arriyearf!="" && arriyeart!="" && arriyearf>arriyeart || depamonthf!="" && depamontht!="" && depamonthf>depamontht || depayearf!="" && depayeart!="" && depayearf>depayeart){
                    setIserror(true)
                    setErrortxt("Please enter a valid range of dates!")
                }
                else if (depaCodef!="" && depaCodet!="" && depaCodef>depaCodet || arriCodef!="" && arriCodet!="" && arriCodef>arriCodet){
                    setIserror(true)
                    setErrortxt("Please enter a valid range of codes!")
                }
                else {
                    setIserror(false)
                    setErrortxt("")
                    generatelink();
                    setAdvsearch(false);
                    setHasMore(false);
                }
            }
          }>Search</Button>
        </Modal.Footer>
      </Modal>}
      {!!hasMore && <div className="footer container text-center pt-4">
		<span>↓ Scroll to fetch more data ↓</span>
     </div>}
    </div>
}
