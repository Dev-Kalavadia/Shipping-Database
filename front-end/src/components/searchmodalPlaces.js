import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'

function SearchModalComp({show, setShow}) {

    const handleClose = () => setShow(false);

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

    const clearsearch = ()=>{
        setName("")
        setModernName("")
        setcodef("")
        setcodet("")
    }

    return (
        <div>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
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
                <Button className="cstm-btn-search-modal" onClick={handleClose}>Search</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
  
export default SearchModalComp