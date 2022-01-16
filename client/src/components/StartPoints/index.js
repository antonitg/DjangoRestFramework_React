import React from "react"
import Station from "../Station";
// import { GetStations } from "../../hooks/getStations";
import { useQuery } from 'react-query'
import apiClient from '../../core/http-common'

export default function StartPoints() {
    const { data: stations } = useQuery(
        ['stations', 'getStations'],
        async () => await apiClient.get('/v1/stations/'),
      );
    // const { numbers } = GetStations();
    // const { data } = useProfileQuery()
    console.log(stations);
    var listStations = null;
    if (stations) {
        listStations = stations.data.map((station) =>
        // console.log(station),
        <Station key={station.id}
                    station={station} />
        );
    }
    // const listItems = [1,2,3]
  return (
    <> 
      <div className="col row" style={{backgroundColor:"#332940", padding: "12px"}}>
        {listStations}
      </div>
        
    </>
  )
}