// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe,
//       } from '@stripe/stripe-js';
//   import PaymentForm from "../Payment/index";
// import {PaymentElement} from '@stripe/react-stripe-js';
// import StripeCheckout from "react-stripe-checkout";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');
// export default function PayStripe() {
//     const options = {
//         // passing the client secret obtained from the server
//         clientSecret: `${process.env.REACT_APP_STRIPE_API_KEY}`,
//     };
//     const InjectedCheckoutForm = () => {
//         return (
//           <ElementsConsumer>
//             {({elements, stripe}) => (
//               <CheckoutForm elements={elements} stripe={stripe} />
//             )}
//           </ElementsConsumer>
//         );
//       };
//     return (
//         <>
//         <Elements stripe={stripePromise} options={options}>
//             <form>
                
//             <PaymentElement />
//             <button>Submit</button>
//             </form>
//         </Elements>
//             {/* <StripeCheckout
//             className="center"
//             stripeKey={`pk_test_qblFNYngBkEdjEZ16jxxoWSM`}
//             token="1"
//             amount="1"
//             name="Sample Book"
//             billingAddress
//             shippingAddress
//         /> */}
//       </>
//     );
// }