import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardText } from "reactstrap";
import { addAdress, deleteListAdresses, listAdresses } from "../../../../redux/actions/adressActions";
import Breadcrumbs from "../../../../utils/Breadcrumb";
import NavigationLinks from "../navigation-links";
import '../styles.css'
import './components/styles.css'
import ReactLoading from 'react-loading'
import empty from '../../../../assets/empty.svg'
import { signout } from "../../../../redux/actions/userActions";
function DeliveryAdresses() {

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(listAdresses())
    }, [])

    //@ts-ignore
    const listAdresse = useSelector((state) => state.adresseList);
    const { loading, error, adresses } = listAdresse;


   

    const signoutHandler = () => {
        dispatch(signout());
    };

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin
    const loadingUser = userSignin.loading
    const erroUser = userSignin.error


    return (
        <div className='body-eshop'>
            <div className='breadcrumb-style'>
                <Breadcrumbs />
            </div>
            <div className='header-account'>
                {loadingUser ? <div></div> : erroUser ? <div></div> :
                    <span>Bienvenue, {userInfo?.lastname}</span>}
                <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
            </div>
            <NavigationLinks>
                <aside className="col-md-9 col-sm-8 form-content">
                    <div className="account-wrap cart-box-adress">
                        <div className="gray-control">


                            {loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                                error ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                                    <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                                </Card> :
                                    adresses.length == 0 ?
                                        <div className='d-flex flex-column justify-content-center'>
                                            <h4 style={{ fontWeight: 700 }} className='text-center  font-weight-bold'>Pas d'adresses !</h4>
                                            <img className='mt-4 mh-50' style={{ maxHeight: "20rem" }} src={empty} alt="React Logo" />

                                        </div> :
                                        adresses.map((item: any) => {
                                            return (<div className={"card border-dark adress-card card2"} >
                                                <div className="card-body ">
                                                    <p style={{ fontSize: 15 }} className="card-text ">{item.alias}</p>
                                                    <p className="card-text">{item.firstname} {item.lastname}</p>
                                                    <p className="card-text">{item.firstname}</p>
                                                    <p className="card-text">{item.adress}</p>
                                                    <p className="card-text">{item.adress_more}</p>
                                                    <p className="card-text">{item.zip_code} {item.city}</p>
                                                    <p className="card-text">{item.phone_number}</p>
                                                </div>

                                                <div className={"card-footer bg-transparent d-flex j-btween border-grey"}>
                                                    <div className='d-flex icons_actions'>
                                                        <span className='footer-card-text' style={{ color: 'black' }}><a href={`/account/address-book/adresse_${item._id}`}><i className="fal fa-pencil-alt"></i>modifier</a></span>
                                                    </div>
                                                    <div onClick={() => dispatch(deleteListAdresses(item._id))} className='d-flex icons_actions'>
                                                        <span className='footer-card-text' style={{ color: 'black' }}><a href="#"><i className="fal fa-trash"></i>supprimer</a></span>
                                                    </div>
                                                </div>
                                            </div>)
                                        })
                            }

                        </div>
                        <div className='button-add-adress'>
                            {/* <i className='fal fa-plus' style={{fontSize:18}}/> */}

                            <div ><span><a href="/account/address-book/adresse_new" ><i className="fal fa-plus" ></i>Ajouter une nouvelle adresse</a></span></div>
                        </div>

                        <div className='link-back mt-3'>
                            <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                        </div>
                    </div>
                </aside>
            </NavigationLinks>
        </div>
    )
}

export default DeliveryAdresses

