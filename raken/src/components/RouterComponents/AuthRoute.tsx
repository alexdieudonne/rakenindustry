import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { CardText, Card } from 'reactstrap';


export default function AdminRoute({ component: Component, to: to, children, ...rest }: any) {
  //@ts-ignore
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
 // console.log(children)
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> : error ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
          <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
        </Card> :
          userInfo && children ? children : userInfo && Component? (
            <Component {...props}></Component>
          ) : (
              <Redirect to={to ? to : "/connexion"} />
            ) 
      }
    ></Route>
  );
}
