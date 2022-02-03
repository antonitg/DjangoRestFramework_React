import React from "react"
export default function  AdminBike(props) {
    var bikes = null
    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id);
    
      e
        .currentTarget
        .style
        .backgroundColor = 'yellow';
    }
    if (props.bikes) {
        bikes = props.bikes.map((bike) =>
            <li key={bike.id} id={bike.id} draggable="true" className="list-group-item" onDragStart={dragStart}>{bike.name}</li>
        );
    }
    return (
        <>
            {bikes}
        </>

    )

}