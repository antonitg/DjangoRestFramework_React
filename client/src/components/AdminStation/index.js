import React, {useState} from "react"
import AdminBike from "../AdminBike"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { EditStation } from "../../hooks/editStation"
import { EditBike } from "../../hooks/editBike"
import { CreateBike } from "../../hooks/createBike"
import { DeleteStation } from "../../hooks/deleteStation"
import { Modal, Button } from 'react-bootstrap';

import "../Station/Station.css"
export default function AdminStation(props) {
    const { mutateAsync:editStation } = EditStation();
    const { mutateAsync:deleteStation } = DeleteStation();
    const { mutateAsync:editBike } = EditBike();
    const { mutateAsync:createBike } = CreateBike();
    const handleClose = () => setShow(false);
    // const [actual, setActual] = useState(false);
    const [show, setShow] = useState(false);
    const remove = () => {
        deleteStation({'id':props.station.id})
        handleClose()
    }
    const save = () => {
        editStation({'id':props.station.id,'name':document.getElementById("inpName").value || props.station.name, 'space':document.getElementById("inpSpace").value || props.station.space, 'photo':document.getElementById("inpPhoto").value || props.station.photo})
        handleClose()
    }
    function dblclck(){
        setShow(true);
    }
    function dragOver(e){
        e.preventDefault() // Dont override the dropzone event with this one.
    }
    function onDrop(e) {
        const dropzone = e.target.parentNode; // Dropzone (ul)
        editBike({'station_id':dropzone.id,'name':e.dataTransfer.getData('name'), 'uid':e.dataTransfer.getData('text')})
        e.dataTransfer.clearData(); // Clean the id of the data transfer so its empty for the next draggable item
    }
    var addBike = () => {createBike({'station_id':props.station.id})}
    return (
        <>
            <div className="col-md-4">
                <div className="card p-3 mb-2 pcard" >
                    <div onDoubleClick={dblclck} style={{cursor:'pointer',borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                        <div  className="d-flex flex-row align-items-center pb-5">
                        </div>
                    </div>
                    <div className="">
                        <h3 className="heading" style={{marginTop:"8px"}}>{props.station.name}<br/>In {props.station.location}</h3>
                        <div className="">
                            <ul className="list-group" id={props.station.id}  onDragOver={dragOver} onDrop={onDrop} style={{backgroundColor:"#332940"}}>
                                <AdminBike  onDrop={onDrop} bikes={props.station.bikes} station={props.station.id} space={props.station.space}></AdminBike>
                                <li className="list-group-item text-center" style={{backgroundColor:"#1F1A24", color:"#BB86FC"}}><FontAwesomeIcon onClick={addBike} style={{fontSize: "2rem"}} icon={faPlusCircle}/></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Editing Stations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="">
                    <div className="mb-3 form-floating">
                        <input type="text" className="form-control" id="inpName" placeholder={props.station.name}/>
                        <label htmlFor="inpName">{props.station.name}</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <input type="text" className="form-control" id="inpPhoto" placeholder={props.station.photo}/>
                        <label htmlFor="inpPhoto">{props.station.photo}</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <input type="text" className="form-control" id="inpLocation" placeholder={props.station.location}/>
                        <label htmlFor="inpLocation">{props.station.location}</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <input type="number" className="form-control" id="inpSpace" placeholder={props.station.location}/>
                        <label htmlFor="inpSpace">{props.station.space + " (min "+props.station.bikes.length+")"} </label>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={remove}>
                    Remove
                </Button>
                <Button variant="primary" onClick={save}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}