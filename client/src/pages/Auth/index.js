import React from "react"
import Register from '../../components/Register'
import Login from '../../components/Login'
import './Auth.css'
export default function Auth() {
    return (
      <>
      <div className="conatiner row pbg vh100">
        <div className="col container pt-5">
        <h1 className="text-center pcprimary">Sign In</h1>
            <div className="row d-flex justify-content-center">
                <div className="col pcol brprimary">
                  <Login/>
                </div>
            </div>
        </div>
        <div className="container col pt-5">
          <h1 className="text-center pcprimary">Sign Up</h1>
            <div className="row d-flex justify-content-center">
                <div className="blprimary pcol col">
                    <Register/>
                </div>
            </div>
        </div>
        </div>
      </>
    )
  }