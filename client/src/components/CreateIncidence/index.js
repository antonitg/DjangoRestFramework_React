import React, {useState} from "react"
import { CreateIncidenceMutation } from "../../hooks/createIncidence"

import { Modal, Button } from 'react-bootstrap';
export default function  CreateIncidence(props) {
    const { mutateAsync:create } = CreateIncidenceMutation();
    const closeForm = () => {
        create({'journey':props.id, 'info':document.getElementById("floatingInputValue").value})
        handleClose()
    }
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true)
    const [show, setShow] = useState(false);
    return (
        <>
            <button className="btn" style={{backgroundColor: "#bb86fc"}} onClick={handleOpen}>Create Incidence</button> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Incidence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="form-floating">
                    <textarea required type="text" className="form-control" id="floatingInputValue" placeholder="You'r incidence"/>
                    <label htmlFor="floatingInputValue">Problem</label>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="" style={{backgroundColor: "#bb86fc"}} onClick={closeForm}>

                    Create Incidence
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}