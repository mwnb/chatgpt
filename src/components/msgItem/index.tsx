/* eslint-disabled */
import React, { useEffect } from 'react'
import { Avatar } from 'tdesign-react'
import { UserIcon } from 'tdesign-icons-react'
import './index.scss'
import robotAvatar from '../../assets/imgs/home01.jpeg'
import meAvatar from '../../assets/imgs/home02.jpeg'
import hljs from 'highlight.js'
import { marked } from 'marked'

interface Props {
    msg: string
    timeFormat: string
}

export default function MsgItem(props: Props) {
    return (
        <div className="msg-item">
            <Avatar image={meAvatar} style={{ marginRight: '10px' }} />
            <div className="info">
                <span className="time">{props.timeFormat}</span>
                <div className="text">
                    <div className="msg-content">
                        {props.msg}
                    </div>
                    <div style={{ flex: 1 }}>

                    </div>
                </div>
            </div>
        </div>
    )
}


export function MsgItemRobot(props: Props) {

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((el) => {
            if (!el.className.includes('hljs')) {
                hljs.highlightElement(el as HTMLElement)
            }            
        })
    })

    return (
        <div className="msg-item-robot">
            <div className="info">
                <span className="time">{props.timeFormat}</span>
                <div className="text">
                    <div style={{ flex: 1 }}>

                    </div>
                    <div className="msg-content" dangerouslySetInnerHTML={{__html: marked(props.msg) }} />
                </div>
            </div>
            <Avatar image={robotAvatar} style={{ marginLeft: '10px' }} />
        </div>
    )
}
