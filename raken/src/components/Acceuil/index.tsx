import React, { useEffect, useState, FunctionComponent } from 'react';
import './Accueil.css';
import logo from '../../assets/logo_raken.png';
import logo_white from '../../assets/logo_raken_white_version.png'
import Animation from '../../utils/Animation'
import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'

import { Component } from 'react';
import { useMediaQuery } from 'react-responsive'
import { isSafari, isMobileSafari } from 'react-device-detect';
import Slider from './Components/slider'
//@ts-ignore
import video from '../../assets/video/TeaserCollectionHiver_Raken_Finale_720p.mov'
import iconProfil from '../../assets/icons/avatar.png'
import shoppingBag from '../../assets/icons/shopping-bag.png'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu, list, selected, ArrowLeft, ArrowRight } from './Components/const-scrollmenu'
import { StickyContainer, Sticky } from 'react-sticky';
import { Header } from "./Components/header";
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ProductCard from './Components/productCard'


export default class Acceuil extends Component {
  state: { show: boolean; loadedImage: boolean; top: boolean, isVideoLoaded: boolean, selected: string | number | null, mute: boolean };
  videoRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
      loadedImage: false,
      top: false,
      isVideoLoaded: false,
      selected: null,
      mute: true
    };
  }

  // handleRef = (video:any) => {
  //   this.videoRef = video;
  // };


  componentDidMount() {
    // console.log(isSafari)
    //   document.addEventListener("touchmove", function (e) {
    //     e.stopPropagation();
    // }, { passive: false });

    const load = localStorage.getItem('load')
    document.body.classList.add('stop-scroll');
    const thi = this;
    async function name(this: any) {
      const img = new Image();

      img.src = logo;
      img.src = logo_white;
      img.src = iconProfil;
      img.src = shoppingBag;

      await img.decode();
      // img is ready to use
      //console.log(`width: ${img.width}, height: ${img.height}`);
      thi.setState({ ...thi.state, loadedImage: true })
    };
    name()
    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', arguments);
    });

    //   scrollSpy.update();
    //   setTimeout(() =>{
    //     this.videoRef.play();
    // },1000);
    // onSelect = key => {
    //   this.setState({ selected: key });
    // }
    // localStorage.setItem('load', 'yes')

  }

  componentWillUnmount() {

  }

  onSelect = (selected: string | number | null) => {
    // console.log(selected)
    this.setState({ selected })
  }

  render() {
    const menu = Menu(list, selected);
    const isDesktopOrLaptop = window.matchMedia('(max-width: 960px)');
    let renderCount = 0
    return (
      < >
        <Navbar />
        {/* {console.log(this.state.show)} */}

        <div className={'bodyAcceuil'} style={{ overflow: "hidden" }}>
          <div className={isMobileSafari ? 'video-card-safari' : 'video-card'}>
            <div className='banner'>
              <video playsInline muted={this.state.mute} id="valentines-vbanner" loop width="100%" height="auto" autoPlay data-poster="https://media.boohoo.com/i/boohooamplience/DESK_VIDEO_HOLDINGIMAGE" data-poster-mobile="https://media.boohoo.com/i/boohooamplience/MOB_VIDEO_HOLDINGIMAGE" poster="https://media.boohoo.com/i/boohooamplience/DESK_VIDEO_HOLDINGIMAGE">
                <source data-src="https://www.quanzhanketang.com/tags/movie.mp4" data-res="High" data-bitrate="2025" type="video/mp4" src={video} />
                {/* <source data-src="https://www.quanzhanketang.com/tags/movie.mp4" data-res="Medium" data-bitrate="613" type="video/mp4" src="https://i1.adis.ws/v/boohooamplience/VIDEO_0812_DESK/mp4_480p" />
                <source data-src="https://www.quanzhanketang.com/tags/movie.mp4" data-res="Low" data-bitrate="308" type="video/mp4" src="https://i1.adis.ws/v/boohooamplience/VIDEO_0812_DESK/mp4_240p" />
                <source data-src-mobile="https://www.quanzhanketang.com/tags/movie.mp4" data-res="High" data-bitrate="2025" type="video/mp4" media="screen and (max-width:767px)" src="" />
                <source data-src-mobile="https://www.quanzhanketang.com/tags/movie.mp4" data-res="Medium" data-bitrate="613" type="video/mp4" media="screen and (max-width:767px)" src="" />
                <source data-src-mobile="https://www.quanzhanketang.com/tags/movie.mp4" data-res="Low" data-bitrate="308" type="video/mp4" media="screen and (max-width:767px)" src="" /> */}
              </video>

              <div id="overlay"></div>
              <div onClick={() => this.setState({ mute: !this.state.mute })} id="button-muted">
                <img style={{ height: 31, width: 35 }} src={this.state.mute ? "https://img.icons8.com/ios/384/f7f7f7/mute--v1.png" : "https://img.icons8.com/ios/384/f7f7f7/mute--v2.png"} />
              </div>
              <div style={{ display: this.state.mute ? '' : 'none' }} className='content'>
                <h1 className='welcome'>Bienvenue</h1>
                <p style={{ color: 'white', textAlign: 'left' }}>

                  Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                  Morbi tristique velit id
                  ornare pretium. Duis egestas
                  magna sit amet lectus accumsan
                  mollis. Nunc arcu lacus,
                  ultricies quis varius ut,
                  fermentum in diam.
                </p>
                <div className="buttons">
                  <a href="https://twitter.com/masuwa1018" className="btn effect01" target="_blank"><span>Découvrir</span></a>
                </div>

              </div>
            </div>
          </div>
          <div className='second-part'>
            <div className='scrollmenu'>
              <ScrollMenu
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                alignCenter={true}
                clickWhenDrag={false}
                wheel
                hideArrows={!isDesktopOrLaptop.matches}
                onSelect={(selected) => this.onSelect(selected)}
              // selected={selected}
              // onSelect={this.onSelect}
              />
            </div>
            <Slider />

            <div className={'products-style'}>
              <h4 className='our-products-title'>NOS PRODUITS</h4>
              <div className='product-card'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
            {/* <div className='shop-why'>
                <div className="shop-features">
                  <h2 className="shop-features-title">
                    <span className="shop-features-title-content">
                    </span>
                  </h2>
                  <div className="card-row-stle row">

                    <div className=" col-md-4">
                      <span>
                        <span className="lang2"><div className='icon-star-div'> <img className='icon-star' src="https://img.icons8.com/ios-filled/96/000000/star--v1.png"/></div><h3>SERVICE D'EXCEPTION</h3><p>Consult our specialists for help with an order, customization, or design advice.</p><a href="#">Commander &gt;</a></span>
                      </span>
                    </div>
                    
                    <div className="col-md-4">
                      <span>
                        <span className="lang2"><div className='icon-star-div'> <img className='icon-star' src="https://img.icons8.com/ios-filled/96/000000/reply-arrow.png"/></div><h3>LES RETOURS</h3><p>We stand behind our goods and services and want you to be satisfied with them.</p><a href="#">Voir la politique &gt;</a></span></span>
                    </div>

                    <div className="col-md-4">
                      <span>
                        <span className="lang2"><div className='icon-star-div'> <img className='icon-star' src="https://img.icons8.com/material-rounded/96/000000/filled-sent.png"/></div><h3>ENVOI GRATUIT</h3><p>Currently over 50 countries qualify for express international shipping.</p><a href="#">En savoir plus &gt;</a></span></span>
                    </div>

                  </div>
                </div>
              </div> */}
            <Footer />
          </div>
        </div>

        {/* </Animation> */}

      </>
    );
  }
}
