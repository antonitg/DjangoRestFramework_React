import React from "react";
import { JourneyMutation } from "../../hooks/actualJourney";
import { useQuery } from "react-query";
import './StartJourney.css'
export default function StartJourney() {
    
    const { mutateAsync } = JourneyMutation();
    const { status, data, error } = useQuery(['journey']);
    function startJourney() {
        if (data.startStation) data.start = true; mutateAsync(data)
    }
    function stopJourney(){
        if (data.startStation) data.start = false; mutateAsync(data)
    }
    var printText = null
    var printButton = null
    if (data && !data.start) {
        printText = (data && !data.start && data.startName) ? <p className="text-white sj-p"> You selected {data.startName} . </p> : <p className="text-white sj-p">Select a station first!</p>
        printButton = (data && !data.start) ? <button onClick={startJourney} className="btn text-white sj-btn">Start Journey</button> : <button className="btn text-white sj-btn" disabled>Start Journey</button> 
    } else {
        printText = (data && data.start && data.stopName) ? <p className="text-white sj-p">Are you finishing your journey in {data.stopName}?</p> : <p className="text-white sj-p">Select a station to place your bike.</p>
        printButton = (data && data.stopName && data.start) ? <button onClick={stopJourney} className="btn text-white sj-btn">Stop Journey</button> : <button className="btn text-white sj-btn" disabled>Stop Journey</button>
    }
    return (
        <>
        <div className="sj-main">
            <div className="sj-inside">
                {printText}
                {printButton}
            </div>
        </div>
        </>
    )
}