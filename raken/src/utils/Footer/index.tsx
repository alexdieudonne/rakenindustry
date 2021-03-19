import React, { Component } from 'react';
import './footer.css'


interface PROPS {
    fixed?: boolean
}
export default function Footer(props: PROPS) {
    // console.log(props.fixed)
    var today = new Date();
    var yyyy = today.getFullYear();


    return (
        <footer className={props.fixed ? '' : ''}>
            <section className="cid-qyYIznwXhp" id="footer6-71" data-rv-view="3180">

                <div className="container-e">
                    <div className="row justify-content-center align-center">
                        <div className="col-md-4 list-column">
                            <h4 className="mbr-section-title mbr-fonts-style mbr-bold display-7">Informations
                            </h4>
                            <hr />
                            <div className="mbr-list counter-container mbr-fonts-style display-4">
                                <ul>
                                    <li><a href="https://mobirise.com/" className="text-secondary">À propos</a></li>
                                    <li><a href="https://mobirise.com/" className="text-secondary">Mentions légales</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 list-column">
                            <h4 className="mbr-section-title mbr-fonts-style mbr-bold display-7">Aide
                            </h4>
                            <hr />
                            <div className="mbr-list counter-container mbr-fonts-style display-4">
                                <ul>
                                    <li><a href="/account/create-return" className="text-secondary">Retours</a></li>
                                    <li><a href="https://mobirise.com/" className="text-secondary">CGV</a></li>
                                    <li><a href="https://mobirise.com/" className="text-secondary">FAQ</a></li>
                                    <li><a href="https://mobirise.com/" className="text-secondary">Nous contacter</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h4 className="mbr-section-title mbr-fonts-style mbr-bold display-7">Suivez-nous
                            </h4>
                            <hr />
                            <div className="social-media">
                                <ul className='icons-social'>
                                    <li>
                                        <a style={{ paddingLeft: 0 }} className="icon-transition" href="#">
                                            <i style={{ fontSize: 26 }} className="icofont-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="icon-transition" href="#">
                                            <i style={{ fontSize: 26 }} className="icofont-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="icon-transition" href="#">
                                            <i style={{ fontSize: 26 }} className="icofont-youtube-play"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row align-center justify-content-center">
                        <div className="col-md-12">
                            <ul className="card-support">
                                <li className='card-payement'>
                                    <img src="https://mobirise.com/extensions/storem4/assets/images/master-card.png" height="30" alt="Master Card" media-simple="true" />
                                </li >
                                <li className='card-payement'>
                                    <img src="https://mobirise.com/extensions/storem4/assets/images/paypal.png" height="30" alt="American Express" media-simple="true" />
                                </li>
                            </ul>
                            <p className="mbr-fonts-style sub-info display-7">
                                © {yyyy} Raken Paris. Tous droits réservés
                    </p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}


