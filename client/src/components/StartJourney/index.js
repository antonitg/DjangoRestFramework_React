import React from "react";
import { StartJourneyMutation } from "../../hooks/startJourney";
import { StopJourneyMutation } from "../../hooks/stopJourney";
import { useQuery } from "react-query";
import './StartJourney.css'
export default function StartJourney() {
    const { data } = useQuery(['journey']);
    var { mutateAsync: startMutation } = StartJourneyMutation();
    var { mutateAsync: stopMutation  } = StopJourneyMutation();
    function startJourney() {
        if (data.startStation) startMutation({startStation: data.startStation})
    }
    function stopJourney(){
        if (data.stopStation) stopMutation({stopStation: data.stopStation})
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