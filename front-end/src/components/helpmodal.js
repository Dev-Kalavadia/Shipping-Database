import React, { useState } from 'react';
import {Button, Row, Col,Container, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './searchmodal.css'

function HelpModalComp({showHelpModal, setShowHelpModal}) {

    const handleCloseHelpModal = () => setShowHelpModal(false);

    return (
        <div>
            <Modal
                show={showHelpModal}
                size="lg"
                onHide={handleCloseHelpModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>How to Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The Advanced Search popup window gives options refine criteria to search the database.
                    <br/><br/>
                    The search by Date allows users to enter a date range for arrivals and departures. Enter a start and end year to identify all ships within those years. The search can be further refined by entering month numbers. This will show all ship movements between the start month of the start year and the end month of the end year. For example, if a year range of Start: 1595 – End: 1620 and a month range of Start: 5 – End: 7 is entered a list of all ship movements between May 1595 and July 1620 will be returned. Note that a start and end must be entered. If the search is for a single year, the start and end date entries should be the same.
                    <br/><br/>
                    Searches by Place or Ship Name will return all data associated with a place or ship. Note that ship name may return data on multiple ships with the same name. Entries in the place and ship name search fields are autocomplete. Suggestions for names will appear in a dropdown list as text is entered. The database is searchable by old and modern place names and by place names that appear in archival records associated with ships. Ship names can be searched by name or alternative names.
                    <br/><br/>
                    Searching by ship type returns records of the movements of various types of ships involved in Dutch Asiatic trade. This allows users to explore the ranges of different kinds of ships to understand the logistical and infrastructural systems for Dutch trade and expansion.
                    <br/><br/>
                    Search criteria can be used in combination or individually.
                </Modal.Body>
            </Modal>
        </div>
    );
}
  
export default HelpModalComp