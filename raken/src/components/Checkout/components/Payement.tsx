import React, { Component, useEffect } from 'react';
import './styles.css'
import { withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import "react-step-progress-bar/styles.css";
import { loadStripe } from "@stripe/stripe-js";
import * as animationData from "../../../assets/15145-ok-sign.json"
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { listAdresses, } from '../../../redux/actions/adressActions';
import ReactLoading from 'react-loading'
import { Card, CardText } from 'reactstrap';
import { secureLocalStorage, secureStorage } from '../../../utils/secureStorage';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Lottie from 'react-lottie';


const BlackRadio = withStyles({
    root: {
        color: 'grey',
        '&$checked': {
            color: 'grey',
        },
    },
    checked: {
        color: 'grey',
        '&$checked': {
            color: 'black',
        },
    },
})((props: RadioProps) => <Radio color="default" {...props} />);

const optionsLottie = {
    loop: false,
    autoplay: true,
    //@ts-ignore
    animationData: animationData.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


export default function Adresses(props: PROPS) {

    //@ts-ignore
    const adresseChoose = useSelector((state) => state.adresse);
    const { addressChosen } = adresseChoose;

    //@ts-ignore
    const orderCreate = useSelector((state) => state.orderCreate);
    const { success } = orderCreate;
    const errorOrder = orderCreate.error;

    let adressObj: any = null

    //@ts-ignore
    const listAdresse = useSelector((state) => state.adresseList);
    const { loading, error, adresses } = listAdresse;

    // @ts-ignore
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // modal stripe
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const key = process.env.REACT_APP_PUBLISHABLE_KEY_STRIPE
    const stripePromise = loadStripe(key as any);



    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin

    if (adresses) {
        adressObj = adresses.find((o: any) => o._id === addressChosen);
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listAdresses())

        if (!userInfo || cartItems?.length <= 0 || !addressChosen) {
            secureStorage.removeItem('progress')
            secureStorage.removeItem('state')
        }
        //console.log(adressObj)
    }, [])

    if (!userInfo || cartItems?.length <= 0 || !addressChosen) {
        secureStorage.removeItem('progress')
        secureStorage.removeItem('state')
    }

    const [selectedValue, setSelectedValue] = React.useState('stripe');



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };


    const formSubmit = (e: any) => {
        e.preventDefault()
        setShow(true);
        if (adressObj) {

        }
        // if(parseMobile(props.adress)){
    }

    function htmlEncode(str: string) {
        return String(str).replace(/[^\w. ]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    }

    return (
        <>

            <section className='adress-section'>
                <h2>Paiement</h2>
                <span style={{ textAlign: 'left', width: '90%' }}>Veuillez vérifier votre commande avant le paiement.</span>
                <br></br>
                <form onSubmit={formSubmit} className='f-column'>
                    <div className='d-flex selction adress'>
                        <div>
                            <BlackRadio
                                checked={selectedValue === 'stripe'}
                                onChange={handleChange}
                                value="stripe"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'e' }}
                                size="small"
                            />
                            <span>Payer par carte bancaire </span>

                        </div>
                        <div>
                            <BlackRadio
                                checked={selectedValue === 'paypal'}
                                onChange={handleChange}
                                value="paypal"
                                disabled
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'e' }}
                                size="small"

                            />
                            <span>Payer par paypal </span>
                        </div>
                    </div>
                    <div className='header-verification'>
                        <span>Adresses</span><a href="#" onClick={() => props.setState(50)}><i className="fal fa-pencil-alt"></i></a>
                    </div>
                    <div className='d-flex flex-wrap selction adresses'>
                        {loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                            error || !adressObj ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                                <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                            </Card> :
                                <div className="card border-dark adress-card mb-3" style={{ maxWidth: '18rem' }}>
                                    <div className="card-body text-dark payment-card">
                                        {/* <span>{adressObj.type}</span> */}
                                        <div>
                                            <p style={{ color: selectedValue === adressObj._id.toString() ? 'black' : 'grey' }} className="card-text">{adressObj.firstname} {adressObj.lastname}</p>
                                            <p className="card-text">{adressObj.lastname}</p>
                                            <p className="card-text">{adressObj.adress}</p>
                                            <p className="card-text">{adressObj.more_info}</p>
                                            <p className="card-text">{adressObj.zip_code} {adressObj.city}</p>
                                            <p className="card-text">{adressObj.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='header-verification'>
                        <span>article dans votre panier</span><a href="/cart" ><i className="fal fa-pencil-alt"></i></a>
                    </div>
                    {cartItems ? cartItems.length === 0 ? null : (
                        cartItems.map((item: any, key: number) => {
                            return (
                                <div className='d-flex flex-column'>
                                    <div className='d-flex justify-content-between mt-3' style={{ width: '100%' }}>
                                        <div className='d-flex'>
                                            <img style={{ width: '4rem', maxHeight: '6rem' }} src='https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg' />
                                            <div className='mr-3 d-flex flex-column' style={{ marginLeft: 10, width: '100%' }}>
                                                <span className='title-article'>{item.name}</span>
                                                <span style={{ fontSize: 14, color: 'gray' }}>Taille: XS</span>
                                                <span style={{ fontSize: 14, color: 'gray' }}>Quantité: {item.qty}</span>
                                                <span style={{ fontSize: 16 }}>Couleur: Lilas</span>
                                            </div>
                                        </div>

                                        <div>
                                            <span style={{ fontSize: 16 }}>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    ) : null}
                    <hr />
                    <div className='cart-summary-wrap'>
                        <div>
                            <span>Somme total</span>
                            <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
                        </div>
                        <div>
                            <span>Livraison</span>
                            <span>gratuite</span>
                        </div>
                        <div>
                            <span>Total TTC</span>
                            <b> <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span></b>
                        </div>
                    </div>
                    {/* <div className='mt-5 d-flex justify-content-center'>
                    <button type={'submit'} className='confirmButton'>
                        Payer
                </button >
                </div> */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <div className="App">
                                <div className="sr-root">
                                    <div className="sr-content">
                                        {success ? null : cartItems.length > 1 ? (
                                            <div className="pasha-image-stack">
                                                {cartItems ? cartItems.length === 0 ? (error()) : cartItems.length > 1 ? (
                                                    cartItems.slice(0, 3).map((item: any, key: number) => {
                                                        return (
                                                            <img
                                                                alt=""
                                                                src={item.image[0][0].original}
                                                                // width="80"
                                                                height="210"
                                                            />
                                                        )
                                                    })
                                                ) : null : null}
                                            </div>
                                        ) :
                                            cartItems.slice(0, 3).map((item: any, key: number) => {
                                                return (
                                                    <div className='mb-20 justify-content-center d-flex one-product-modal-stripe'>
                                                        <img
                                                            alt=""
                                                            src={item.image[0][0].original}
                                                            height="350"
                                                        /></div>)
                                            })}

                                    </div>

                                    <div className="sr-main">
                                        {success ?
                                            <div>
                                                <Lottie options={optionsLottie}
                                                    // height={400}
                                                    width={350}
                                                />
                                                <div className="d-flex justify-content-center flex-column text-center">
                                                    <h4 >Merci pour votre commande</h4>
                                                    <h6 className="mt-3">Elle sera traité et livré très vite</h6>
                                                </div>
                                            </div> :
                                            <Elements stripe={stripePromise}>
                                                <CheckoutForm
                                                    paymentMethod={selectedValue}
                                                    price={cartItems ? cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0) : null}
                                                    userInfo={userInfo}
                                                    name={cartItems?.length > 0 ? cartItems.length <= 1 ? cartItems[0].name : "" : null}
                                                    cartItems={cartItems ? cartItems : null}
                                                />
                                            </Elements>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <div className='buttons-confirm-cancel'>
                        <div style={{ justifyContent: 'center', display: 'flex', cursor: adressObj ? "pointer" : "not-allowed", margin: "20px auto" }}>
                            <button type={'submit'} disabled={adressObj ? false : true} style={{ pointerEvents: adressObj ? "all" : "none", cursor: adressObj ? "pointer" : "not-allowed" }} className={adressObj ? 'button-command' : 'confirmButton'}>
                                Confirmer
                    </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )

}

interface PROPS {
    setState: (arg: number) => void,
}



