import React from "react";
import CloseIncidence from "../CloseIncidence";
export default function IncidenceListElement(props) {
    console.log(props);
return (
    <>
    <tr>
        <th scope="row">{props.incidence.id}</th>
        <td>{(props.incidence.startStation) ? props.incidence.startStation : "Deleted incidence "}</td>
        <td>{(props.incidence.stopStation) ? props.incidence.stopStation : "Deleted station"}</td>
        <td>{props.incidence.bikeName}</td>
        <td>{props.incidence.user}</td>
        <td>{props.incidence.info}</td>
        <td className="text-success fw-bold">{(props.incidence.status === 1) ? <CloseIncidence id={props.incidence.journeyId} key={props.incidence.id+0.5} ></CloseIncidence> : "Closed"}</td>
    </tr>
    </>
    )
}