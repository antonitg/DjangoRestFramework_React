import React, { useEffect }  from "react"
import Station from "../Station";
import { useQueryClient } from 'react-query'
import apiClient from '../../core/http-common'
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { JourneyMutation } from "../../hooks/actualJourney";
export default function StartPoints() {
  const queryClient = useQueryClient()
  const { mutateAsync } = JourneyMutation();
  const { data: stationsFull, error } = useQuery(['stations']);
  useEffect(()=>{
      mutateAsync({}) // Fill empty mutation at the start of the app to ensure so all querys triggers and dependent components works properly 
      apiClient.get("/v2/stations/").then(result => queryClient.setQueryData(['stations'], () => (result.data))) // Fill te station query
    }, [])
    if (error) console.log(error); //window.location.href = '/auth'
    var listStations = null;
    if (stationsFull) {
          listStations = stationsFull.map((station) =>
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