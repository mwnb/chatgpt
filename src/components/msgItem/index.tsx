import React from 'react'
import { Avatar } from 'tdesign-react'
import { UserIcon } from 'tdesign-icons-react'
import './index.scss'

interface Props {
    msg: string
    timeFormat: string
}

export default function MsgItem(props: Props) {
    return (
        <div className="msg-item">
            <Avatar icon={<UserIcon />} style={{ marginRight: '10px' }} />
            <div className="info">
                <span className="time">{props.timeFormat}</span>
                <div className="text">
                    <div>
                        {props.msg}
                    </div>
                    <div style={{flex: 1}}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export function MsgItemRobot(props: Props) {
    return (
        <div className="msg-item-robot">            
            <div className="info">
                <span className="time">{props.timeFormat}</span>
                <div className="text">
                    <div style={{flex: 1}}>

                    </div>
                    <div>
                        {props.msg}
                    </div>                    
                </div>
            </div>
            <Avatar image="https://tdesign.gtimg.com/site/avatar.jpg" style={{ marginLeft: '10px' }} />
        </div>
    )
}