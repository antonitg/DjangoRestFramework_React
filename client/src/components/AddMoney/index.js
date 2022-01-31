import React, {useState} from "react";
import { AddMoneyMutation } from "../../hooks/addMoney";

export default function AddMoney() {
    const { mutateAsync } = AddMoneyMutation();
    const pay = () => {mutateAsync({amount:document.getElementById("inputMoney").value})} 
    return (
        <>
        {/* style={{height: "fit-content", top: 0, bottom: 0, right: 0, left:0, position: "absolute", margin: "auto"}} */}

        <div className="row" >
            <div className="col-auto align-middle" >
                <input type="string" className="form-control" id="inputMoney" placeholder="2.35"/>
            </div>
            <div className="col-auto align-middle">
                <button type="submit" className="btn btn-primary mb-2" onClick={pay}>Pay</button>
            </div>
        </div>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Desposit Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card p-3">
                        <h6 className="text-uppercase">Payment details</h6>
                        <div className="form-floating mt-3"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Name on card</label>  </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Card Number</label> <i className="fa fa-credit-card"></i></div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-row">
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Expiry</label></div>
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">CVV</label></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6 className="text-uppercase">Billing Address</h6>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Street Address</label></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">City</label></div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput"  type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Username</label>  </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mt-3 mr-2"> <input id="floatingInput" type="text" name="name" className="form-control" required="required"/>  <label htmlFor="floatingInput">Zip code</label> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onK onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> */}


                
                {/* <div className="mt-4 mb-4 d-flex justify-content-between"> <span>Previous step</span> <button className="btn btn-success px-3">Pay $840</button> </div> */}

            </>
    );
}