import axios from 'axios';
import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'
import Autocomplete from 'react-autocomplete';

function SearchModalComp({showSearchModal, setShowSearchModal, setSearchLink, setPage, setSortBy, setIsSearch}) {

    const handleCloseSearchModal = () => setShowSearchModal(false);

    const [number, setnumber] = useState("")
    const [Name, setName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [yearInf, setyearInf] = useState("")
    const [yearInt, setyearInt] = useState("")
    const [yearOutf, setyearOutf] = useState("")
    const [yearOutt, setyearOutt] = useState("")
    const [lastf, setlastf] = useState("")
    const [lastt, setlastt] = useState("")
    const [suggestionsName, setSuggestionsName] = useState([])

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

    const generateLink = ()=>{
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
            setIsSearch(true);
            setPage(0)
            setSearchLink(link);
        }
    } 

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
        setIsSearch(false)
        setSearchLink("")
        setPage(0)
    }

    const suggest = async(templink, area) => {
        axios
            .post(`${process.env.REACT_APP_URI}/ships/suggest?${templink+""}`, {
                params: {
                },
            })
            .then((response)=>{
                if(area=="Name"){
                    setSuggestionsName(response.data);
                }
            })
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
                                <Form.Control value={number} placeholder={filters[0].placeholder} onChange={e => setnumber(e.target.value)}  className="me-2 mt-2 cstm-modal-input" size="lw" />
                            </Form>
                            <Form className="d-flex" style={{ minWidth: "60%" }}>
                                <Autocomplete
                                    items={suggestionsName}
                                    getItemValue={item => item.name}
                                    renderItem={(item, highlighted) =>
                                        <Form.Control className="pt-1 pb-1 cstm-modal-sugg" style={{backgroundColor: highlighted ? '#eee' : 'transparent', zIndex: '2'}}
                                            value={item.name} onChange={e=>{}}>
                                        </Form.Control>
                                    }
                                    value={Name}
                                    onChange={e => { setName(e.target.value); setSuggestionsName([]); suggest("name="+e.target.value, "Name");}}
                                    onSelect={value => {setName(value)}}
                                    wrapperProps={{className: "me-2", style : {width:"100%"} }}
                                    renderInput={props => {
                                        return <Form.Control {...props} placeholder={filters[1].placeholder}  className="mt-2 cstm-modal-input"/>;
                                    }}
                                />
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