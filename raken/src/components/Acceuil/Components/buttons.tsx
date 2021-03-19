import React from 'react'
import './slider.scss'

interface PROPS{
    left?:boolean;
    right?:boolean;
    onPress:()=>void;
}
export default function buttons(props:PROPS) {
    return (

        <div onClick={props.onPress}  className='arrow-cl '>
                <div id="arrow_2" className="arrow-wrapper">
                   {props.left? <div className="arrow arrow--left">
                        <span>Précédent</span>
                    </div>: null}


                   {props.right? <div className="arrow arrow--right ">
                        <span>Suivant</span>
                    </div>:null}
                </div>
        </div>
    )
}
