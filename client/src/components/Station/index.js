import React from "react"
import "./Station.css"
export default function Station(props) {
    // console.log(props);
    return (
        <>
        <div className="col-md-4">
        {/* { props.station.bikes.length > 0 && <div className="card p-3 mb-2 pcard"> }
        {{ props.station.bikes.length <= 0 && <div className="card p-3 mb-2 pcard"> }} */}
            <div className="card p-3 mb-2 pcard" >
                <div style={{borderRadius:"12px",backgroundRepeat:"no-repeat",position:"unset", backgroundImage:"url('"+props.station.photo+"')", backgroundSize:"cover" ,paddingBottom: "220px"}} className="d-flex justify-content-between">
                    <div  className="d-flex flex-row align-items-center pb-5">
                        {/* <div className="icon"> <img alt="asdad" className="img img-fluid img-responsive" src={props.station.photo}/> </div> */}
                        {/* <div className="ms-2 c-details">
                            <h6 className="mb-0">Mailchimp</h6> <span>1 days ago</span>
                        </div> */}
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