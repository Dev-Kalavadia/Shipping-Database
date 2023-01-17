import React, {useEffect} from "react";
import {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import BootstrapTable from 'react-bootstrap-table-next';
import {Table,Navbar,Nav,NavDropdown,Image,Button, Row, Col,Container, Modal} from 'react-bootstrap';
import {api,assets} from "src";
import Link from 'next/link';
import Autocomplete from 'react-autocomplete';

export default function DataTable() {

    const [count, setCount] = useState(0);
    const [placesData, setplacesData] = useState([])
    const [placesData2, setplacesData2] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("no")
    const [hasMore, setHasMore] = useState(false)
    const [show, setShow] = useState(false)
    const [advsearch, setAdvsearch] = useState(false)
    const [searchLink, setSearchLink] = useState("")
    const [Name, setName] = useState("")
    const [modernName, setModernName] = useState("")
    const [codef, setcodef] = useState("")
    const [codet, setcodet] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [iserror, setIserror] = useState(false)
    const [errortxt, setErrortxt] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [suggestionslink, setSuggestionsLink] = useState("")

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
          <a href="#">{ column.text }</a>
        );
    }
    const columns = [
        {
            dataField: 'Name',
            text: 'Place Name',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('Name');
                    if (sortType==='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'modernName',
            text: 'Modern Name',
            sort: false,
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('modernName');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'code',
            text: 'Place Code',
            sort: false,
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('code');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'lat',
            text: 'Latitude',
            sort: false,
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('lat');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'degr1',
            text: 'Latitude Degree',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('degr1');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'Min1',
            text: 'Latitude Min',
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('Min1');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'long',
            text: 'Longitude',
            sort: false,
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('long');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'degr2',
            text: 'Longitude Degree',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('degr2');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'Min2',
            text: 'Longitude Min',
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('Min2');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'geoRef',
            text: 'Geo Reference',
            // formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('geoRef');
                    if (sortType=='asc'){
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(0);
                        setplacesData([]);
                        setplacesData2([]);
                        setSortType('asc');
                    }
				}
			}
        }
    ]
    const filters=[
        {
            placeholder:"Place Name...",
        },
        {
            placeholder:"Modern Place Name...",
        },
        {
            placeholder:"Place Code From...",
        },
        {
            placeholder:"Place Code To...",
        },
    ]

    function generatelink(){
        let link="";
        if (Name!=""){
            if (link!=""){
                link+="&"
            }
            link+="Name="+Name
        }
        if (modernName!=""){
            if (link!=""){
                link+="&"
            }
            link+="modernName="+modernName
        }
        if (codef!=""){
            if (link!=""){
                link+="&"
            }
            link+="codef="+codef
        }
        if (codet!=""){
            if (link!=""){
                link+="&"
            }
            link+="codet="+codet
        }

        if (link!=""){
            if (codef!="" || codet!=""){
                setSortBy('code');
            }
            setSearchLink(link);
            setplacesData([]);
            setPageNumber(0)
            setIsSearch(true);
        }
    }

    const getData = async ({page}) => {
        if (isSearch == true){
            setLoading(true)
            try{
                const results = await fetch(`http://localhost:3000/places/search?${searchLink}&skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "POST"})
                const data = await results.json()
                const joinedData = placesData.concat(data.docs)
                setplacesData(joinedData)
                setHasMore(data.count/100 > pageNumber)
                setCount(data.count)
                if(data.count/100 > pageNumber){
                    setPageNumber(pageNumber+1)
                }
            } finally {
                setLoading(false);
            }
        } 
        else if(isSearch == false) {
            setLoading(true)
            try{
                const results = await fetch(`http://localhost:3000/places?skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "GET"})
                const data = await results.json()
                const joinedData = placesData.concat(data.docs)
                setplacesData(joinedData)
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
    }

    const suggest = async(templink) => {
        //generatesuggestionlink()
        console.log(templink)
        const presuggestions = await fetch(`http://localhost:3000/places/suggest?${templink+""}`, {method: "POST"})
        const presuggestions1 = await presuggestions.json()
        console.log("now");
        console.log(presuggestions1);
        setSuggestions(presuggestions1);
    }

    const clearsearch = ()=>{
        setName("")
        setcodef("")
        setcodet("")
        setSearchLink("")
        setplacesData([])
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
            keyField="no"
            data={placesData}
            columns={columns}
            striped
            hover
            condensed
            defaultSorted={[{
                dataField: 'no',
                order: 'asc',
            }]} 
        />}
    </InfiniteScroll>
    {/* Extra info */}
    {!!placesData2 && <Modal
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
		          <tbody>
		            {Object.keys(placesData2).filter((item, index2) => index2 < 15).map((key, index)=><tr key={index}>
		                      <td><b>{extra[index]}</b></td>
		                      <td>{placesData2[key]}</td>
		                    </tr>
		                )}
		          </tbody>
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
                    getItemValue={item => item.Name.toString()}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.Name}
                        </div>}
                    value={Name}
                    onChange={e => {suggest("Name="+e.target.value); setName(e.target.value);}}
                    onSelect={value => {setName(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[0].placeholder} type="text"/></label>
                    }}
                />
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item.modernName.toString()}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.modernName}
                        </div>}
                    value={modernName}
                    onChange={e => {suggest("modernName="+e.target.value); setModernName(e.target.value);}}
                    onSelect={value => {setModernName(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[1].placeholder} type="text"/></label>
                    }}
                />
            </Col>
            <Col className="pt-2">
                <label><input value={codef} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[2].placeholder} onChange={e => setcodef(e.target.value)} type="text"/></label>
                <label><input value={codet} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[3].placeholder} onChange={e => setcodet(e.target.value)} type="text"/></label>
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
                if (isNaN(codef) || isNaN(codet)) {
                    setIserror(true)
                    setErrortxt("Please enter valid codes!")
                }
                else if (codef<0 || codet<0) {
                    setIserror(true)
                    setErrortxt("Please enter valid codes!")
                }
                else if ( codef!="" && codet!="" && codef>codet) {
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
