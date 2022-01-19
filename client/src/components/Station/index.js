import React from "react"
import "./Station.css"
import { JourneyMutation } from "../../hooks/actualJourney";
import { useQuery } from "react-query";
export default function Station(props) {
    let className = 'card p-3 mb-2 pcard';
    const { mutateAsync } = JourneyMutation();
    const { status, data, error } = useQuery(['journey']);
    if (data && !data.start) {
        (props.station.bikes.length > 0) ? className = 'card p-3 mb-2 pcard c-selectable' : className = 'card p-3 mb-2 pcard c-not-selectable';
    } else if (data && data.start) {
        (data && data.start && props.station.bikes.length < props.station.space) ? className = 'card p-3 mb-2 pcard c-selectable' : className = 'card p-3 mb-2 pcard c-not-selectable';
    }
    
    if (data && !data.start && data.startStation === props.station.id) className += ' c-selected'
    if (data && data.start && data.stopStation === props.station.id) className += ' c-selected'
    function selectStation() {
        if (data && !data.start) {
            if (props.station.bikes.length > 0) { 
                data.startStation = props.station.id; 
                data.startName = props.station.name; 
                mutateAsync(data);
            }
        } else if (data && data.start) {
            if (props.station.bikes.length < props.station.space) { 
                data.stopStation = props.station.id;
                data.stopName = props.station.name;
                mutateAsync(data)
            }
        }
        // (!data.start && props.station.bikes.length > 0) ? mutateAsync({startStation: props.station.id, startName: props.station.name }) : mutateAsync({stopStation: props.station.id, stopName: props.station.name})
    }
    return (
        <>
        <div className="col-md-4">
        {/* <button>Cl</button> */}
            <div className={className} onClick={selectStation}>
                <div style={{borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                    <div  className="d-flex flex-row align-items-center pb-5">
                    </div>
                    { props.station.bikes.length > 0 && data && !data.start &&  <div className="badge badge-good"> <span>Available</span> </div> }
                    { props.station.bikes.length <= 0 && data && !data.start &&  <div className="badge badge-bad"> <span>Empty</span> </div> }
                    { props.station.bikes.length < props.station.space && data && data.start &&  <div className="badge badge-good"> <span>Available</span> </div> }
                    { props.station.bikes.length >= props.station.space && data && data.start &&  <div className="badge badge-bad"> <span>Full</span> </div> }
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