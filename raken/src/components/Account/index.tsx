import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import NavigationLinks from './components/navigation-links'
import './components/styles.css'
import { detailsUser, signout } from '../../redux/actions/userActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Account() {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  //@ts-ignore
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo, loading, error} = userSignin



  return (
    <div>
      <Navbar active />
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs />
        </div>
        <div className='header-account'>

          {loading ?<div></div>:error?<div></div>:
          
          <span>Bienvenue, {userInfo?.lastname}</span>}
          <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
        </div>
        <NavigationLinks />
        <Footer />
      </div>
    </div>
  )
}


export default Account;

