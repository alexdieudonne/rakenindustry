// import Carousel from 'nuka-carousel';
import './slider.css'
import React, { useState, Component } from 'react'
import "react-awesome-button/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectCube, Autoplay, Parallax, Thumbs } from 'swiper'
// Import Swiper styles
import 'swiper/swiper-bundle.css';
// import ImageGallery from 'react-image-gallery';
import ImageGallery from './Image-Gallery/ImageGallery'

interface PROPS{
  original?:string,
  images: Array<object>,
  thumbnail?:string
}
export default function Slider(props:PROPS) {

  const images = [
    {
      original: props.original,
      thumbnail: props.thumbnail? props.thumbnail: props.original,
    },
    {
      original: props.original,
      thumbnail: props.thumbnail? props.thumbnail: props.original,
    },
    {
      original: props.original,
      thumbnail: props.thumbnail? props.thumbnail: props.original,
    }
  ];

  return (
    <div >
      <ImageGallery  showNav={false} showFullscreenButton={false} showPlayButton={false} items={props.images} isRTL showBullets={false} thumbnailPosition={'left'} />
    </div>
  )
}

