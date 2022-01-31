import React from "react";
export default function HistoryListElement(props) {
return (
    <>
    <tr>
        <th scope="row">{props.station.id.substring(0,8)}</th>
        <td>{props.station.startStation.name} in {props.station.startStation.location}</td>
        <td>{(props.station.stopStation) ? props.station.stopStation.name + " in " : "Not finished yet" } {(props.station.stopStation) ? props.station.stopStation.location : ""}</td>
        <td>{props.station.start.substring(0,10)} at {props.station.start.substring(11,16)}</td>
        <td>{(props.station.time) ? props.station.time.substring(0,8) : "Not finished yet"}</td>
        <td>{props.station.cost}€</td>
    </tr>
    </>
    )
}