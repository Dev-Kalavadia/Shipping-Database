import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'

function SearchModalComp({showSearchModal, setShowSearchModal, setSearchLink, setPage, setSortBy, setIsSearch}) {

    const handleCloseSearchModal = () => setShowSearchModal(false);

    const [Name, setName] = useState("")
    const [modernName, setModernName] = useState("")
    const [codef, setcodef] = useState("")
    const [codet, setcodet] = useState("")

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

    const generateLink = ()=>{
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
            setIsSearch(true);
            if (codef!="" || codet!=""){
                setSortBy('code');
            }
            setPage(0);
            setSearchLink(link);
        }
    }    

    const clearsearch = ()=>{
        setName("")
        setModernName("")
        setcodef("")
        setcodet("")
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
                                <Form.Control value={Name} placeholder={filters[0].placeholder} onChange={e => setName(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={modernName} placeholder={filters[1].placeholder} onChange={e => setModernName(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                        </Col>
                        <Col className="pt-2">
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={codef} placeholder={filters[2].placeholder} onChange={e => setcodef(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={codet} placeholder={filters[3].placeholder} onChange={e => setcodet(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
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