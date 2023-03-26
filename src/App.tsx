import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.scss'
import LayoutRouter from './router'
import home02 from './assets/imgs/home02.jpeg'


function App() {
    const router = useNavigate()

    const token = localStorage.getItem('token')    

    const autoVerify = () => {
        // router('/login', {
        //     replace: true
        // })
    }

    useEffect(() => {
        autoVerify()
    })

    return (
        <div className="App" style={{backgroundImage: `url(${home02})`}}>
            <LayoutRouter />
        </div>
    )
}

export default App
