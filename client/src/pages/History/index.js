import React, { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faPlay, faCalendarAlt, faDollarSign, faStopwatch, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient } from 'react-query'
import apiClient from '../../core/http-common'
import { useQuery } from "react-query";
import HistoryListElement from "../../components/HistoryListElement"
import './History.css'
export default function History() {
    const queryClient = useQueryClient()
    const { data: history, error } = useQuery(['history']);
    if (error) console.log(error);
    useEffect(()=>{
        apiClient.get("/v2/journey/history/").then(result => queryClient.setQueryData(['history'], () => (result.data))) // Fill te station query
      }, [])
    var historyList = <tr><td style={{textAlign: "center"}} className="text-danger" colSpan={6}>There are no recent journeys.</td></tr>
    if (history) {
        historyList = history.map((element) =>
        <HistoryListElement key={element.id} station={element}/>
    );
  }
    return (
        <div className="col container shadow min-vh-100">
            <div className="row">
                <div className="col">
                <table style={{textAlign: "center"}} className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col"><FontAwesomeIcon icon={faHashtag}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faPlay} /></th>
                                <th scope="col"><FontAwesomeIcon icon={faStop}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faCalendarAlt}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faStopwatch}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faDollarSign}/></th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign: "center"}}>
                            {historyList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}