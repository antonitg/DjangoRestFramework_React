import React, { useEffect }  from "react"
import Station from "../Station";
import { GetStations } from "../../hooks/getStations";
import { Outlet } from "react-router-dom";
import { JourneyMutation } from "../../hooks/actualJourney";
export default function StartPoints() {
  const { mutateAsync } = JourneyMutation();
  useEffect(()=>{
      mutateAsync({}) // Fill empty mutation at the start of the app to ensure so all querys triggers and dependent components works properly 
    }, [])

    const { data, error } = GetStations()
    // console.log(error);
    if (error) window.location.href = '/auth'
    const stations = data
    // console.log(stations);
    var listStations = null;
    if (stations) {
        listStations = stations.data.map((station) =>
        <Station key={station.id} station={station}/>
        );
    }
  return (
    <> 
      <div className="col row" style={{backgroundColor:"#332940", padding: "12px"}}>
        {listStations}
        <Outlet/>
      </div>
    </>
  )
}