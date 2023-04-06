import React, { useState } from 'react'
import { Card, Input, Form, Button, message } from 'tdesign-react'
import useForm from 'tdesign-react/es/form/hooks/useForm'
import './index.scss'
import loginPng from '../../assets/imgs/login.png'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../utils'

export default function Login() {
    const [ form ] = useForm()
    const navigate = useNavigate()
    const [verifying, setVerifying] = useState(false)

    const onVerify = () => {
        form.validate().then(async verifyResults => {
            const pass = Object.values(verifyResults).every(item => item.result)
            if(pass) {
                setVerifying(true)
                const { token } = form.getFieldsValue(true)
                try {
                    const result = await (await fetch('https://gmlook.top/chat/openai/auth', {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: token
                    })).json()
                    if (result.code === 200) {
                        storage.setUUID(result.data)
                        navigate('/')                
                    } else {
                        message.error('token error')
                    }               
                } catch (e) {                    
                    console.error(e)
                    alert(1)
                } finally {
                    setVerifying(false)
                }            
            }
        })       
                
    }
    

    return (
        <div className="login" style={{backgroundImage: `url(${loginPng})`}}>
            <div className="login-box">
                <Card 
                    hoverShadow
                    title="Requires validation to use"
                    style={{width: window.innerWidth <= 500 ? 300 : 400}}
                    footer={
                        <Button 
                            block 
                            onClick={onVerify}
                            loading={verifying}
                        >verify</Button>
                    }
                >
                    <Form form={form}>
                        <Form.FormItem label="token:" name="token" rules={[{required: true, message: 'please enter token'}]}>
                            <Input 
                                type="password" 
                                placeholder="please enter"
                                onEnter={onVerify}
                            />
                        </Form.FormItem>
                    </Form>                                        
                </Card>
            </div>
        </div>
    )
}