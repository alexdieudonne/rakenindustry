import React, { Component, useState, useEffect } from 'react';
import Navbar from '../../utils/Navbar'
import SideBar from '../../utils/TestSideBar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import './components/styles.css'
import Card from './components/card'
import axios from 'axios';
import { RAKEN_URL } from '../../utils/Functions';
import Loading from 'react-loading';
import ReactLoading from 'react-loading'
import { CardText, Card as Card1 } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';

export default function Eshop() {
  const dispatch = useDispatch();
  //@ts-ignore
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  useEffect(() => {
    dispatch(listProducts({}));
    document.body.classList.remove('stop-scroll');
  }, [dispatch]);


  return (
    <div>
      <Navbar active />

      {/* <SideBar> */}
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs />
        </div>
        {loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
          error ? <Card1 body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
            <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
          </Card1> :
            <div className='card-products'>
              {

                products.map((item: any) => {
                  return (
                    <Card image={item.image} name={item.name} price={item.price} keyProduct={item._id} />
                  )
                })
              }
            </div>
        }
      </div>
      <Footer />
      {/* </SideBar> */}
    </div>
  )
}

