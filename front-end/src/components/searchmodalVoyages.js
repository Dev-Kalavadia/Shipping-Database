import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'

function SearchModalComp({showSearchModal, setShowSearchModal, setSearchLink, setPage, setSortBy, setIsSearch}) {

    const handleCloseSearchModal = () => setShowSearchModal(false);

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
    const [depayearf, setDepayearf] = useState("")
    const [depayeart, setDepayeart] = useState("")
    const [depamonthf, setDepamonthf] = useState("")
    const [depamontht, setDepamontht] = useState("")

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

    const generateLink = ()=>{
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
            setIsSearch(true);
            if (arriCodef!="" || arriCodet!=""){
                setSortBy('arrCode');
            }
            if (arriyearf!="" || arriyeart!="" || arrimonthf!="" || arrimontht!=""){
                setSortBy('arrivalDate');
            }
            if (depayearf!="" || depayeart!="" || depamonthf!="" || depamontht!=""){
                setSortBy('departureDate');
            }
            setPage(0);
            setSearchLink(link);
        }
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
        setIsSearch(false)
        setSearchLink("")
        setPage(0)
    }

    return (
        <div>
            <Modal
                show={showSearchModal}
                size="lg"
                onHide={handleCloseSearchModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Advanced Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="d-flex">
                        <Col className="pt-2">
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={depaPlace} placeholder={filters[0].placeholder} onChange={e => setDepaPlace(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={arriPlace} placeholder={filters[3].placeholder} onChange={e => setArriPlace(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>    
                                <Form.Control value={voyaCode} placeholder={filters[6].placeholder} onChange={e => setVoyaCode(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={shiName} placeholder={filters[7].placeholder} onChange={e => setShiName(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={shiCode} placeholder={filters[9].placeholder} onChange={e => setShiCode(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                        </Col>
                        <Col className="pt-2">
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={depaCodef} placeholder={filters[1].placeholder} onChange={e => setDepaCodef(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={depaCodet} placeholder={filters[2].placeholder} onChange={e => setDepaCodet(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>    
                                <Form.Control value={arriCodef} placeholder={filters[4].placeholder} onChange={e => setArriCodef(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={arriCodet} placeholder={filters[5].placeholder} onChange={e => setArriCodet(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={depayearf} placeholder={filters[14].placeholder} onChange={e => setDepayearf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={depayeart} placeholder={filters[15].placeholder} onChange={e => setDepayeart(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>          
                        </Col>
                        <Col className="pt-2">
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={arriyearf} placeholder={filters[10].placeholder} onChange={e => setArriyearf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={arriyeart} placeholder={filters[11].placeholder} onChange={e => setArriyeart(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>    
                                <Form.Control value={arrimonthf} placeholder={filters[12].placeholder} onChange={e => setArrimonthf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={arrimontht} placeholder={filters[13].placeholder} onChange={e => setArrimontht(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={depamonthf} placeholder={filters[16].placeholder} onChange={e => setDepamonthf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={depamontht} placeholder={filters[17].placeholder} onChange={e => setDepamontht(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>   
                        </Col>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={clearsearch}>Clear</Button>
                <Button className="cstm-btn-search-modal" onClick={()=>{
                    handleCloseSearchModal();
                    generateLink();
                    }}>Search
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
  
export default SearchModalComp