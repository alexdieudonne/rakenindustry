import React from 'react'

export default function productCard() {
    return (
        <div className={"container-product "}>
            <div className={"cardi "}>
                <div className="imgBx">
                    <img style={{ height: 220, width: 280 }} src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" />
                </div>
                <div className="imgBx2">

                    <img style={{ height: 220, width: 280 }} src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" />
                </div>

                <div className="contentBx">

                    <h2>Air baris</h2>

                    <div className="size">
                        <h3>Size :</h3>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                    </div>

                    <div className="color">

                        <h3>Color :</h3>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='buy-view'>
                        <a href="#">Acheter</a>
                        <a href="#">voir</a>
                    </div>
                </div>


            </div>
        </div>
    )
}
