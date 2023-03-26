import React, { useState } from 'react'
import { Card, Input, Form, Button } from 'tdesign-react'
import useForm from 'tdesign-react/es/form/hooks/useForm'
import './index.scss'
import loginPng from '../../assets/imgs/login.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [ form ] = useForm()
    const navigate = useNavigate()
    const [verifying, setVerifying] = useState(false)

    const onVerify = () => {
        form.validate().then(verifyResults => {
            const pass = Object.values(verifyResults).every(item => item.result)
            if(pass) {
                setVerifying(true)
            }
        })       
        
        // navigate('/')
    }

    return (
        <div className="login" style={{backgroundImage: `url(${loginPng})`}}>
            <div className="login-box">
                <Card 
                    hoverShadow
                    title="需要验证才能使用"
                    style={{width: 400}}
                    footer={
                        <Button 
                            block 
                            onClick={onVerify}
                            loading={verifying}
                        >验证</Button>
                    }
                >
                    <Form form={form}>
                        <Form.FormItem label="令牌：" name="token" rules={[{required: true}]}>
                            <Input type="password" />
                        </Form.FormItem>
                    </Form>                                        
                </Card>
            </div>
        </div>
    )
}