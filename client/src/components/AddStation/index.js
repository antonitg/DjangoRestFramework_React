import React from "react";
// import '../AdminStation/'
import { CreateStationMutation } from "../../hooks/createStation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
export default function AddStation() {
    const { mutateAsync } = CreateStationMutation();
    const add = () => {mutateAsync({})} 
    return (
        <>
            <div className="col-md-4">
                <div className="card p-3 mb-2 pcard" >
                    
                    <div className="">
                        <div className="">
                            <ul className="list-group" style={{backgroundColor:"#332940"}}>
                                <li className="list-group-item text-center" style={{backgroundColor:"#1F1A24", color:"#BB86FC"}}><FontAwesomeIcon onClick={add} style={{ cursor: 'pointer', fontSize: "4em"}} icon={faPlusCircle}/></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </>
    );
}