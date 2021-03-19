import React, { Component, useState, useEffect } from 'react';
import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import './components/styles.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Collapse, Button, } from 'reactstrap';
import "react-step-progress-bar/styles.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";
// @ts-ignore
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
// @ts-ignore
import FloatingLabelInput from 'react-floating-label-input';
import TextField from '@material-ui/core/TextField';
import Adresses from './components/Adresses'
import Payement from './components/Payement'
import { secureStorage } from '../../utils/secureStorage'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'

function Checkout() {

  const [newAdress, setNewAdress] = React.useState(false)
  const [mode, setMode] = React.useState("out-in");
  const stateValue = secureStorage.getItem('state')
  const progressValue = secureStorage.getItem('progress')
  const [state, setState] = React.useState(!stateValue ? 0 : stateValue);

  //@ts-ignore
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin

  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const errorCart = cart.error;

  //@ts-ignore
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;
  const errorOrder = orderCreate.error;

  useEffect(() => {

    // name()
    if (userInfo && state <= 0) {
      handleState()
    }

    if (cartItems?.length == 0) {
      setState(0)
      secureStorage.removeItem('progress')
      secureStorage.removeItem('state')
      document.location.href = '/cart'
    }


    console.log(stateValue)
  }, [])


  // adresses validators
  const [adressesValidators, setAdressesValidators] = React.useState({ surname: false, Name: false, Adress: false, ZipCode: false, City: false, Country: false, PhoneNumber: false });
  const [adressesInput, setAdressesInput] = React.useState({ surname: null, Name: null, Adress: null, AdressMore: null, ZipCode: null, City: null, Country: null, PhoneNumber: null, MoreInfo: null })
  const [progress, setProgress] = React.useState(!progressValue ? 0 : progressValue);


  const handleState = () => {

    console.log(progressValue)
    if (state <= 100) {
      setState(state + 50)
      // setState((state:any) => ();
      secureStorage.setItem('state', state + 50)
      console.log(progressValue)

      if (state > progress || state == 100) {
        setProgress(progress + 50)
        secureStorage.setItem('progress', progress + 50)
      }
    }
  }

  const handleProgress = (index: number) => {

    if (state <= 100) {
      setState(index == 0 ? 0 : index == 1 ? 50 : index == 2 ? 100 : 0)
      secureStorage.setItem('state', index == 0 ? 0 : index == 1 ? 50 : index == 2 ? 100 : 0)
      console.log(progress)

      if (state > progress && state <= 100) {
        console.log('here')
        // setProgress(progress)
        secureStorage.setItem('progress', state)
      }
    }

  }
  const { width, height } = useWindowSize()







  const [expandArticle, setExpandArticle] = React.useState(false)



  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar active />
      {success && <Confetti
        width={width}
        height={height}
        className={"confetti-style"}
        run={true}
      />
      }

      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs />
        </div>
        <div className="container">
          <section className="mt-5 mb-4">
            <div className="row">
              <div className="col-lg-8">
                <div className="card wish-list mb-4">
                  <div className="card-body1">
                    {/* <h5 className="mb-4">Commande </h5> */}
                    <ProgressBar
                      percent={state
                        //34
                      }
                      // height={20}
                      filledBackground="linear-gradient(to right, #bababa, #878787)"
                    >
                      <Step>
                        {({ accomplished, index }: any) => (
                          <div onClick={() => accomplished || progressValue == 0 ? handleProgress(index) : {}} className={`point-step${accomplished || progressValue == 0 ? ' point-step-clickable' : ''}`}>

                            <div
                              className={`indexedStep ${accomplished || progressValue == 0 ? "accomplished" : null}`}
                            >
                              {index + 1}
                            </div>
                            <span className='other-text'>Connexion</span>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }: any) => (
                          <div onClick={() => accomplished || progressValue >= 50 ? handleProgress(index) : {}} className={`point-step${accomplished || progressValue >= 50 ? ' point-step-clickable' : ''}`}>
                            <div
                              className={`indexedStep ${accomplished || progressValue >= 50 ? "accomplished" : null}`}
                            >
                              {index + 1}
                            </div>
                            <span className='other-text'>Adresses</span>
                          </div>
                        )}
                      </Step>
                      <Step>
                        {({ accomplished, index }: any) => (
                          <div onClick={() => accomplished || progressValue == 100 ? handleProgress(index) : {}} className={`point-step${accomplished || progressValue == 100 ? ' point-step-clickable' : ''}`}>
                            <div
                              className={`indexedStep ${accomplished || progressValue == 100 ? "accomplished" : null}`}
                            >
                              {index + 1}
                            </div>
                            <span className='other-text'>Paiement</span>
                          </div>
                        )}
                      </Step>
                    </ProgressBar>
                  </div>
                  <hr />
                  {/* @ts-ignore */}
                  <SwitchTransition mode={mode}>

                    <CSSTransition
                      key={state}
                      /* @ts-ignore */
                      addEndListener={(node: any, done: any) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >


                      <div className='body-content-command'>

                        {state == 0 ? <section>
                          <h3>Identifiez-vous pour continuer</h3>
                          <div className='buttons-login-command'>
                            <Button onClick={() => window.location.href = '/connexion?checkout=true'}>
                              Se connecter
                          </Button>
                            <Button onClick={() => window.location.href = '/register?checkout=true'}>
                              S'inscrire
                          </Button>

                          </div></section> : state == 50 ?
                          // section adresse
                          <Adresses
                            surnameValidator={adressesValidators.surname}
                            surname={adressesInput.surname}

                            nameValidator={adressesValidators.Name}
                            name={adressesInput.Name}

                            adressValidator={adressesValidators.Adress}
                            adress={adressesInput.Adress}

                            adress_more={adressesInput.AdressMore}

                            more_info={adressesInput.MoreInfo}

                            zipCodeValidator={adressesValidators.ZipCode}
                            zipCode={adressesInput.ZipCode}

                            cityValidator={adressesValidators.City}
                            city={adressesInput.City}

                            countryValidator={adressesValidators.Country}
                            country={adressesInput.Country}

                            phoneValidator={adressesValidators.PhoneNumber}
                            phoneNumber={adressesInput.PhoneNumber}

                            newAdress={newAdress}

                            adressesValidators={adressesValidators}
                            setAdresses={setAdressesValidators}
                            setAdressesInput={setAdressesInput}
                            adressesInput={adressesInput}
                            setState={handleState}
                            setNewAdress={setNewAdress}


                          /> : stateValue == 100 ?
                            <Payement setState={(index: number) => setState(index)} /> : null}
                      </div>
                    </CSSTransition>
                  </SwitchTransition>


                  {/* {state ? "Hello, world!" : "Goodbye, world!"} */}


                </div>
              </div>

              <div className="col-lg-4">



                <div className="card mb-4">
                  <div className="card-body ">
                    <h5 className="mb-3">Total</h5>
                    <ul className="list-group list-group-flush">
                      <a style={{ cursor: 'pointer' }} onClick={() => setExpandArticle(!expandArticle)}><li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        {cartItems.reduce((a: any, c: any) => a + c.qty, 0)} article{cartItems.reduce((a: any, c: any) => a + c.qty, 0) > 1 ? "s" : ""}
                        <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
                      </li></a>
                      <Collapse isOpen={expandArticle || stateValue == 100}>
                        {cartItems ? cartItems.length === 0 ? null : (
                          cartItems.map((item: any, key: number) => {
                            return (
                              <div className='d-flex flex-column'>
                                <div className='d-flex justify-content-between mt-3' style={{ width: '100%' }}>
                                  <div className='d-flex'>
                                    <img style={{ width: '4rem', maxHeight: '6rem' }} src={item.image[0][0].original} />
                                    <div className='mr-3 d-flex flex-column' style={{ marginLeft: 10, width: '100%' }}>
                                      <span>{item.name}</span>
                                      <span style={{ fontSize: 14, color: 'gray' }}>{item.qty}</span>
                                      <span style={{ fontSize: 16 }}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                                    </div>
                                  </div>

                                  <div>
                                    <a href="/cart" type="button" className="card-link-secondary small text-uppercase mr-3"><i className="fal fa-pencil-alt"></i></a>
                                  </div>
                                </div>
                                <div>

                                </div>

                              </div>
                            )
                          })
                        ) : null}
                      </Collapse>
                      {/* coupon */}
                      {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Coupon
                    <span>-{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(12)}</span>
                      </li> */}
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Livraison
                    <span>Gratuit</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                        <div>
                          <strong>Le total est de</strong>
                          <strong>
                            <p className="mb-0">(TVA inclus)</p>
                          </strong>
                        </div>
                        <span><strong>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</strong></span>
                      </li>
                    </ul>

                  </div>
                </div>



                <div className="card mb-4">
                  <div className="card-body">

                    <a onClick={toggle} className={`dark-grey-text d-flex justify-content-between`} role="button" aria-controls="collapseExample" data-toggle="collapse"  >
                      Code de promotion (optionel)
                  <span><i className="fas fa-chevron-down pt-1"></i></span>
                    </a>
                    <Collapse isOpen={isOpen}>
                      <div>
                        <div className="mt-3">
                          <div className="md-form md-outline mb-0 d-flex">
                            <input type="text" id="discount-code" className="form-control font-weight-light" placeholder="Entrez votre code" />
                          </div>
                        </div>
                      </div>
                    </Collapse>

                  </div>
                </div>

              </div>

            </div>

          </section>

        </div>

      </div>
      <Footer />
    </div >
  )
}

export default Checkout
