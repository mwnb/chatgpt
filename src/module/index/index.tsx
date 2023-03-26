import React from 'react'
import './index.scss'
import IM from '../../components/im'
import home01 from '../../assets/imgs/home01.jpeg'

const backgroundImages = `url(${home01})`
console.log(backgroundImages)

export default function Index() {
    return (
        <div className="index" style={{backgroundImage: backgroundImages}}>
            <div className="left"></div>
            <div className="im">
                <IM />      
            </div>
            <div className="right"></div>
        </div>
    )
}