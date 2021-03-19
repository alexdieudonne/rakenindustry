import React, { useEffect, useState, FunctionComponent } from 'react';
import './Animation.css';
import logo from '../../assets/logo_lune_low.jpg';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
// import { Helmet } from 'react-helmet'

const App: FunctionComponent = (props) => {

    document.title = 'Raken'
    const [state, setState] = useState<string | null>('yes')
    const [imageStatus, setImageStatus] = useState<string>('loading');

    const onLoad = () => {
        //console.log('loaded');
        setTimeout(() => {
            setImageStatus('loaded');
        }, 400)

    }



    useEffect(() => {
        const load = localStorage.getItem('load')

        async function name() {
            const img = new Image();
            img.onload = () => {
                onLoad();
            };
            img.src = logo;
            await img.decode();
            // img is ready to use
            // console.log(`width: ${img.width}, height: ${img.height}`);
            setState(load)
        };
        name()


        // localStorage.setItem('load', 'yes')

    }, []);

    return (
        <div >
            {imageStatus == 'loaded' ?
                <div className='bodyclass'>
                    <div className='acceuil'>
                        {props.children}
                    </div>

                    <div className='doors'>
                        <div className='logo'>
                            {/* <h1>RAKEN</h1> */}
                            <img src={logo} alt="Logo" className='logo_img' />

                        </div>
                        <div className={state == 'yes' ? 'porte_droite_not_displayed' : 'porte_droite_displayed'}>
                            <div className='border'></div>
                            <div className='logo_style'>
                                <p className='raken_text'>RAKEN</p>
                            </div>
                            <div className="half_circle_1"></div>
                        </div>


                        <div className={state == 'yes' ? 'porte_gauche_not_displayed' : 'porte_gauche_displayed'}>
                            <div className='border_gauche'></div>
                            <div className="half_circle_2"></div>
                            <div className='logo_style'>
                                <p className='industry_text'>INDUSTRY</p>
                            </div>

                        </div>
                    </div>
                </div>
                :
                <div>
                </div>
            }
        </div>
    );
}

export default App;
