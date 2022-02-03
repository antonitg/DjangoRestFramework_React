import React, { useEffect }  from "react"
import { useQuery,useQueryClient } from "react-query";
import apiClient from "../../core/http-common";
import AdminStation from "../AdminStation";
export default function AdminStationsManagement() {

    const queryClient = useQueryClient()
    const { data: stationsFull, error } = useQuery(['stations']);
    useEffect(()=>{
        apiClient.get("/v2/stations/").then(result => queryClient.setQueryData(['stations'], () => (result.data))) // Fill te station query
    }, [])
    var listStations = null;
    if (stationsFull) {
          listStations = stationsFull.map((station) =>
          <AdminStation key={station.id} station={station}/>
          );
    }
    return (
        <>
            <div className="col row" style={{backgroundColor:"#332940", padding: "12px", marginBottom: "100px"}}>
                {listStations}
            </div>

        </>
    )
}