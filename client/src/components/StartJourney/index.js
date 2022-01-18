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
    return (
        <>
        <div className="sj-main">
            <div className="sj-inside">
                { data ? <p className="text-white sj-p"> You selected {data.startName} click the button to start your journey. </p> : <p className="text-white sj-p">Select a station first!</p>}
                { data && !data.start ? <button onClick={startJourney} className="btn text-white sj-btn">Start Journey</button> : <button className="btn text-white sj-btn" disabled>Start Journey</button>}
                {/* // { data && !data.stopStation && !data.start ? } */}

            </div>
        </div>
        </>
    )
}