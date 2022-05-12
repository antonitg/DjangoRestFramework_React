import React, {useState} from "react"
import { CloseIncidenceMutation } from "../../hooks/closeIncidence"

import { Modal, Button } from 'react-bootstrap';
export default function  CloseIncidence(props) {
    const { mutateAsync:close } = CloseIncidenceMutation();
    console.log(props);
    const closeForm = () => {
        close({'journey':props.id, 'response':document.getElementById("floatingInputValue").value})
        handleClose()
    }
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true)
    const [show, setShow] = useState(false);
    return (
        <>
            <button className="btn btn-danger" onClick={handleOpen}>Close Incidence</button> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Updating Bike</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="form-floating">
                    <textarea required type="text" className="form-control" id="floatingInputValue" placeholder="You'r incidence"/>
                    <label htmlFor="floatingInputValue">Response</label>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={closeForm}>
                    Close Incidence
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}