import { useEffect } from 'react';
import Acceuil from './Acceuil'
import Eshop from './Eshop'
import Notfound from './NotFound'
import Cart from './Cart'
import Checkout from './Checkout'
import Register from './Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Produit from './Produit'
import Login from './Login';
import ReturnOrder from './ReturnOrder';
import Account from './Account'
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import AccountInformation from './Account/components/Pages/account-information';
import ChangePassword from './Account/components/Pages/change-password'
import DeliveryAdresses from './Account/components/Pages/delivery-adresses';
import Adresse from './Account/components/Pages/components/adresse';
import CommandHistory from './Account/components/Pages/command-history';
import Returns from './Account/components/Pages/returns';
import NewsLetter from './Account/components/Pages/newsletter';
import { ConnectedRouter } from 'react-router-redux'
import AuthRoute from "./RouterComponents/AuthRoute"
// import { Router, Route, Link } from "wouter";
//@ts-ignore
import ScrollToTop from 'react-router-scroll-top'
 

function Routes() {

  useEffect(() => {

  }, [])


  const ScrollToTop1 = () => {
    window.scrollTo(0, 0);
    return null;
  };



  return (
    <Router >
      <ScrollToTop>
        {/* <Route component={ScrollToTop1} /> */}

        <div>
          <Switch>
            <Route exact path='/eshop' component={Eshop} />
            <Route exact path='/eshop/:product' component={Produit} />
            <Route exact path='/' component={Acceuil} />
            
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/checkout' component={Checkout} />
            <Route  exact path='/connexion' component={Login} />
            <Route  exact path='/register' component={Register} />

            <AuthRoute to="/connexion" exact path='/account' component={Account}/>

            <AuthRoute path='/account/account-information' >
              <Navbar active />
              <AccountInformation />
              <Footer />
            </AuthRoute>

            <AuthRoute path='/account/returns' >
              <Navbar active />
              <Returns />
              <Footer />
            </AuthRoute>

            <AuthRoute path='/account/change-password' >
              <Navbar active />
              <ChangePassword />
              <Footer />
            </AuthRoute>

            <AuthRoute exact path='/account/address-book' >
              <Navbar active />
              <DeliveryAdresses />
              <Footer />
            </AuthRoute>

            <AuthRoute exact path='/account/address-book/adresse_:id' component={Adresse}></AuthRoute>

            <AuthRoute exact path='/account/command-history' >
              <Navbar active />
              <CommandHistory />
              <Footer />
            </AuthRoute>

            <AuthRoute exact path='/account/create-return' >
              <Navbar active />
              <ReturnOrder />
              <Footer />
            </AuthRoute>

            <AuthRoute exact path='/account/newsletter' >
              <Navbar active />
              <NewsLetter />
              <Footer />
            </AuthRoute>

            <Route component={Notfound} />
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
}


export default Routes;