import React, {useState} from "react"
import { DeleteBike } from "../../hooks/deleteBike"
import { EditBike } from "../../hooks/editBike"

import { Modal, Button } from 'react-bootstrap';
export default function  AdminBike(props) {
    const { mutateAsync:editBike } = EditBike();
    const { mutateAsync:deleteBike } = DeleteBike();
    var bikes = null
    var space = null
    const remove = () => {
        deleteBike({'uid':actual.id})
        handleClose()
    }
    const saveBike = () => {
        editBike({'uid':actual.id,'name':document.getElementById("floatingInputValue").value, 'station_id':props.station})
        handleClose()
    }
    const handleClose = () => setShow(false);
    const [actual, setActual] = useState(false);
    const [show, setShow] = useState(false);
    function dblclck(e) {
        setActual({id:e.target.id,name:e.target.title})
        setShow(true);
        
    }
    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id);
        e.dataTransfer.setData("Name", e.target.title);
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
                <Modal.Title>Updating Bike</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="form-floating">
                    <input type="email" className="form-control" id="floatingInputValue" placeholder={actual.name}/>
                    <label htmlFor="floatingInputValue">{actual.name}</label>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={remove}>
                    Remove
                </Button>
                <Button variant="primary" onClick={saveBike}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}