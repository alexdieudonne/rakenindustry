import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, signout, updateUser } from '../../../../redux/actions/userActions'
import Breadcrumbs from '../../../../utils/Breadcrumb'
import Footer from '../../../../utils/Footer'
import Navbar from '../../../../utils/Navbar'
import NavigationLinks from '../navigation-links'

function NewsLetter() {

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin

    const [subscribe, setSub] = React.useState(false)


    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
        setSub(userInfo.newsletter)

    }, [dispatch, userInfo._id, userInfo])


    const handleSubmit = (e:any) =>{
        e.preventDefault()
       // console.log(subscribe)
        dispatch(updateUser({ newsletter: subscribe }))
    }


    return (
        <div>
            <div className='body-eshop'>
                <div className='breadcrumb-style'>
                    <Breadcrumbs />
                </div>
                <div className='header-account'>
                    {loading ? <div></div> : error ? <div></div> :
                        <span>Bienvenue, {userInfo?.lastname}</span>}
                    <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
                </div>
                <NavigationLinks >
                    <aside className="col-md-9 col-sm-8 form-content">
                        <div className="card wish-list mb-4 commands-ordered">
                            <form onSubmit={handleSubmit} className=" f-column">
                                <div className=" col-sm-12 form-group subscribe-group">
                                    <label className="upper-text"> Subscribe: </label>
                                    <label className="radio-inline"><input value="" checked={subscribe} onClick={() => setSub(true)} name="subscribe" type="radio" /> <span className="square-box"></span> <span>Yes</span> </label>
                                    <label className="radio-inline"><input value="" checked={!subscribe} onClick={() => setSub(false)} name="subscribe" type="radio" /> <span className="square-box"></span> <span>No</span> </label>
                                </div>

                                <div className="col-sm-6">
                                    <button type="submit" className="continue-shop-modal m-0">Mettre a jour</button>
                                </div>

                            </form>
                            <div className='link-back mt-3'>
                                <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                            </div>
                        </div>
                    </aside>
                </NavigationLinks>
            </div>
        </div>
    )
}

export default NewsLetter


