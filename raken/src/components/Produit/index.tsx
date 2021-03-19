
import React, { useEffect, useState } from 'react';
import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import './components/styles.css'
import Modal from 'react-bootstrap/Modal'
import Slider from './components/slider'
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from "react-loading";
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { detailsProduct, detailsSuggestion } from '../../redux/actions/productActions';
// import {addToCart} from '../../store/actions/actions'
import { CardText, Card as Card1 } from 'reactstrap';
import Card from '../Eshop/components/card';
import Caroussel from "./components/Caroussel"


export default function Produit(props: any) {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [mouseEnter, setMouse] = useState(false);
  const [activeSizeId, setActiveSizeId] = React.useState({ id: 0, size: "S" })
  const [color, setColor] = React.useState({ index: 0, colorUrl: "", colorString: "" })
  const [quantity, setQuantity] = React.useState(1)

  //@ts-ignore
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productId = props.match.params.product;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  // @ts-ignore
  const productSuggestion = useSelector((state) => state.productSuggestion);
  const { products } = productSuggestion;
  const loadingProduct = productSuggestion.loading
  const errorProduct = productSuggestion.error
  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const errorCart = cart.error;


  // const { cartItems, error } = cart;



  const handleClose = () => setShow(false);


  const ajouterAuPanier = () => {
    setShow(true);
    console.log(product.image[0][0].color)
    const colorReal = color.colorString ? color.colorString : product.image[0][0].color
    dispatch(addToCart(productId, quantity, activeSizeId.size, colorReal));


    // addToCart(val, quantity)
  }

  useEffect(() => {
    dispatch(detailsSuggestion({}));
    dispatch(detailsProduct(productId));
    //console.log(product.image[0][0].color)

  }, [dispatch, productId]);





  const handleTab = (index: number, colorUrl: string, colorString: string) => {
    setColor({ ...color, index, colorUrl, colorString })
  }

  const rmVal = (rm: any) => {
    dispatch(removeFromCart(rm))
  }


  return (
    <div>
      <Navbar active rmFromCart={rmVal} />
      <div className='body-eshop'>
        {loading ? <div></div> : (
          <div className='breadcrumb-style'>
            <Breadcrumbs name={product ? product.name : "Produit introuvable"} />
          </div>
        )}
        {loading ? (
          <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div>
        ) : error || !product ? (
          <Card1 body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
            <CardText color='red' style={{ color: 'red' }}>{!product ? "Product not found" : error}</CardText>
          </Card1>
        ) : (
          <div className='box-body'>

            <div className='bow-container'>
              {/* <Slider /> */}
              {
                <div className='details'>
                  <div className='big-img'>
                    <Slider images={product.image[color.index]} />
                  </div>

                  <div className='box-produit'>
                    <div className='row'>
                      <h2>{product.name}</h2>
                      <span>{product.price} €</span>
                    </div>

                    <h4>Sélectionnez une taille</h4>
                    <div className="size-produit">
                      <hr />
                      <div className="sizes-texts">
                        {product.size.map((size: product_props, k: number) => (
                          <h4 onClick={() => setActiveSizeId({ id: k, size: size.value })} key={k} className={k == activeSizeId.id ? 'size-text-bold' : 'size-text-normal'}>{size.value}</h4>
                        ))
                        }
                      </div>
                      <hr />
                    </div>
                    <div className='quantity-and-addBasket'>
                      <div className='quantity-style'>
                        <button className='plus-button' onClick={() => setQuantity(quantity > -1 ? quantity + 1 : 0)}>
                          +
                        </button>
                        <div className='quantity-text'>
                          {quantity}
                        </div>
                        <button className={'minus-button'} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                          -
                        </button>
                      </div>

                      <button className='button-addBasket' onClick={() => ajouterAuPanier()} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                        {show ? <ReactLoading type={'spinningBubbles'} className='loading-button' height={20} width={20} color={mouseEnter ? "#fff" : "#000"} /> : null}
                        Ajouter au panier
                      </button>
                    </div>
                    <div className='description-style'>
                      <div className="thumb">
                        {product.image.map((x: any, k: any) => {
                          return (
                            x.slice(0, 1).map((xx: any, ki: any) => (
                              <div key={x._id} className="thumb-img" onClick={() => handleTab(k, x[0].thumbnail, x[0].color)}>
                                <img style={{ opacity: k == color.index ? '1' : '0.7' }} src={x[0].thumbnail} alt='' />
                              </div>))
                          )
                        }
                        )}

                      </div>
                      <p></p>
                      <p>{product.description}</p>

                    </div>
                  </div>
                </div>

              }
              <div>
              <h3 style={{ textAlign: 'center' }}>Suggestion</h3>
                <Caroussel>
                {loadingProduct ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                    errorProduct ? <Card1 body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                      <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                    </Card1> :
                      products.products.map((item: any) => {
                        return (
                          <Card image={item.image} name={item.name} price={item.price} keyProduct={item._id} />
                        )
                      })}
                </Caroussel>
                
                <div className='suggestionStyle'>
                  

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer fixed />
      <Modal show={show} onHide={handleClose}>

        {loading || !product ? <div></div> : (


          <Modal.Body>
            {/* <div style={{position:'absolute'}}> */}

            <div className='product-success-modal'>
              <span></span>
              <span>Produit ajouté à votre panier</span>
              <button onClick={() => setShow(false)} style={{ marginTop: '0px 8px' }} type="button" className="close-button-modal">×</button>
            </div>
            {product.image.slice(0, 1).map((x: any, k: any) => (
              <div className='image-product-modal'>
                <img style={{ height: '12rem', width: '10rem' }} src={color.colorUrl ? color.colorUrl : x[0].original} />
              </div>
            ))}

            <h3>{product.name}</h3>

            <div className='product-information-modal'>
              {/* @ts-ignore */}
              <span>Taille: {activeSizeId.size}</span>
              <span>Couleur: Fuchsia</span>
              <span>Quantité: {quantity}</span>
            </div>

            <div className='information-modal'>
              <span >Vous avez {cartItems.reduce((a: any, c: any) => a + c.qty, 0)}  article{`${cartItems.length >= 2 ? 's' : ''}`} dans votre panier.</span>
            </div>

            <div className='product-information-modal'>
              <span>Total produits: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
              <span>Frais de port: gratuit</span>
              <span>Total: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))} TTC</span>
            </div>

            <div className='buttons-shop-modal'>
              <button onClick={() => setShow(false)} className='continue-shop-modal'>CONTINUER VOS ACHATS</button>
              <button className='continue-command-modal'>COMMANDER</button>
            </div>
            {/* </div> */}
          </Modal.Body>
        )}
      </Modal>

    </div>
  );
}

interface productType {
  "_id": number,
  "title": string,
  "pictures": any[],
  "colors_pictures": any[],
  "content": string,
  "price": number,
  "sizes": string[],
  "count": number
}

interface product_props {
  "_id": number,
  "value": string,
  "quantity": number
}

