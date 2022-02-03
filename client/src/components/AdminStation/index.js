import React from "react"
import AdminBike from "../AdminBike"
import "../Station/Station.css"
export default function AdminStation(props) {
    function dragOver(e){
        // console.log(e);
        // console.log(e.dataTransfer
        // .getData('text'));
        // e.nativeEvent.target.parentNode.appendChild(e.nativeEvent.srcElement)
        e.preventDefault()

    }
    function onDrop(e) {
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target;
        dropzone.appendChild(draggableElement);
        e.dataTransfer.clearData();
        console.log("dropped");
    }
    return (
        <>
            <div className="col-md-4">
                <div className="card p-3 mb-2 pcard" onDrop={onDrop}>
                    <div onDrop={onDrop} style={{borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                        <div  className="d-flex flex-row align-items-center pb-5">
                        </div>
                    </div>
                    <div className="">
                        <h3 className="heading" style={{marginTop:"8px"}}>{props.station.name}<br/>In {props.station.location}</h3>
                        <div className="">
                            <ul className="list-group"  onDragOver={dragOver} onDrop={onDrop}>
                                <AdminBike onDrop={onDrop} bikes={props.station.bikes}></AdminBike>
                                <li className="list-group-item">Add bike</li>

                            </ul>
                        </div>
                    </div>
                    <div style={{height:"300px", width:"100%"}}>
                        drop here
                    </div>
                </div>
            </div>
        </>
    )
}