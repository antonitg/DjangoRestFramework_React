import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    // stripe code here
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>BUY</button>
    </form>
  );
};

export default PaymentForm;