/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import './JourneyTimer.css'
export default function JourneyTimer() {
    const { data } = useQuery(['journey']); // Retrieve query data
    // if (error) console.log(error); // Debug errors from the query
    var reload = null // Initialize reload
    if (data && data.startDate) reload = true; // Change the reload var when the data is ready so the useEffect hook takes an instance with the data 
    const [timer, setTimer] = useState(null); // Initialize the timer at null, and define the setter as setTimer
    var calcTimer = () => (data && data.startDate) ? Math.floor((new Date() - new Date(data.startDate)) / 60000)  +" : "+ Math.floor(((new Date() - new Date(data.startDate)) % 60000) / 1000) : null
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(calcTimer()) // Set the value
        }, 1000);
        return () => clearInterval(interval); // Prevent to create more than one interval when the useEffect reload
      }, [reload]);
return (
    <>
        {(data && data.startDate) ? <p className="timer"><FontAwesomeIcon className="timerIcon" icon={faStopwatch}/>{timer}</p> : <p>Not in a Journey, start one!</p> } 
    </>
    )
}
