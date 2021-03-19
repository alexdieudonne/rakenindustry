// import Carousel from 'nuka-carousel';
import './slider.css'
import Button from './buttons'
import "react-awesome-button/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectCube, Autoplay, Parallax } from 'swiper'
// Import Swiper styles
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, EffectCube, Autoplay, Parallax])

export default function slider(props:any) {
    const slide = []

    for (let i = 0; i < 5; i += 1) {
        slide.push(
            <SwiperSlide key={i}>
                <div className={'slider-overlay'}>
                    <div className='overlay-content'>
                        <h1 className='title-slider'>Retrouvez <br /> des réductions a -10% <br />sur cet article</h1>
                        <div id="container">
                            <div className="button" id="button-3">
                                <div id="circle"></div>
                                <a href="#"  className="a-overlay">Voir</a>
                            </div>
                        </div>
                    </div>

                </div>
                <img src={`https://picsum.photos/id/${i + 1}/500/300`}
                    alt={`slide${i}`} />
            </SwiperSlide>
        )
    }
    return (
        <div >

            <Swiper
                autoplay
                spaceBetween={30}
                parallax={true}
                speed={600}
                centeredSlides
                // effect="cube"
                navigation
                pagination
                slidesPerView={1}
     
            >
                {slide}
                
            </Swiper>
          
        </div>
    )
}
