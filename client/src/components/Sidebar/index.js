import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faBicycle, faMoneyBill, faWrench, faInbox } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import JourneyTimer from "../JourneyTimer"
export default function Sidebar() {
  const location = useLocation();
  return (
    
    <> 
    <div className="row">
  <div className="col-4 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: '340px', height: "100vh"}}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"></svg>
        <span className="fs-4">BIKEAPP</span>
      </a>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/" className={`nav-link text-white ${location.pathname === '/' ? "active" : ""}`}>
          <FontAwesomeIcon style={{marginRight: "20px"}} icon={faBicycle}/>
            App
            </Link>
        </li>
        <li>
            
            <Link to="history" className={`nav-link text-white ${location.pathname === '/history' ? "active" : ""}`}>
            <FontAwesomeIcon style={{marginRight: "20px"}} icon={faHistory}/>
              History
              </Link>
        </li>
        <li>
        <Link to="pricing" className={`nav-link text-white ${location.pathname === '/pricing' ? "active" : ""}`}>
            <FontAwesomeIcon style={{marginRight: "20px"}} icon={faMoneyBill}/>
              Pricing
              </Link>
        </li>
        <li>
        {localStorage.getItem('admin') === "y" && 
        <Link to="admin" className={`nav-link text-white ${location.pathname === '/admin' ? "active" : ""}`}>
          <FontAwesomeIcon style={{marginRight: "20px"}} icon={faWrench} />
            Management
          </Link>
        }
        </li>
        <li>
        {localStorage.getItem('admin') === "y" && 
        <Link to="incidences" className={`nav-link text-white ${location.pathname === '/incidences' ? "active" : ""}`}>
          <FontAwesomeIcon style={{marginRight: "20px"}} icon={faInbox} />
            Incidences
          </Link>
        }
        </li>
      </ul>
      <hr/>
      <div>
        <JourneyTimer/>  
      </div>
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
    {/* <div style={{marginleft:"350px"}}/> */}
      <Outlet className="col-8"/>
      </div>
  </>
  )
  }