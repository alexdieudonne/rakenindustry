import Navbar from '../../../../utils/Navbar'
import Footer from '../../../../utils/Footer'
import Breadcrumbs from '../../../../utils/Breadcrumb'
import NavigationLinks from './../../components/navigation-links'
import './components/styles.css'
import dataTest from '../../../../utils/dataTest.json'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../../../redux/actions/userActions'
import { useEffect } from 'react'
import { listOrderMine } from '../../../../redux/actions/orderActions'
import ReactLoading from 'react-loading'
import { CardText, Card as Card1 } from 'reactstrap';
import Lottie from 'react-lottie';
import * as animationData from "../../../../assets/empty-box.json"
import empty from '../../../../assets/empty.svg'


function CommandHistory() {


    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };

    useEffect(() => {
        dispatch(listOrderMine())
    }, [])

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin

    //@ts-ignore
    const orderMineList = useSelector((state) => state.orderMineList);
    const { orders } = orderMineList;

    const loadingOrderList = orderMineList.loading
    const errorOrderList = orderMineList.error

    const optionsLottie = {
        loop: false,
        autoplay: true,
        //@ts-ignore
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='body-eshop'>
            <div className='breadcrumb-style'>
                <Breadcrumbs name='Historique des commandes' />
            </div>
            <div className='header-account'>
                {loading ? <div></div> : error ? <div></div> :
                    <span>Bienvenue, {userInfo?.lastname}</span>}
                <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
            </div>
            <NavigationLinks >
                <aside className="col-md-9 col-sm-8 form-content form-content-commandes">
                    <div className="card wish-list mb-4 commands-ordered">
                        <div className="card-body">
                            <h5 className="mb-5 font-weight-bold">Toutes vos commandes </h5>

                            {loadingOrderList ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                                errorOrderList ? <Card1 body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                                    <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                                </Card1> : orders ? orders?.length == 0 ?
                                    <div className='d-flex flex-column justify-content-center'>
                                        <h4 style={{ fontWeight: 700 }} className='text-center  font-weight-bold'>C'est bien vide ici !</h4>
                                        <Lottie options={optionsLottie}
                                            // height={400}
                                            width={350}
                                        />
                                        

                                    </div> : orders.map((oritem: any, key: number) => {
                                        return (
                                            <>
                                                <h3 className="display-4 mb-5 font-weight-bold">Commande {oritem.order_id}</h3>
                                                <div key={key}>{oritem.orderItem.map((item: any, key2: any) => {
                                                    return (
                                                        <div key={key2} className="row mb-4 ">
                                                            <div className="col-md-5 col-lg-3 col-xl-3 justify-content-center d-flex">
                                                                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                                    {/* <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" /> */}
                                                                    <a href="#!">
                                                                        <div className="mask waves-effect waves-light">
                                                                            <img className="img-fluid w-100" src="https://www.recc-paris.com/1053-superlarge_default/pull-bianca.jpg" />
                                                                            <div className="mask rgba-black-slight waves-effect waves-light"></div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7 col-lg-9 col-xl-9">
                                                                <div className='justify-content-between d-flex flex-column h-100'>
                                                                    <div className="d-flex justify-content-between history">
                                                                        {/* nom du produit */}
                                                                        <div className='col-6 card-title'>
                                                                            <div className='product-title-div'>
                                                                                <h4 className='product-name'>{item.qty} x {item.name}</h4>
                                                                                <p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
                                                                            </div>
                                                                            <p>Taille: {item.size}</p>
                                                                            <p>Couleur: {item.color}</p>
                                                                            <p>Date: {item.date}</p>
                                                                        </div>

                                                                        <div className="col-6 quantit">
                                                                            <span className="align-self-end">{item.status}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="buttons-commands">
                                                                        <button className="continue-shop-modal ">Tracker</button>
                                                                        <button onClick={() => window.location.href = `/account/create-return?order=${oritem.order_id}`} className="continue-command-modal">Retourner</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                })}</div>
                                                {key < orders.length - 1 ? <hr className="mb-4 mt-0" /> : null}
                                            </>
                                        )
                                    }) : null}
                        </div>

                        <div className='link-back'>
                            <a href='/account'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                        </div>

                    </div>
                </aside>
            </NavigationLinks>

        </div>
    )
}

export default CommandHistory
