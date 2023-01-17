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
    const [shipsData, setshipsData] = useState([])
    const [shipsData2, setshipsData2] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [sortType, setSortType] = useState("asc")
    const [sortBy, setSortBy] = useState("_id")
    const [hasMore, setHasMore] = useState(false)
    const [show, setShow] = useState(false)
    const [advsearch, setAdvsearch] = useState(false)
    const [searchLink, setSearchLink] = useState("")
    const [number, setnumber] = useState("")
    const [Name, setName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [yearInf, setyearInf] = useState("")
    const [yearInt, setyearInt] = useState("")
    const [yearOutf, setyearOutf] = useState("")
    const [yearOutt, setyearOutt] = useState("")
    const [lastf, setlastf] = useState("")
    const [lastt, setlastt] = useState("")
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
            dataField: 'ID',
            text: 'Ship ID',
            sort: false,
            formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('ID');
                    if (sortType==='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
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
            dataField: 'name',
            text: 'Ship Name',
            sort: false,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('Name');
                    if (sortType==='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'otherNames',
            text: 'Ship Other Name',
            sort: false,
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('otherNames');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'type',
            text: 'Ship type',
            sort: false,
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('type');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'yearIn',
            text: 'Year In',
            sort: false,
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('yearIn');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'yearOut',
            text: 'Year Out',
            sort: false,
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('yearOut');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'last',
            text: 'Last Ship',
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            sort: false,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('last');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
        {
            dataField: 'measurements',
            text: 'Ship Measurements',
            sort: false,
            //formatter: cellFormatter,
            headerFormatter: headerFormatter,
            headerEvents: {
				onClick: (e, column, columnIndex) => {
                    setSortBy('measurements');
                    if (sortType=='asc'){
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
					    setSortType('desc');
                    }
                    else {
                        setPageNumber(1);
                        setshipsData([]);
                        setshipsData2([]);
                        setSortType('asc');
                    }
				}
			}
        },
    ]
    const filters=[
        {
            placeholder:"Ship ID...",
        },
        {
            placeholder:"Ship Name...",
        },
        {
            placeholder:"Other Ship Name...",
        },
        {
            placeholder:"Year In from...",
        },
        {
            placeholder:"Year In to...",
        },
        {
            placeholder:"Year Out from...",
        },
        {
            placeholder:"Year Out to...",
        },
        {
            placeholder:"Last Ship from...",
        },
        {
            placeholder:"Last Ship to...",
        }
    ]

    const extra2 =["Ship ID", "Ship name", "Other ship names", "Ship type", "Year in", "Year out", "Last ship", "Ship measurements"]

    function generatelink(){
        let link="";
        if (number!=""){
            if (link!=""){
                link+="&"
            }
            link+="ID="+number
        }
        if (Name!=""){
            if (link!=""){
                link+="&"
            }
            link+="name="+Name
        }
        if (otherName!=""){
            if (link!=""){
                link+="&"
            }
            link+="othername="+otherName
        }
        if (yearInf!=""){
            if (link!=""){
                link+="&"
            }
            link+="yearInf="+yearInf
        }
        if (yearInt!=""){
            if (link!=""){
                link+="&"
            }
            link+="yearInt="+yearInt
        }
        if (yearOutf!=""){
            if (link!=""){
                link+="&"
            }
            link+="yearOutf="+yearOutf
        }
        if (yearOutt!=""){
            if (link!=""){
                link+="&"
            }
            link+="yearOutt="+yearOutt
        }
        if (lastf!=""){
            if (link!=""){
                link+="&"
            }
            link+="lastf="+lastf
        }
        if (lastt!=""){
            if (link!=""){
                link+="&"
            }
            link+="lastt="+lastt
        }

        if (link!=""){
            setSearchLink(link);
            setshipsData([]);
            setPageNumber(0)
            setIsSearch(true);
        }
    }

    const getData = async ({page}) => {
        if (isSearch == true){
            setLoading(true)
        try{
            const results = await fetch(`http://localhost:3000/ships/search?${searchLink}&skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "POST"})
            const data = await results.json()
            data.docs.forEach((dataPoint, idx) => {
                let tempData = dataPoint;
                // if the arrival date exists create display string
                if (dataPoint.otherNames) {
                    tempData.otherNames = dataPoint.otherNames.join(", ");
                } else {
                    tempData.otherNames = ""
                }
            })
            const joinedData = shipsData.concat(data.docs)
            setshipsData(joinedData)
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
                const results = await fetch(`http://localhost:3000/ships?skip=${(page)*100}&sortBy=${sortBy}&sortType=${sortType}`, {method: "GET"})
                const data = await results.json()
                data.docs.forEach((dataPoint, idx) => {
                    let tempData = dataPoint;
                    // if the arrival date exists create display string
                    if (dataPoint.otherNames) {
                        tempData.otherNames = dataPoint.otherNames.join(", ");
                    } else {
                        tempData.otherNames = ""
                    }
                })
                const joinedData = shipsData.concat(data.docs)
                setshipsData(joinedData)
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

    const extrainfo2 = async (id) =>{
        const results3 = await fetch(`http://localhost:3000/ships/${id}`)
        const data3 = await results3.json()
        if (data3[0].otherNames) {
            data3[0].otherNames = data3[0].otherNames.join(", ");
        } else {
            data3[0].otherNames = ""
        }
        setshipsData2(data3[0]);
        setShow(true);
    }

    const suggest = async(templink) => {
        //generatesuggestionlink()
        console.log(templink);
        const presuggestions = await fetch(`http://localhost:3000/ships/suggest?${templink+""}`, {method: "POST"});
        const presuggestions1 = await presuggestions.json();
        console.log(presuggestions1);
        setSuggestions(presuggestions1);
    }

    const clearsearch = ()=>{
        setnumber("")
        setName("")
        setyearInf("")
        setyearInt("")
        setyearOutf("")
        setyearOutt("")
        setlastf("")
        setlastt("")
        setSearchLink("")
        setshipsData([])
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
            data={shipsData}
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
    {!!shipsData2 && <Modal
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
		            {Object.keys(shipsData2).filter((item, index2) => index2>0 && index2 < 9).map((key, index)=><tr key={index}>
		                      <td><b>{extra2[index]}</b></td>
		                      <td>{shipsData2[key]}</td>
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
                <label><input value={number} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[0].placeholder} onChange={e => setnumber(e.target.value)} type="text"/></label>
                <Autocomplete
                    items={suggestions}
                    getItemValue={item => item.name}
                    renderItem={(item, highlighted) =>
                        <div style={{backgroundColor: highlighted ? '#eee' : 'transparent', fontFamily: 'Helvetica, sans-serif', fontWeight: '300', fontSize: '16px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', zIndex: '2'}}>
                            {item.name}
                        </div>}
                    value={Name}
                    onChange={e => {suggest("name="+e.target.value); setName(e.target.value);}}
                    onSelect={value => {setName(value)}}
                    renderInput={props => {
                        return <label><input {...props} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[1].placeholder} type="text"/></label>;
                    }}
                />
                <label><input value={otherName} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[2].placeholder} onChange={e => setOtherName(e.target.value)} type="text"/></label>
                <label><input value={yearInf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[3].placeholder} onChange={e => setyearInf(e.target.value)} type="text"/></label>
                <label><input value={yearInt} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[4].placeholder} onChange={e => setyearInt(e.target.value)} type="text"/></label>
            </Col>
            <Col className="pt-2">
                <label><input value={yearOutf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[5].placeholder} onChange={e => setyearOutf(e.target.value)} type="text"/></label>
                <label><input value={yearOutt} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[6].placeholder} onChange={e => setyearOutt(e.target.value)} type="text"/></label>
                <label><input value={lastf} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[7].placeholder} onChange={e => setlastf(e.target.value)} type="text"/></label>
                <label><input value={lastt} style={{outline: "none"}} className="react-autosuggest__input" placeholder={filters[8].placeholder} onChange={e => setlastt(e.target.value)} type="text"/></label>
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
                if (isNaN(number) || isNaN(lastf) || isNaN(lastt)) {
                    setIserror(true)
                    setErrortxt("Please enter a valid number!")
                }
                else if (isNaN(yearInf) || isNaN(yearInt) || isNaN(yearOutf) || isNaN(yearOutt)) {
                    setIserror(true)
                    setErrortxt("Please enter valid dates!")
                }
                else if (yearInf<0 || yearInt<0 || yearOutf<0 || yearOutt<0){
                    setIserror(true)
                    setErrortxt("Please enter valid dates!")
                }
                else if (number<0 || lastf<0 || lastt<0){
                    setIserror(true)
                    setErrortxt("Please enter a valid number!")
                }
                else if (yearInf!="" && yearInt!="" && yearInf>yearInt || yearOutf!="" && yearOutt!="" && yearOutf>yearOutt){
                    setIserror(true)
                    setErrortxt("Please enter a valid range of dates!")
                }
                else if(lastf!="" && lastt!="" && lastf>lastt){
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