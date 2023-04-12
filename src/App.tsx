import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.scss'
import LayoutRouter from './router'
import home02 from './assets/imgs/home02.jpeg'
import { storage } from './utils'
import BeiAn from './components/beian'


function App() {
    const router = useNavigate()


    const autoVerify = () => {
        if (!storage.getUUID()) {
            router('/login', {
                replace: true
            })
        } else {
            router('/', {
                replace: true
            })
        }        
    }

    useEffect(() => {
        autoVerify()
    }, [])

    return (
        <div className="App" style={{backgroundImage: `url(${home02})`}}>
            <LayoutRouter />
            <BeiAn />
        </div>
    )
}

export default App
