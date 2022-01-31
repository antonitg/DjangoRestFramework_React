import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDoubleUp, faBicycle, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import './TransactionsListElement.css'
import React from "react";
export default function TransactionsListElement(props) {
   var fclass = (props.trans.amount > 0) ? 'tup' : 'tdown'
return (
    <>
    <tr>
        <th className={fclass} scope="row">{(props.trans.amount > 0) ? <FontAwesomeIcon icon={faAngleDoubleUp}/> : <FontAwesomeIcon icon={faAngleDoubleDown}/>}</th>
        <td>{props.trans.created_at.substring(0,10)} at {props.trans.created_at.substring(11,16)}</td>

        {/* <td>{props.station.startStation.name} in {props.station.startStation.location}</td> */}
        {/* <td>{(props.station.stopStation) ? props.station.stopStation.name + " in " : "Not finished yet" } {(props.station.stopStation) ? props.station.stopStation.location : ""}</td> */}
        <td>{props.trans.amount}€</td>
        <td>{(props.trans.amount > 0) ? <FontAwesomeIcon icon={faPiggyBank}/> : <FontAwesomeIcon icon={faBicycle}/>}</td>
    </tr>
    </>
    )
}