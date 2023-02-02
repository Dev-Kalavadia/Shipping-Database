import React, { useState } from 'react';
import {Container, Modal, Table} from 'react-bootstrap';
import "./extramodal.css"

function extraModal({showExtraModal, setShowExtraModal, extraData, setExtraData, extraState}) {

    const handleCloseExtraModal = () => setShowExtraModal(false);

    const extraVoyages =["Voyage code", "Ship name", "Ship code", "Departure date", "Departure is exact", "Departure place", "Departure place code", "Departure reference", "departure reference loc", "Arrival date", "Arrival is exact", "Arrival place", "Arrival place code", "Arrival reference", "Arrival reference loc"]
    const extraShips =["Ship ID", "Ship name", "Other ship names", "Ship type", "Year in", "Year out", "Last ship", "Ship measurements"]
    const extraPlaces =["Place name", "Modern name", "Place code", "Latitude", "Latitude degree", "Latitude min", "Longitude", "Longitude degree", "Longitude min", "Geo reference"]

    return (
        <div>
            <Modal
                show={showExtraModal}
                size="lg"
                onHide={handleCloseExtraModal}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Container className="d-flex">
                        <Table striped bordered hover>
                            <tbody>
                                {extraState==0 && Object.keys(extraData).filter((item, index2) => index2<15).map((key, index)=>
                                    <tr key={index}>
                                    <td class="cstm-header-link2"><b>{extraVoyages[index]}</b></td>
                                    <td>{extraData[key]}</td>
                                    </tr>
                                )}
                                {extraState==1 && Object.keys(extraData).filter((item, index2) => index2>0 && index2 < 9).map((key, index)=><tr key={index}>
		                            <td class="cstm-header-link2"><b>{extraShips[index]}</b></td>
		                            <td>{extraData[key]}</td>
		                            </tr>
		                        )}
                                {extraState==2 && Object.keys(extraData).filter((item, index2) => index2>1 && index2<12).map((key, index)=><tr key={index}>
                                    <td class="cstm-header-link2"><b>{extraPlaces[index]}</b></td>
                                    <td>{extraData[key]}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Container>
                </Modal.Body>
            </Modal>
        </div> 
    );
}
  
export default extraModal