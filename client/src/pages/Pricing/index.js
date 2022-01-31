import React, { useEffect } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import AddMoney from "../../components/AddMoney";
import apiClient from "../../core/http-common"
import { useQuery } from "react-query";
import { useQueryClient } from 'react-query'
import TransactionsListElement from "../../components/TransactionsListElement";
import { faChartLine, faCalendarAlt, faQuestionCircle, faDollarSign } from "@fortawesome/free-solid-svg-icons";
export default function Pricing() {
  const queryClient = useQueryClient()
  const { data: transactions } = useQuery(['transactions']);

  var transactionsList = <tr><td style={{textAlign: "center"}} className="text-danger" colSpan={6}>There are no recent transactions.</td></tr>
  if (transactions) {
    transactionsList = transactions.map((element) =>
      <TransactionsListElement key={element.id} trans={element}/>
    );
  }
  useEffect(()=>{
    apiClient.get("/v2/profile/money/").then(result => queryClient.setQueryData('getMoney', () => (result.data)))
    apiClient.get("/v2/transactions/history/").then(result => queryClient.setQueryData(['transactions'], () => (result.data))) 
  }, [])
  const { data: actualMoney } = useQuery(['getMoney']);
  return (
    <div className="col">
      <div className="card text-white bg-dark text-center" style={{borderRadius: "0"}}>
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch row">
              <div className="col-2 align-self-center">
                <h1 className="mr-2">{(actualMoney) ? actualMoney.money : 0}€</h1>
              </div>
              <div className="col-2 media-body text-start">
                <h4>Your money</h4>
                <span>Available until 2023</span>
              </div>
              <div className="col-6">
                <AddMoney></AddMoney>
              </div>
              <div className="col-2 align-self-center">
                <FontAwesomeIcon style={{marginRight: "20px", fontSize: "4em"}} icon={faWallet}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div >
        <table style={{textAlign: "center"}} className="table table-dark table-hover">
          <thead style={{fontSize: "1.2em"}}>
            <tr>
                <th scope="col"><FontAwesomeIcon icon={faChartLine}/></th>
                <th scope="col"><FontAwesomeIcon icon={faCalendarAlt}/></th>
                <th scope="col"><FontAwesomeIcon icon={faDollarSign }/></th>
                <th scope="col"><FontAwesomeIcon icon={faQuestionCircle}/></th>
              </tr>
            </thead>
            <tbody style={{textAlign: "center", fontSize: "1.2em"}}>
              {transactionsList}
            </tbody>
          </table>
      </div>
    </div>
  );
}
