import React, { Component } from 'react';
import './styles.css'
import Footer from '../Footer'

interface PROPS {
    fixed?: boolean,
    children: any
}
export default function SideBar(props: PROPS) {
    // console.log(props.fixed)
    return (
        <>
            <a id="nav-expand" href="#">
                <span className="icon icon-menu"></span>&nbsp;
                Menu
            </a>
            <nav>
                <a id="nav-collapse" href="#">
                    <span className="icon icon-cross"></span>
                </a>
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Portfolio</a>
                <a href="#">About</a>
            </nav>
            <main>
                {props.children}
            </main>
            <Footer fixed />
            
        </>
    );
}





