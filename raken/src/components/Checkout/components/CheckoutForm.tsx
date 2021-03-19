import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import api from "../../../utils/order-api";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "../../../redux/actions/orderActions";
import { CART_EMPTY } from "../../../redux/constants/cartConstants";


export default function CheckoutForm(props: checkoutProps) {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");
    const [fullName, setFullname] = useState("");
    const { firstname, lastname } = props.userInfo
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const stripe = useStripe() as any;
    const elements = useElements() as any;




    useEffect(() => {
        // Step 1: Fetch product details such as amount and currency from
        // API to make sure it can't be tampered with in the client.
        setCurrency("EUR")
        setAmount(props.price)
        setFullname(firstname + " " + lastname)

        // api.getProductDetails().then((productDetails: any) => {
        //     setAmount(productDetails.amount / 100);
        //     setCurrency(productDetails.currency);
        // });

        // Step 2: Create PaymentIntent over Stripe API
        api
            .createPaymentIntent({
                payment_method_types: ["card"],
                price: props.price,
                card: props.cartItems
            })
            .then((clientSecret: any) => {
                console.log(clientSecret)
                setClientSecret(clientSecret);
            })
            .catch((err: any) => {
                setError(err.message);
            });
    }, []);

    function changeName(str: any) {
        setFullname(str.target.value)
    }

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        setProcessing(true);


        const { error, token } = await stripe.createToken(
            elements.getElement(CardElement)
        );

        console.log(props.paymentMethod)
        // Step 3: Use clientSecret from PaymentIntent and the CardElement
        // to confirm payment with stripe.confirmCardPayment()
        // const payload = await stripe.confirmCardPayment(clientSecret as any, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //         // billing_details: {
        //         //     name: ev.target.name.value
        //         // }
        //     }
        // });

        if (error || fullName.length <= 0) {
            setError( error ? error.message : "Merci d'entrer votre nom et prénom");
            setProcessing(false);

            console.log("[error]", error ? error : "Merci d'entrer votre nom et prénom");
        } else {
            setError(null);
            setSucceeded(true);
            dispatch(createOrder(props.paymentMethod, token))
            setProcessing(false);
            // setMetadata(payload.paymentIntent);
            //  console.log("[PaymentIntent]", payload.paymentIntent);
        }
    };

    const renderSuccess = () => {
        return (
            <div className="sr-field-success message">
                <h1>Your test payment succeeded</h1>
                <p>View PaymentIntent response:</p>

                <pre className="sr-callout">
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre>
            </div>
        );
    };

    const renderForm = () => {
        const options = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a"
                }
            }
        };

        return (
            <form onSubmit={handleSubmit} className='modal-stripe-form'>
                <h4 className='mt-5'>{props.name?.length > 0 ? props.name : "Total de vos articles"}</h4>
                <h1>
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(props.price)}
                </h1>


                <div className="sr-combo-inputs">
                    <div className="sr-combo-inputs-row">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={fullName}
                            onChange={changeName}
                            placeholder="Nom et prénom"
                            autoComplete="cardholder"
                            className="sr-input"
                        />
                    </div>

                    <div className="sr-combo-inputs-row">
                        <CardElement

                            className="sr-input sr-card-element"
                            options={options}
                        />
                    </div>
                </div>

                {error && <div className="message sr-field-error">{error}</div>}

                <button
                    // className=""
                    disabled={processing || !clientSecret || !stripe}
                >
                    {processing ? "Traitement…" : "Payer"}
                </button>
            </form>
        );
    };

    return (
        <div className="checkout-form">
            <div className="sr-payment-form">
                <div className="sr-form-row" />
                {
                //succeeded ? 
                // renderSuccess() : 
                renderForm()
                }
            </div>
        </div>
    );
}

interface checkoutProps {
    price: number,
    name: string,
    userInfo: {
        _id: string,
        firstname: string,
        lastname: string,
        email: string
        newsletter: string,
        isAdmin: string,
        token: string
    }
    cartItems: any
    paymentMethod: string

}
