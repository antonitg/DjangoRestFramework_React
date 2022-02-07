import React, {useState} from "react"
import { Modal, Button } from 'react-bootstrap';
export default function  AdminBike(props) {
    var bikes = null
    var space = null
    var editing = false
    const handleClose = () => setShow(false);
    const [actual, setActual] = useState(false);
    const [show, setShow] = useState(false);
    function dblclck(e) {
        setActual(e.target.title)
        setShow(true);
        
    }
    console.log(actual)
    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id);
        e.dataTransfer.setData("Name", e.target.title);
      e
        .currentTarget
        .style
        .backgroundColor = '#BB86FC';
    }
    if (props.bikes) {
        bikes = props.bikes.map((bike) =>
            <li title={bike.name} onDoubleClick={dblclck} style={{backgroundColor:"#BB86FC", border:"solid 1px #332940"}} key={bike.id} id={bike.id} draggable="true" className="list-group-item" onDragStart={dragStart}>{bike.name}</li>
        );
        if (props.space-props.bikes.length > 0) { 
            space = Array(props.space-props.bikes.length).fill(undefined).map((n) => 
                <li style={{backgroundColor:"#cf6679", border:"solid 1px #332940"}} key={n} id={n}  className="list-group-item">Empty Space</li>
            )
        }
    }
    return (
        <>
            {bikes}
            {space}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="form-floating">
                    <input type="email" className="form-control" id="floatingInputValue" placeholder={actual}/>
                    <label htmlFor="floatingInputValue">{actual}</label>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}