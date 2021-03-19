import React, { Component, useState } from 'react';
import Navbar from '../../utils/Navbar'
import SideBar from '../../utils/TestSideBar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import './components/styles.css'
import { Collapse, Button, CardBody, Card, CardText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { handleQuantity, removeFromCart } from '../../redux/actions/cartActions';
import Lottie from 'react-lottie';
import * as animationBasket from "../../assets/empty-basket.json"


function Cart() {
  const [quantity, setQuantity] = React.useState(0)
  const [clickPromotion, setClickPromotion] = React.useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProduct] = React.useState([
    {
      "_id": 1,
      "name_item": "Robe MAEVA",
      "pictures": "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
      "price_item": 23,
      "size_item": "S",
      "colour_item": 'Rose',
      "nbr_item": 1
    }, {
      "_id": 2,
      "name_item": "Robe Poulet",
      "pictures": "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
      "price_item": 40.56,
      "colour_item": 'Noir',
      "size_item": "X",
      "nbr_item": 2
    }
  ])


  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const errorCart = cart.error;


  const dispatch = useDispatch()
  const rmQty = (rm: number, type: string) => {
    dispatch(handleQuantity(rm, type))
  }


  // console.log(cartItems)

  const toggle = () => setIsOpen(!isOpen);
  const optionsLottie = {
    loop: true,
    autoplay: true,
    className:"lottie-basket-style",
    //@ts-ignore
    animationData: animationBasket.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const error = () => {
    return (<div className="cart-empty-style">
      <h2>C'est bien vide ici !</h2> <div className="lottie-basket-style-wrapper"><Lottie options={optionsLottie}
        // height={400}
       // width={250}
      /></div></div>)

  }

  return (
    <div>
      <Navbar active />
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs />
        </div>
        <div className="container">
          <section className="mt-5 mb-4">
            <div className="row">
              <div className="col-lg-8">
                <div className="card wish-list mb-4">
                  <div className="card-body">
                    <h5 className="mb-4">Panier </h5>
                    {cartItems ? cartItems.length === 0 ? (error()) : (
                      cartItems.map((item: any, key: number) => {
                        return (
                          <>
                            <div key={key} className="row mb-4 justify-content-between">
                              <div className="col-md-5 col-lg-3 col-xl-3">
                                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                  {/* <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" /> */}
                                  <a href={`/eshop/${item.product}`}>
                                    <div className="justify-content-center img-product-card">
                                      <img style={{ maxWidth: "68%" }} className="img-fluid w-100" src={item.image[0][0].original} />
                                      <div className="mask rgba-black-slight waves-effect waves-light"></div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                              <div className="col-md-7 ">
                                <div>
                                  <div className="d-flex flex-wrap justify-content-between">
                                    {/* nom du produit */}
                                    <div className='  flex-column w-50 card-title col-mg-4'>
                                      <div className='product-title-div'>
                                        <h4 className='product-name'><a href={`/eshop/${item.product}`}>{item.name}</a></h4>
                                        <p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
                                      </div>
                                      <div>
                                      </div>
                                      <p>Taille: {item.size}</p>
                                      <p>Couleur: {item.colour}</p>
                                    </div>

                                    <div className="flex-row w-20 flex-wrap justify-content-between body-qty" >
                                      <ul className='pagination quantity set_quantity'>
                                        <li className='page-item'>
                                          <button onClick={() => rmQty(item.product, "moins")} className='page-link' >-</button>
                                        </li>
                                        <li className='page-item'><input className='page-link' type='text' name='' value={item.qty} id='textbox'></input></li>
                                        <li className='page-item'>
                                          <button onClick={() => rmQty(item.product, "plus")} className='page-link' >+</button>
                                        </li>
                                      </ul>
                                      <div >
                                        <button onClick={() => dispatch(removeFromCart(item.product))} style={{ border: 0, background: 'transparent', width: '2em', borderRadius: 4, padding: 2 }} className="card-link-secondary small text-uppercase mr-3"><i className="far fa-trash mr-1" ></i></button>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            {key < products.length - 1 ? <hr className="mb-4 mt-0" /> : null}
                          </>)
                      })
                    ) : error()}

                    {cartItems.length === 0 ? null : <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1"></i> Ne perdez pas de temps et commandez, les articles dans votre panier ne sont pas réserver.</p>}

                  </div>
                </div>

                {cartItems ? cartItems.length === 0 ? null : (
                  <div className="card mb-4">
                    <div className="card-body">

                      <h5 className="mb-4">Temps estimé de livraison</h5>

                      <p className="mb-0" style={{ textAlign: 'left' }}> Jeu., 12.03. - Lund., 16.03.</p>
                    </div>
                  </div>
                ) : null}

              </div>

              {!cartItems ? (
                <></>) : (
                <div className="col-lg-4">

                  <div className="card mb-4">
                    <div className="card-body">

                      <h5 className="mb-3">Total</h5>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {cartItems.reduce((a: any, c: any) => a + c.qty, 0)} article{cartItems.reduce((a: any, c: any) => a + c.qty, 0) > 1 ? "s" : ""}
                          <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Livraison
                          <span>Gratuit</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Le total est de</strong>
                            <strong>
                              <p className="mb-0">(TVA inclus)</p>
                            </strong>
                          </div>
                          <span><strong>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</strong></span>
                        </li>
                      </ul>


                      <div style={{ cursor: cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? "pointer" : "not-allowed", margin: "20px auto" }}>
                        <a style={{ display: 'flex', width: "100%", justifyContent: 'center', textDecoration: 'none', }} className={cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? '' : 'disabled'} href="/checkout">
                          <button disabled={cartItems.reduce((a: any, c: any) => a + c.qty, 0) < 1} onClick={() => window.location.href = '/page2'} style={{
                            pointerEvents: cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? "all" : "none", display: 'flex',
                            width: '100%',
                            // backgroundColor: "#e6e4e4",
                            justifyContent: 'center'
                          }} className='btn-comand'>
                            Commander
                          </button>
                        </a>
                      </div>

                    </div>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body">

                      <button onClick={toggle} className={`dark-grey-text d-flex justify-content-between promotion-btn`} role="button" aria-controls="collapseExample" data-toggle="collapse" aria-expanded={clickPromotion ? 'true' : "false"} >
                        Code de promotion (optionel)
                        <span><i className="fas fa-chevron-down pt-1"></i></span>
                      </button>
                      <Collapse isOpen={isOpen}>
                        <div>
                          <div className="mt-3">
                            <div className="md-form md-outline mb-0">
                              <input type="text" id="discount-code" className="form-control font-weight-light" placeholder="Enter discount code" />
                            </div>
                          </div>
                        </div>
                      </Collapse>

                    </div>
                  </div>

                </div>
              )}
            </div>

          </section>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Cart
