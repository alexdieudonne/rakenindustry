import Navbar from '../../../../utils/Navbar'
import { useEffect } from 'react'

import Footer from '../../../../utils/Footer'
import Breadcrumbs from '../../../../utils/Breadcrumb'
import NavigationLinks from './../../components/navigation-links'
import './components/styles.css'
import retours from '../../../../utils/fakeData.json/retoursData.json'
import { signout } from '../../../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { getReturns } from '../../../../redux/actions/returnActions'
import Skeleton from 'react-loading-skeleton';
import ReactLoading from 'react-loading'
import { Card, CardText } from "reactstrap";
import empty from '../../../../assets/empty.svg'

function Returns() {

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };
    //@ts-ignore
    const getReturn = useSelector((state) => state.returnGet);
    const returns = getReturn.returns
    const loadingReturns = getReturn.loading
    const errorReturn = getReturn.error

    useEffect(() => {
        dispatch(getReturns())
    }, [])

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin



    return (
        <div className='body-eshop'>
            <div className='breadcrumb-style'>
                <Breadcrumbs name="Retours" />
            </div>
            <div className='header-account'>
                {loading ? <div></div> : error ? <div></div> :
                    <span>Bienvenue, {userInfo?.lastname}</span>}
                <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
            </div>
            <NavigationLinks >
                <aside className="col-md-9 col-sm-8 form-content">
                    <div className="card wish-list mb-4 commands-ordered">
                        <div className="card-body">
                            {console.log(returns)}
                            <h5 className="mb-4">Tous les retours </h5>
                            {
                            returns?.length == 0 ?
                                <div className='d-flex flex-column justify-content-center'>

                                    <img className='mt-4 mh-50' style={{ maxHeight: "20rem" }} src={empty} alt="React Logo" />

                                </div> :returns?.map((item: any, key: number) => {
                                    return (
                                        <>
                                            <div key={key} className="row mb-4">
                                                <div className="col-md-5 col-lg-3 col-xl-3 justify-content-center d-flex">
                                                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                        {/* <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" /> */}
                                                        <a href="#!">
                                                            <div className="mask waves-effect waves-light">
                                                                {item.image ? <img className="img-fluid w-100" src={item.image} /> : <Skeleton />}

                                                                <div className="mask rgba-black-slight waves-effect waves-light"></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 col-lg-9 col-xl-9">
                                                    <div className='justify-content-between d-flex flex-column h-100'>
                                                        <div className="d-flex justify-content-between history">
                                                            {/* nom du produit */}
                                                            <div className='col-7 card-title'>
                                                                <div className='product-title-div'>
                                                                    <h4 className='product-name'>{item.name ? item.name : <Skeleton />}</h4>
                                                                    <p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
                                                                </div>
                                                                <p><b>Taille:</b> {item.size ? item.size : <Skeleton />}</p>
                                                                <p><b>Couleur:</b> {item.color || <Skeleton />}</p>
                                                                <p className="status-display"><b>Status:</b> {item.status || <Skeleton />}</p>
                                                                <p><b>Date:</b> {item.date || <Skeleton />}</p>
                                                                <p><strong>Commande:</strong> {item.order || <Skeleton />}</p>
                                                            </div>

                                                            <div className="col-6 quantit">
                                                                <span className='text-right right-0'>{item.status || <Skeleton />}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {key < retours.length - 1 ? <hr className="mb-4 mt-0" /> : null}
                                        </>
                                    )
                                })}
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

export default Returns
