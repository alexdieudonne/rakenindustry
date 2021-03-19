import React, { Component, useEffect, useRef } from 'react';
import { MenuItems } from './MenuItems';
import logo from '../../assets/logo_raken.png';
import logo_white from '../../assets/logo_raken_white_version.png'
import './Navbar.css'
import './hamburger.css'
import { Button } from '../Buttons';
import styled from "styled-components";
import iconProfil from '../../assets/icons/avatar.png'
import shoppingBag from '../../assets/icons/shopping-bag.png'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
// import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardText } from 'reactstrap';
import { removeFromCart } from '../../redux/actions/cartActions';
import Lottie from 'react-lottie';
import * as animationBasket from "../../assets/empty-list.json"


interface PROPS {
    active?: boolean,
    rmFromCart?: (arg: any) => void
}
interface ITEM {
    cName: string
    iconsLink: string
    url: string
    title: string,
    path?: string
}
const Transition = styled.div`
.active {
  visibility: visible;
  display:flex;
  transition: all 200ms ease-in;
}
.hidden {
  visibility: hidden;
  transition: all 200ms ease-out;
  transform: translate(0, -100%);
}
`;


const Navbar = (props: PROPS) => {
    const [state, setState] = React.useState(false)
    const isDesktopOrLaptop = window.matchMedia('(max-width: 960px)');
    const [navbar, setNavbar] = React.useState(false);

    // @ts-ignore
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const errorCart = cart.error;

    const dispatch = useDispatch()

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading } = userSignin

    const [click, setClick] = React.useState(false);
    const history = useHistory();

    const menu = ["", "", iconProfil, shoppingBag]


    const navItem = (item: ITEM, key: number) =>
        <div onClick={() => item.title == "Compte"? userInfo?.token?'/account': item.path ? history.push(item.path) : null: null} className={item.cName}>
            <Link style={{ textDecoration: 'none' }} to={item.title == "Compte"? userInfo?.token?'/account':item.path ? item.path : '':item.path ? item.path : ''}>
                {!isDesktopOrLaptop.matches ? item.iconsLink ? <> <img src={navbar || state ? menu[key] : item.iconsLink} className={'icon icons'} /> {item.title == 'Panier' ? <span className='badge badge-warning' id='lblCartCount'> {cartItems.reduce((a: any, c: any) => a + c.qty, 0)} </span> : null}</> : null : null}
                <a className={navbar || state ? !isDesktopOrLaptop.matches ? 'link-nav active' : 'link-nav' : 'link-nav'} href={item.url}>
                    {item.title == 'Panier' || item.title == 'Compte' ? null : item.title}
                </a>
            </Link>
        </div>

    useEffect(() => {
        setNavbar(props.active ? props.active : false)

    }, [])

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

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setClick(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }


    window.addEventListener('scroll', !props.active ? changeBackground : () => { })

    const wrapperRef = useRef(null as any) as any;
    useOutsideAlerter(wrapperRef);

    return (
        <>
            <div className={click ? 'overlay-navbar' : ''}></div>
            <div className={navbar || state ? 'active navbarItems' : 'navbarItems'}>

                <div className='navbarContent'>
                    <a href="/" className="navbar-logo">
                        <img src={navbar || state ? logo : logo_white} alt="Logo" className='logo_header' />
                    </a>
                    <div className='menu-icon' onClick={() => setState(!state)}>
                        {/* <i className={state ? 'fas fa-times' : 'fas fa-bars'}></i> */}

                        <div className={`${state ? "hamburger--spin is-active" : ""}  hamburger-box`}>
                            <div className={navbar || state ? 'hamburger-inner active' : "hamburger-inner"}></div>
                        </div>

                    </div>
                    {isDesktopOrLaptop.matches ?
                        <div className={'icons-right'} >

                            <a href={userInfo?.token?'/account':'/connexion'} className='icons-div'>
                                <img src={navbar || state ? iconProfil : MenuItems[2].iconsLink} className={'icon icons icon-mobile1'} />
                            </a>
                            <div className='icons-div' onClick={() => setClick(!click)}>
                                <img src={navbar || state ? shoppingBag : MenuItems[3].iconsLink} className={'icon icons icon-mobile2'} />
                                <span className='badge badge-warning' id='lblCartCount'> {cartItems ? cartItems.reduce((a: any, c: any) => a + c.qty, 0) : 0} </span>
                            </div>
                        </div> : null}
                    <ul className={state ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, key) => {
                            return (
                                <li key={key}>
                                    {isDesktopOrLaptop.matches ? item.title == 'Panier' || item.title == 'Compte' ? null : item.title ?
                                        navItem(item, key) : null : navItem(item, key)}
                                </li>
                            )
                        })}
                        {/* @ts-ignore */}
                        {/* {user.user.map((item) => {
                            return (
                                <li>{item.user}</li>
                                )
                        })} */}
                    </ul>
                    {/* <Button buttonStyle=''>Inscription</Button> */}
                </div>
            </div>

            <nav ref={wrapperRef} className={click ? 'nav-side nav-side-clicked' : 'nav-side'}>
                <div onClick={() => setClick(!click)} className='title-side-basket'>
                    <img style={{ height: 19, width: 22 }} src="https://img.icons8.com/ios-filled/32/f7f7f7/back.png" />
                    <h3>Panier</h3>
                </div>

                {cartItems ? cartItems.length === 0 ? (error()) : (
                    cartItems.map((item: any, key: number) => {
                        return (
                            <div key={key} className='name-div'>
                                <img className='name-image' src={item.image[0][0].original} />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 23 }}>
                                    <div className='name-text'>
                                        <span><strong> {item.qty} x {item.name}</strong></span> <div style={{ maxWidth: '6rem', margin: '-3px 0px 1px 9px' }}> <a href='#'> {item.name_item} </a></div> <button onClick={() => dispatch(removeFromCart(item.product))} style={{ cursor: 'pointer', border: "none", height: 0 }}><img style={{ height: 17, width: 17, cursor: 'pointer' }} src="https://img.icons8.com/ios-filled/384/f7f7f7/delete-sign--v2.png" /></button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
                                        <span style={{ fontWeight: 500 }}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                                        <span>Taille: {item.size}</span>
                                        <span>Couleur: {'Noir'}</span>
                                        <span>Quantité: {item.qty}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : error()}

                {!cartItems ? (
                    <></>) : (
                        <div className='details-div'>
                            <div className='details-first'>
                                <span> {cartItems.reduce((a: any, c: any) => a + c.qty, 0)} article{cartItems.reduce((a: any, c: any) => a + c.qty, 0) > 1 ? "s" : ""}</span>
                                <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
                            </div>
                            <hr />
                            <div className='details-first'>
                                <span>livraison</span>
                                <span>0,00 €</span>
                            </div>
                            <hr />
                            <div className='details-first'>
                                <span>Total</span>
                                <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0))}</span>
                            </div>

                            {/* button */}
                            <div style={{ justifyContent: 'center', display: 'flex', cursor: cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? "pointer" : "not-allowed", margin: "20px auto" }}>
                                <a style={{ textDecoration: 'none', }} className={cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? '' : 'disabled'} href="/cart"><button disabled={cartItems.reduce((a: any, c: any) => a + c.qty, 0) < 1} onClick={() => window.location.href = '/page2'} style={{ pointerEvents: cartItems.reduce((a: any, c: any) => a + c.qty, 0) >= 1 ? "all" : "none", }} className='button-command'>
                                    Commander
                    </button></a>
                            </div>
                        </div>
                    )}
            </nav>
        </>
    )
}

export default Navbar
