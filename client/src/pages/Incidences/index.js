import React, { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faPlay, faHashtag, faBicycle, faUser, faBoxTissue, faScrewdriver } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient } from 'react-query'
import apiClient from '../../core/http-common'
import { useQuery } from "react-query";
import IncidenceListElement from "../../components/IncidenceListElement"
// import './Incidence.css'
export default function Incidence() {
    const queryClient = useQueryClient()
    const { data: incidence, error } = useQuery(['incidence']);
    if (error) console.log(error);
    useEffect(()=>{
        apiClient.get("/v4/incidence/list/").then(result => queryClient.setQueryData(['incidence'], () => (result.data))) // Fill te station query
      }, [])
    var incidenceList = <tr><td style={{textAlign: "center"}} className="text-danger" colSpan={6}>There are no recent journeys.</td></tr>
    if (incidence) {
        incidenceList = incidence.map((element) =>
        <IncidenceListElement key={element.id} incidence={element}/>
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
                                <th scope="col"><FontAwesomeIcon icon={faBicycle}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faUser}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faBoxTissue}/></th>
                                <th scope="col"><FontAwesomeIcon icon={faScrewdriver}/></th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign: "center"}}>
                            {incidenceList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}