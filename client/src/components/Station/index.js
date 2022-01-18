import React from "react"
import "./Station.css"
import { JourneyMutation } from "../../hooks/actualJourney";
import { useQuery } from "react-query";
export default function Station(props) {
    let className = 'card p-3 mb-2 pcard';
    const { mutateAsync } = JourneyMutation();
    const { status, data, error } = useQuery(['journey']);
    (props.station.bikes.length > 0) ? className += ' c-selectable' : className += ' c-not-selectable';
    console.log(data);
    if (data !== undefined && data.startStation === props.station.id) className += ' c-selected' 
    function selectStation() {
        if (props.station.bikes.length > 0) mutateAsync({startStation: props.station.id })
    }
    return (
        <>
        <div className="col-md-4">
        {/* <button>Cl</button> */}
            <div className={className} onClick={selectStation}>
                <div style={{borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                    <div  className="d-flex flex-row align-items-center pb-5">
                    </div>
                   { props.station.bikes.length > 0 && <div className="badge badge-good"> <span>Available</span> </div> }
                    { props.station.bikes.length <= 0 && <div className="badge badge-bad"> <span>Empty</span> </div> }
                    
                </div>
                <div className="">
                    <h3 className="heading" style={{marginTop:"8px"}}>{props.station.name}<br/>In {props.station.location}</h3>
                    <div className="">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width:(props.station.bikes.length/props.station.space)*100+"%"}} aria-valuenow={props.station.space/props.station.bikes.length} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="mt-3"> <span className="text1">{props.station.bikes.length} Bikes <span className="text2">of {props.station.space} capacity</span></span> </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}