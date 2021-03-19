import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isSafari, isMobileSafari } from 'react-device-detect';

export default function Card(props: CARDPROPS) {


    const [imgAbsolute, setImageAbsolute] = React.useState(false)
    const {
        image,
        name,
        price,
        keyProduct,
    } = props

    const handleMenuHover = () => {
        setImageAbsolute(!imgAbsolute)
    }


    return (
        <div key={keyProduct} className='card-product'>
            <div style={{height:  "auto" }} className='img-div'
                onMouseEnter={handleMenuHover}
                onMouseLeave={handleMenuHover}>
                <div className='img-div-a'>
                    {
                        image.slice(0, 2).map((item: any, key: number) =>
                            <img className={`img-card-im${key + 1}`} src={item[0].original} />
                        )
                    }
                </div>
                <Link to={`/eshop/${keyProduct}`} className='button-see-product-div'>
                    <a className={!imgAbsolute ? 'button-see-product' : 'animate-button'}>
                        Voir le produit
                </a>
                </Link>
                <div className='title-card'>
                    <h3 className='title-card-text'>{name}</h3>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', paddingTop: "0.4em" }}>
                        <h3 className='ttc-style'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)}</h3>
                        <h3 style={{ fontSize: 12, marginTop: 4, marginLeft: 3, }} className={'title-card-text'}> TTC</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CARDPROPS {
    image: [
        [
            {
                original: { type: String, required: true },
                thumbnail: { type: String, required: true },
            },
        ],
    ],
    name?: string,
    price: number,
    keyProduct?: any,
}