import React from "react"
import AdminBike from "../AdminBike"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { EditBike } from "../../hooks/editBike"
import { CreateBike } from "../../hooks/createBike"

import "../Station/Station.css"
export default function AdminStation(props) {
    const { mutateAsync:editBike } = EditBike();
    const { mutateAsync:createBike } = CreateBike();
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
                <div className="card p-3 mb-2 pcard">
                    <div style={{borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                        <div  className="d-flex flex-row align-items-center pb-5">
                        </div>
                    </div>
                    <div className="">
                        <h3 className="heading" style={{marginTop:"8px"}}>{props.station.name}<br/>In {props.station.location}</h3>
                        <div className="">
                            <ul className="list-group" id={props.station.id}  onDragOver={dragOver} onDrop={onDrop} style={{backgroundColor:"#332940"}}>
                                <AdminBike  onDrop={onDrop} bikes={props.station.bikes} space={props.station.space}></AdminBike>
                                <li className="list-group-item text-center" style={{backgroundColor:"#1F1A24", color:"#BB86FC"}}><FontAwesomeIcon onClick={addBike} style={{fontSize: "2rem"}} icon={faPlusCircle}/></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}