import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'

function SearchModalComp({show, setShow}) {

    const handleClose = () => setShow(false);

    const [number, setnumber] = useState("")
    const [Name, setName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [yearInf, setyearInf] = useState("")
    const [yearInt, setyearInt] = useState("")
    const [yearOutf, setyearOutf] = useState("")
    const [yearOutt, setyearOutt] = useState("")
    const [lastf, setlastf] = useState("")
    const [lastt, setlastt] = useState("")

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

    const clearsearch = ()=>{
        setnumber("")
        setName("")
        setOtherName("")
        setyearInf("")
        setyearInt("")
        setyearOutf("")
        setyearOutt("")
        setlastf("")
        setlastt("")
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
                                <Form.Control value={number} placeholder={filters[0].placeholder} onChange={e => setnumber(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={Name} placeholder={filters[1].placeholder} onChange={e => setName(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>    
                                <Form.Control value={otherName} placeholder={filters[2].placeholder} onChange={e => setOtherName(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={yearInf} placeholder={filters[3].placeholder} onChange={e => setyearInf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={yearInt} placeholder={filters[4].placeholder} onChange={e => setyearInt(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                        </Col>
                        <Col className="pt-2">
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={yearOutf} placeholder={filters[5].placeholder} onChange={e => setyearOutf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Form.Control value={yearOutt} placeholder={filters[6].placeholder} onChange={e => setyearOutt(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>    
                                <Form.Control value={lastf} placeholder={filters[7].placeholder} onChange={e => setlastf(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>   
                                <Form.Control value={lastt} placeholder={filters[8].placeholder} onChange={e => setlastt(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
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